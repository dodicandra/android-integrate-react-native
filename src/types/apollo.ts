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
  newMessage: Message;
};

export type IgetMsg = {
  getMessages: Message[];
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
