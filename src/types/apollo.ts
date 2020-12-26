export type IAdmin = {
  getAdmin: {
    username: string;
    createdAt: string;
    role: string;
    imageUrl: string;
  };
};

export type IUserData = {
  username: string;
  token: string;
  email: string;
  role: string;
  imageUrl: string;
  phone?: string;
  id: string;
};

export type LoginAction = {
  username: string;
  password: string;
  email?: string;
};

export type LoginOrCreateData = {
  loginOrCreate: IUserData;
};

export type LoginData = {
  login: IUserData;
};

export type INewMsg = {
  newMessage: Message;
};

export type IgetMsg = {
  getMessages: Message[];
};

export type IGetAdmin = {
  getAdmin: IUserData[];
};

export interface Message {
  uuid?: string;
  content: string;
  from: string;
  to: string;
  createdAt?: string;
  image: string | null;
}

export type SendMsgAction = {
  sendMessage: {
    to: string;
    content?: string;
    image?: string;
  };
};

export type SendMsgType = {
  content?: string;
  image?: string | null;
  to: string;
};
