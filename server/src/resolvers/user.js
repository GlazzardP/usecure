import { randomUUID } from "crypto";

export default {
  User: {
    firstName: async (parent) => parent.firstName,
    lastName: async (parent) => parent.lastName,
    email: async (parent) => parent.email,
    courseResults: async (parent, _args, { db }) => {
      return db.chain
        .get("courseResults")
        .filter({ learnerId: parent.id })
        .value();
    },
  },

  Query: {
    users: async (_parent, _args, { db }) => {
      return db.chain.get("users").value();
    },
    user: async (_parent, { id }, { db }) => {
      return db.chain.get("users").find({ id }).value();
    },
    usersCount: async (_parent, _args, { db }) => {
      return db.chain.get("users").size().value();
    },
  },

  Mutation: {
    createUser: async (_parent, { firstName, lastName, email }, { db }) => {
      if (!firstName || !lastName || !email) {
        throw new Error("All fields are required");
      }

      const user = {
        id: randomUUID(),
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
      };

      db.update(({ users }) => {
        users.push(user);
      });

      return user;
    },

    deleteUser: (_parent, { id }, { db }) => {
      const user = db.chain.get("users").find({ id }).value();

      if (!user) throw new Error("User not found");

      db.update(({ users }) => {
        const index = users.findIndex((u) => u.id === id);
        if (index !== -1) users.splice(index, 1);
      });

      return true;
    },

    updateUser: (_parent, { id, firstName, lastName, email }, { db }) => {
      const user = db.chain.get("users").find({ id }).value();

      if (!user) throw new Error("User not found");

      db.update(({ users }) => {
        const index = users.findIndex((u) => u.id === id);
        if (index !== -1) {
          users[index] = {
            ...users[index],
            ...(firstName !== undefined && { firstName }),
            ...(lastName !== undefined && { lastName }),
            ...(email !== undefined && { email }),
          };
        }
      });

      return db.chain.get("users").find({ id }).value();
    },
  },
};
