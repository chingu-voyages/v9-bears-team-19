const { Prisma } = require("prisma-binding");

const db = new Prisma({
	typeDefs: "src/generated/prisma.graphql",
	endpoint: "https://eu1.prisma.sh/matthew-player/cardio_tracker_db/dev",
	secret: process.env.PRISMA_SECRET,
	debug: false
});

module.exports = db;
