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
  user: string;
  type: 'FOLLOW' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
}

export interface IInRelation {
  status?: string;
  type: 'FOLLOWING' | 'FOLLOWER' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
}

export interface ICreatePost {
  content: string;
  type: 'STORY' | 'POST' | 'REEL';
  images?: string[] | null | undefined;
}

export interface IReaction {
  post: string;
  comment?: string;
  type: 'LIKE' | 'HEART' | 'LAUGH' | 'CRY' | 'WOW' | 'ANGRY';
}

export interface IGetGroups {
  limit?: number;
  type?: 'COMMUNICATE' | 'SELF';
  search?: string;
  mode?: 'HIDDEN' | 'PUBLIC' | 'PRIVATE' | string;
}

export interface IGetListPosts {
  limit?: number;
  type?: string | 'POST' | 'REEL' | 'STORY';
  queryType?: string | 'USER' | 'COMMUNITY' | 'GROUP';
}
