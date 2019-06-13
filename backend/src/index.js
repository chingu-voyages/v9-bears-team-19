const express = require("express");
const db = require("./db");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const { importSchema } = require("graphql-import");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = importSchema("src/schema.graphql");

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true
};

const auth = (req, res, next) => {
	let token = req.headers.cookie;
	if (token) {
		const { userId } = jwt.verify(
			token.replace(/^token=/, ""),
			process.env.JWT_SECRET
		);
		req.userId = userId;
	}
	next();
};

const app = express().use(auth);

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Mutation,
		Query
	},
	context: ({ req }) => {
		return { ...req, db };
	}
});

server.applyMiddleware({
	app,
	path: "/graphql",
	cors: corsOptions,
	auth
});

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
