import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			_id
			password
			phone
			username
			email
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			_id
			password
			username
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout {
			message
		}
	}
`;


