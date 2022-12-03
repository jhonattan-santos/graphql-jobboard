import { request, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const HOST_URL = "http://localhost:9000/graphql";

export async function getCompany(companyId) {
  const query = gql`
    query CompanyQuery($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description,
        jobs {
          id
          title
          description
        }
      }
    }
  `;

  const variables = { companyId };
  
  const {company} = await request(HOST_URL, query, variables);
  return company;
}

export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          id
          name
          description
        }
      }
    }
  `;

  const variables = { id };
  
  const {job} = await request(HOST_URL, query, variables);
  return job;
}

export async function createJob(input) {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const variables = { input };
  const token = getAccessToken();
  const headers = { 'Authorization': `Bearer ${token}` };
  const {job} = await request(HOST_URL, query, variables, headers);
  return job;
}

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        description
        company {
          id
          name
          description
        }
      }
    }
  `;

  const {jobs} = await request(HOST_URL, query);
  return jobs;
}
