import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./components/User";
import TopNavbar from "./components/TopNavbar";
import Signup from "./components/Signup";
import Track from "./pages/Track";
import Progress from "./pages/Progress";
import History from "./pages/History";
import Testing from "./pages/Testing";
import Auth from "./pages/Auth";
import gql from "graphql-tag";

function App() {
	// const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
	// console.log(data);
	return (
		<Container className="App">
			<BrowserRouter>
				<TopNavbar />
				<Route path="/" exact component={Signup} />
				<Route path="/track" exact component={Track} />
				<Route path="/progress" exact component={Progress} />
				<Route path="/history" exact component={History} />
				<Route path="/testing" exact component={Testing} />
				<Route path="/Auth" exact component={Auth} />
			</BrowserRouter>
		</Container>
	);
}

export default App;
