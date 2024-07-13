import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      description
      body
      username
      createdAt
    }
  }
`;

export const GET_POSTS_ADMIN = gql`
  query GetPosts {
    posts {
      _id
      title
      description
      username
      createdAt
    }
  }
`
const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      title
      body
      comments {
        id
        body
      }
    }
  }
`;
