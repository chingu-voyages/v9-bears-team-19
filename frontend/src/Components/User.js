import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const User = props => {
	const { loading, error, data } = useQuery(gql`
		{
			currentUser {
				name
				id
			}
		}
	`);
	console.log(data);
	return <h1>Hello from user</h1>;
};

export default User;
