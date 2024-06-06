import { gql } from "@apollo/client";

export const ADD_JOB = gql`
	mutation CreateJob($input: jobInput!) {
		createJob(input: $input) {
			title
            description
            createdAt
		}
	}
`;