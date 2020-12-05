import {IMessage, User} from '#typing/message';

const user1: User = {_id: 1, name: 'dodi', avatar: 'https://source.unsplash.com/random', role: 'user'};

const user2: User = {_id: 2, name: 'candra', avatar: 'https://source.unsplash.com/random', role: 'user'};

export const dataChat: IMessage[] = [
  {_id: Math.random() * 723, sent: false, text: 'dodi', createdAt: new Date(), user: user2},
  {_id: Math.random() * 723, sent: false, text: 'candra', createdAt: new Date(), user: user2},
  {_id: Math.random() * 723, sent: false, text: 'candra', createdAt: new Date(), user: user2},
  {_id: Math.random() * 723, sent: false, text: 'dodi', createdAt: new Date(), user: user1},
  {_id: Math.random() * 723, sent: false, text: 'dodi', createdAt: new Date(), user: user1},
  {_id: Math.random() * 723, sent: false, text: 'candra', createdAt: new Date(), user: user1},
  {_id: Math.random() * 723, sent: false, text: 'candra', createdAt: new Date(), user: user1},
  {_id: Math.random() * 723, sent: false, text: 'adasdasdasd', createdAt: new Date(), user: user2},
];
