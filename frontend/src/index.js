import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: process.env.REACT_APP_APOLLO_SERVER_URL,
	credentials: "include"
});

const MyApp = () => (
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<App />
		</ApolloHooksProvider>
	</ApolloProvider>
);

ReactDOM.render(<MyApp />, document.getElementById("root"));
