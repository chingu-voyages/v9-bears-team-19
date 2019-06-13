import { Query } from "react-apollo";
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

const User = props => (
	<Query query={CURRENT_USER_QUERY}>
		{payload => {
			return props.children(payload);
		}}
	</Query>
);

export default User;
