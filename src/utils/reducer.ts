import {IgetMsg, INewMsg} from '#typing/apollo';

type State = {
  message: INewMsg['newMessage'][];
};

type SetMsss = {
  type: 'ADD_MSG';
  payload: IgetMsg['getMessages'];
};

type SingleMess = {
  type: 'ADD_SINGLE_MSG';
  payload: INewMsg['newMessage'];
};

type Action = SetMsss | SingleMess;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MSG':
      return {
        ...state,
        message: [...state.message, ...action.payload].reverse(),
      };
    case 'ADD_SINGLE_MSG':
      const newmsg = [...state.message, action.payload];

      return {
        ...state,
        message: newmsg,
      };
    default:
      throw new Error('canont');
  }
};
