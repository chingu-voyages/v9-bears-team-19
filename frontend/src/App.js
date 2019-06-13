import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Users from "./components/Users";
import User from "./components/User";

import TopNavbar from "./components/TopNavbar";
import Placeholder from "./components/Placeholder";
import Signup from "./components/Signup";

const client = new ApolloClient({
	uri: process.env.REACT_APP_APOLLO_SERVER_URL,
	credentials: "include"
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				{/* render prop to inject current user into page, from there the data can be passed as props */}
				<User>
					{({ data }) => {
						return (
							<>
								<TopNavbar user={data.currentUser} />
								<Container>
									<Placeholder />
									<Placeholder />
									<Placeholder />
								</Container>
								<Users />
								<Signup />
							</>
						);
					}}
				</User>
			</div>
		</ApolloProvider>
	);
}

export default App;
