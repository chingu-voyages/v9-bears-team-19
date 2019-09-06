const express = require("express");
const db = require("./db");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const { importSchema } = require("graphql-import");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = importSchema("src/schema.graphql");

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true
};

// middleware to take the jwt from the cookie on each request, decode it then attach the userId to the request

const auth = (req, res, next) => {
	let token = req.headers.cookie;
	if (token) {
		jwt.verify(
			token.replace(/^token=/, ""),
			process.env.JWT_SECRET,
			(err, decoded) => {
				if (err) {
					throw new Error(`Error: ${err}`);
				} else {
					req.userId = decoded.userId;
				}
			}
		);
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
	context: ({ req, res }) => {
		return { req, res, db };
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
