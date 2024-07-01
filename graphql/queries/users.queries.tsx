import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
	query GetAuthenticatedUser {
		authUser {
			_id
			phone
			username
			userType
		}
	}
`;
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      username
      userType
      email
      phone
    }
  }
`;