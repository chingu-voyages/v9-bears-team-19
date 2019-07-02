import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import User from "./components/User";
import TopNavbar from "./components/TopNavbar";
import Signup from "./components/Signup";
import Track from "./components/Track";
import Progress from "./components/Progress";
import History from "./components/History";
import Testing from "./components/Testing";

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
							<Container className="App">
								<BrowserRouter>
									<TopNavbar user={data.currentUser}/>
									<Route path="/" exact component={Signup} />
									<Route path="/track" exact component={Track} />
									<Route path="/progress" exact component={Progress} />
									<Route path="/history" exact component={History} />
									<Route path="/testing" exact component={Testing} />
								</BrowserRouter>
							</Container>
						);
					}}
				</User>
			</div>
		</ApolloProvider>
	);
}

export default App;
