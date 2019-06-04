require("dotenv");
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

server.listen().then(({ url }) => {
	console.log(`Server running at ${url}`);
});
