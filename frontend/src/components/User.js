import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const CURRENT_USER_QUERY = gql`
	query CURRENT_USER_QUERY {
		currentUser {
			id
		}
	}
`;

const User = props => {
	return null;
};

export default User;
