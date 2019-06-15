import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from 'react-router-dom'

import TopNavbar from "./components/TopNavbar";
import Signup from "./components/Signup";
import Track from './components/Track'
import Progress from './components/Progress'
import History from './components/History'

const client = new ApolloClient({
	uri: process.env.REACT_APP_APOLLO_SERVER_URL
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Container className="App">
				<BrowserRouter>
					<TopNavbar />
					<Route path="/" exact component={Signup} />
					<Route path="/track" exact component={Track} />
					<Route path="/progress" exact component={Progress} />
					<Route path="/history" exact component={History} />
				</BrowserRouter>
			</Container>
		</ApolloProvider>
	);
}

export default App;
