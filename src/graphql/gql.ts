import {gql} from '@apollo/client';

export const NEW_MSG = gql`
  subscription newMessage {
    newMessage {
      uuid
      content
      from
      to
      createdAt
      image
    }
  }
`;

export const GET_ADMIN = gql`
  query {
    getAdmin {
      username
      createdAt
      imageUrl
      role
    }
  }
`;

export const GET_MESSAGE = gql`
  query getMessage($from: String!) {
    getMessages(from: $from) {
      uuid
      content
      from
      to
      createdAt
      image
    }
  }
`;

export const SEND_MSG = gql`
  mutation sendMessage($to: String!, $content: String, $image: String) {
    sendMessage(to: $to, content: $content, image: $image) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
      email
      createdAt
    }
  }
`;