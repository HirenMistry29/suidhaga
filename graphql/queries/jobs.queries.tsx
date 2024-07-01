import { gql } from "@apollo/client";

export const GET_JOBS = gql`
	query GetJobs {
		jobs {
			_id
			title
            description
			status
		}
	}
`;

export const GET_JOB_BY_ID = gql`
	query GetJob($id: ID!){
		job(id: $id){
			title
			description
		}
	}
`;

export const GET_JOBS_BY_ID = gql`
	query GetJobs($id:ID!) {
		jobByUserID(id: $id){
			_id
            title
            description
            status
		}
	}
`;