const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID,GraphQLString } = require("graphql");
const { UserType, ProjectType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM test.project WHERE id=$1 and `;
        const values = [args.id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID },username :{type: GraphQLString} },
      resolve(parentValue, args) {
        const query = `SELECT * FROM test.users WHERE id=$1 and username like $username`;
        const values = [args.id,args.username];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.query = RootQuery;