export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  sent?: boolean;
}

export type User = {
  _id: string | number;
  name: string;
  avatar: string;
  role: 'admin' | 'user';
};
