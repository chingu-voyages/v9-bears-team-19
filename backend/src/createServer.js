const { ApolloServer, gql } = require("apollo-server-express");
// const { ApolloServer, gql } = require("apollo-server");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");
const { importSchema } = require("graphql-import");

const typeDefs = importSchema("src/schema.graphql");

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true
};

function createServer() {
	return new ApolloServer({
		typeDefs,
		cors: corsOptions,
		resolvers: {
			Mutation,
			Query
		},
		introspection: true,
		context: req => ({ ...req, db })
	});
}

module.exports = createServer;
