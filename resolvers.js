import { Company, Job, User } from "./db.js";

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unuathorized");
  }
}

export const resolvers = {
  Query: {
    job: async (_root, { id }) => Job.findById(id),
    jobs: async () => Job.findAll(),
    company: async (_root, { id }) => Company.findById(id),
  },
  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(!user);
      return Job.create({ ...input, companyId: user.companyId });
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(input.id);
      rejectIf(job.companyId !== user.companyId);
      return Job.update({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(id);
      rejectIf(job.companyId !== user.companyId);
      return Job.delete(id);
    },
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
