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

export interface IRelation {
  user?: string;
  type: 'FOLLOW' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
  status: 'REQUESTING' | 'ACCEPTED' | 'REJECT';
}

export interface IInRelation {
  status?: 'REQUESTING' | 'ACCEPTED' | 'REJECT';
  type: 'FOLLOWING' | 'FOLLOWER' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
}

export interface ICreatePost {
  content: string;
  type: 'STORY' | 'POST' | 'REEL';
  images?: Record<string, string>[] | (string | undefined)[];
  mode?: 'PUBLIC' | 'PRIVATE' | 'FRIEND' | string;
}

export interface IReaction {
  post: string;
  comment?: string;
  type: 'LIKE' | 'HEART' | 'LAUGH' | 'CRY' | 'WOW' | 'ANGRY' | string;
}

export interface IGetGroups {
  limit?: number;
  type?: 'COMMUNICATE' | 'USER';
  search?: string;
  mode?: 'HIDDEN' | 'PUBLIC' | 'PRIVATE' | string;
  user: string;
}

export interface IGetListPosts {
  limit?: number;
  type?: 'POST' | 'REEL' | 'STORY' | string;
  queryType?: 'USER' | 'COMMUNITY' | 'GROUP' | string;
  user: string;
}

export interface IEditComment {
  image?: string;
  content: string;
}
