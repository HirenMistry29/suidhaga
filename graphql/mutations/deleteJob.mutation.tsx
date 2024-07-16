

import { gql } from "@apollo/client";

export const DELETE_JOB = gql`
    mutation Mutation($jobId: ID!) {
      deleteJob(jobId: $jobId) {
        message
        success
      }
    }
`;
