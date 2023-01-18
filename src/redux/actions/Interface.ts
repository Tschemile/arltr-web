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
}

export interface IReaction {
  post: string;
  comment?: string;
  type: 'LIKE' | 'HEART' | 'LAUGH' | 'CRY' | 'WOW' | 'ANGRY';
}
