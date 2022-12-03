import { Company, Job, User } from "./db.js";

export const resolvers = {
  Query: {
    job: async (_root, { id }) => Job.findById(id),
    jobs: async () => Job.findAll(),
    company: async (_root, { id }) => Company.findById(id),
  },
  Mutation: {
    createJob: (_root, { input }, { user }) => {
      if (!user) {
        throw new Error("Unathorized");
      }
      return Job.create({ ...input, companyId: user.companyId });
    },
    updateJob: (_root, { input }) => Job.update(input),
    deleteJob: (_root, { id }) => Job.delete(id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
