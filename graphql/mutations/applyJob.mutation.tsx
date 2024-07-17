import { gql } from "@apollo/client";
 export const APPLY_JOB = gql`
 mutation ApplyJob($jobId: ID!) {
  applyJob(jobId: $jobId) {
    applications {
      id
      username
      createdAt
    }
  }
}
`;