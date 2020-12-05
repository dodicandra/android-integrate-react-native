export type IAdmin = {
  getAdmin: {
    username: string;
    createdAt: string;
    role: string;
    imageUrl: string;
  };
};

export type LoginAction = {
  username: string;
  password: string;
};

export type LoginData = {
  login: {
    username: string;
    token: string;
    email: string;
    role: string;
  };
};

export type INewMsg = {
  newMessage: {
    uuid: string;
    content: string;
    from: string;
    to: string;
    createdAt: Date;
    image: string;
  };
};

export type IgetMsg = {
  getMessages: {
    uuid: string;
    content: string;
    from: string;
    to: string;
    createdAt: Date;
    image: string;
  }[];
};

export interface Message {
  uuid: string;
  content: string;
  from: string;
  to: string;
  createdAt: Date;
  image: string;
}
