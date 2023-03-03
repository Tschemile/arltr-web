import type {
  ALBUMS,
  GROUPS,
  MEMBERS,
  POSTS,
  REACTION,
  RELATIONSHIPS,
} from '@/constants/enum';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  birth: string;
}

export interface ILogin {
  usernameOrEmail: string;
  password: string;
}

export interface IInfoUser {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  name?: string;
  domain?: string;
  birth?: string;
  gender?: string;
  avatar?: string;
  cover?: string;
  about?: string;
  socialLinks?: string[];
  hobbies?: string[];
  status?: string;
  role?: string;
}

export interface IRelation {
  user?: string;
  type: 'FOLLOW' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED' | 'SNOOZE';
  status?: keyof typeof RELATIONSHIPS.STATUS;
  expiredAt?: string;
}

export interface IInRelation {
  status?: (keyof typeof RELATIONSHIPS.STATUS)[];
  type: 'FOLLOWING' | 'FOLLOWER' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
}

export interface IFriendship {
  user: string;
  status?: keyof typeof RELATIONSHIPS.STATUS;
}

// POST
export interface IGetListPosts {
  limit?: number;
  type?: keyof typeof POSTS.TYPE;
  queryType?: keyof typeof POSTS.QUERYTYPE;
  user?: string;
  group?: string;
}

export interface IEditComment {
  image?: string;
  content: string;
}

export interface ICreatePost {
  content: string;
  type: keyof typeof POSTS.TYPE;
  images?: string[];
  mode?: keyof typeof POSTS.MODE;
  tags: string[];
  group?: string;
}

export interface IReaction {
  post: string;
  comment?: string;
  type: keyof typeof REACTION.TYPE;
}

export interface IPostItem {
  author?: IInfoUser;
  content?: string;
  createdAt?: string;
  deletedAt?: string;
  disableComment?: boolean;
  event?: string;
  group?: string;
  id?: string;
  images?: string[];
  mode?: keyof typeof POSTS.MODE;
  status?: string;
  tags?: string[];
  totalComments?: number;
  totalReacts?: number;
  totalShares?: number;
  type?: keyof typeof POSTS.TYPE;
  updatedAt?: string;
  video?: string;
}
// GROUPSs

export interface IGetGroups {
  limit?: number;
  type: GROUPS.TYPE;
  search?: string;
  mode?: keyof typeof GROUPS.MODE;
  user?: string;
}

export interface IGroups {
  id?: string;
  name?: string;
  description?: string;
  avatar?: string;
  cover?: string;
  mode?: keyof typeof GROUPS.MODE;
  total?: number;
  member?: Record<string, string>;
}

// Members

export interface IMembers {
  user?: string;
  group?: string;
  status: string[];
  type: keyof typeof MEMBERS.TYPE;
}

// Album

export interface IAlbum {
  name: string;
  mode: keyof typeof ALBUMS.MODE;
}

export interface IEditAlbum {
  id: string;
  payload: IAlbum;
}

export interface IGetAlbums {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  name?: string;
  mode?: keyof typeof ALBUMS.MODE;
  presentation?: null;
  user?: IInfoUser;
}
