import React from "react";
import "./App.css";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import User from "./Components/User";

const cache = new InMemoryCache();
const link = createHttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include"
});

const client = new ApolloClient({
	cache,
	link
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<User />
			</div>
		</ApolloProvider>
	);
}

export default App;
