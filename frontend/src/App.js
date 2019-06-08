import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Users from "./components/Users";

import TopNavbar from "./components/TopNavbar";
import Placeholder from "./components/Placeholder";
import Signup from "./components/Signup";

const client = new ApolloClient({
	uri: process.env.REACT_APP_APOLLO_SERVER_URL
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<TopNavbar />
				<Container>
					<Placeholder />
					<Placeholder />
					<Placeholder />
				</Container>
				<Users />
				<Signup />
			</div>
		</ApolloProvider>
	);
}

export default App;
