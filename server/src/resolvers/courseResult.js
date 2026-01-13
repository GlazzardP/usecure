import { randomUUID } from "crypto";

export default {
  CourseResult: {
    name: async (parent, args, context, info) => parent.name,
    score: async (parent, args, context, info) => parent.score,
    learnerId: async (parent, args, context, info) => parent.learnerId,
  },
  Query: {
    courseResults: async (parent, args, { db }, info) => {
      return db.chain.get("courseResults").value();
    },
    // courseResult: async (parent, args, { db }, info) => {
    //   return db.chain.get('courseResults').find(id).value()
    // }
    courseResultsByUser: (_parent, { userId }, { db }) => {
      return db.chain
        .get("courseResults")
        .filter({ learnerId: userId })
        .value();
    },
  },
  Mutation: {
    createCourseResult: async (
      parent,
      { name, score, learnerId },
      { db },
      info
    ) => {
      if (score < 0 || score > 100) {
        throw new Error("Score must be between 0 and 100");
      }

      if (!learnerId) {
        throw new Error("A learnerId is required");
      }

      if (!name) {
        throw new Error("A course name is required");
      }

      const newCourseResult = {
        id: randomUUID(),
        name,
        score,
        learnerId,
        createdAt: new Date().toISOString(),
      };

      db.update((state) => {
        state.courseResults.push(newCourseResult);
      });

      return newCourseResult;
    },
    deleteCourseResult: async (_parent, { id }, { db }) => {
      const existing = db.chain.get("courseResults").find({ id }).value();

      if (!existing) {
        throw new Error("Course result not found");
      }

      db.update(({ courseResults }) => {
        const index = courseResults.findIndex((r) => r.id === id);
        if (index !== -1) {
          courseResults.splice(index, 1);
        }
      });

      return true;
    },

    updateCourseResult: (_parent, { id, name, score }, { db }) => {
      const result = db.chain.get("courseResults").find({ id }).value();

      if (!result) throw new Error("Course result not found");

      db.update(({ courseResults }) => {
        const index = courseResults.findIndex((r) => r.id === id);
        if (index !== -1) {
          courseResults[index] = {
            ...courseResults[index],
            name,
            score,
          };
        }
      });

      return db.chain.get("courseResults").find({ id }).value();
    },
  },
};
