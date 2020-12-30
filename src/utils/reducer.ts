import {IgetMsg, INewMsg} from '#typing/apollo';

type State = {
  message: INewMsg['newMessage'][];
};

type SetMsss = {
  type: 'ADD_MSG';
  payload: IgetMsg['getMessages'];
  user: string;
  admin: string;
};

type SingleMess = {
  type: 'ADD_SINGLE_MSG';
  payload: INewMsg['newMessage'];
  user: string;
  admin: string;
};

type Action = SetMsss | SingleMess;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MSG': {
      return {
        ...state,
        message: [...state.message, ...action.payload]
          .filter((val) => val.from === action.admin || val.from === action.user)
          .reverse(),
      };
    }
    case 'ADD_SINGLE_MSG': {
      const newmsg = [...state.message, action.payload].filter(
        (val) => val.from === action.admin || val.from === action.user
      );

      return {
        ...state,
        message: newmsg,
      };
    }
    default:
      throw new Error('canont');
  }
};
