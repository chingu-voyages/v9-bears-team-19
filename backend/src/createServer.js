const { ApolloServer, gql } = require("apollo-server");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");
const { importSchema } = require("graphql-import");

const typeDefs = importSchema("src/schema.graphql");

function createServer() {
	return new ApolloServer({
		typeDefs,
		resolvers: {
			Mutation,
			Query
		},
		introspection: true,
		context: req => ({ ...req, db })
	});
}

module.exports = createServer;
