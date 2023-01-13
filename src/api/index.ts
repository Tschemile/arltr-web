/* eslint-disable @typescript-eslint/no-use-before-define */
import type { AxiosError } from 'axios';
import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

const isServer = () => {
  return typeof window === 'undefined';
};

let accessToken: string | null = '';
let context = <GetServerSidePropsContext>{};
// const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const baseURL = 'https://2f83-123-20-87-142.ap.ngrok.io/api';

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken;
};

export const getAccessToken = () => accessToken;

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // to send cookie
});

api.interceptors.request.use(
  (config: any) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = config.headers ?? {};
    accessToken = localStorage.getItem('token');
    if (accessToken) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    // if (isServer() && context?.req?.cookies) {
    //   config.headers.Cookie = `gid=${context.req.cookies.gid};`;
    // }
    return config;
  },
  (error) => {
    // console.info('=> (2) Do something with request error', { error });

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    if (
      error.response?.status === 401 &&
      !error.response?.config?.url?.includes('auth/refresh') &&
      !error.response?.config?.url?.includes('signin')
    ) {
      return refreshToken(error);
    }
    return Promise.reject(error);
  }
);

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = async (oError: AxiosError) => {
  try {
    const { response } = oError;

    // create new Promise to retry original request
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        response!.config.headers.Authorization = `Bearer ${token}`;
        resolve(axios(response!.config));
      });
    });

    // check whether refreshing token or not
    if (!fetchingToken) {
      fetchingToken = true;

      // refresh token
      const { data } = await api.post('/api/v1/auth/refresh');
      // check if this is server or not. We don't wanna save response token on server.
      if (!isServer) {
        setAccessToken(data.accessToken);
      }
      // when new token arrives, retry old requests
      onAccessTokenFetched(data.accessToken);
    }
    return await retryOriginalRequest;
  } catch (error) {
    // on error go to login page
    if (!isServer() && !Router.asPath.includes('/login')) {
      Router.push('/login');
    }
    if (isServer()) {
      context.res.setHeader('location', '/login');
      context.res.statusCode = 302;
      context.res.end();
    }
    return await Promise.reject(oError);
  } finally {
    fetchingToken = false;
  }
};
