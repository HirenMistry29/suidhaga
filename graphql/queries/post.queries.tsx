import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      postId
      title
      description
      body
      createdAt
      comments {
        id
        user
        createdAtname
        body
        postId
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;
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
