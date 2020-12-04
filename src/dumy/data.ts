export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

type User = {
  _id: string | number;
  name: string;
  avatar: string;
};

const user1: User = {_id: 1, name: 'dodi', avatar: 'https://source.unsplash.com/random'};

const user2: User = {_id: 2, name: 'candra', avatar: 'https://source.unsplash.com/random'};

export const dataChat: IMessage[] = [
  {_id: Math.random() * 723, user: user1, sent: false, text: 'dodi', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user2, sent: false, text: 'candra', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user2, sent: false, text: 'candra', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user1, sent: false, text: 'dodi', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user1, sent: false, text: 'dodi', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user2, sent: false, text: 'candra', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user2, sent: false, text: 'candra', createdAt: new Date(), received: true},
  {_id: Math.random() * 723, user: user1, sent: false, text: 'adasdasdasd', createdAt: new Date(), received: true},
];
