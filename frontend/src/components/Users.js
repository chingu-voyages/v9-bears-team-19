import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const usersQuery = gql`
	{
		users {
			name
			id
			password
		}
	}
`;

const Users = props => {
	return (
		<Query query={usersQuery}>
			{({ data, loading, error }) => {
				if (loading) {
					return <p>loading...</p>;
				}
				if (error) {
					return <p>{error.message}</p>;
				}
				return data.users.map(v => (
					<p>
						{v.name}, {v.id}, {v.password}
					</p>
				));
			}}
		</Query>
	);
};

export default Users;
