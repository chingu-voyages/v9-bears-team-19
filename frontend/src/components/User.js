import { Query, ApolloConsumer } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";

// created our own render prop

export const CURRENT_USER_QUERY = gql`
	query {
		currentUser {
			id
			email
			name
		}
	}
`;

// runs the query against the backend then injects the data via a render prop ingto a component (used at top level of page)

const User = props => {
	const { loading, error, data } = useQuery(gql`
		query {
			currentUser {
				id
				email
				name
			}
		}
	`);
	console.log(data);
	// return loading ? (
	// 	<h2>Loading...</h2>
	// ) : error ? (
	// 	<h2>Error: {error}</h2>
	// ) : (
	// 	<h1>Hello!!</h1>
	// );
	// {
	// 	return props.children;
	// }
};

export default User;
