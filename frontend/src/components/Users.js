import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const usersQuery = gql`
	{
		users {
			name
			id
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
				console.log(data);
				return data.users.map(v => (
					<p>
						{v.name}, {v.id}
					</p>
				));
			}}
		</Query>
	);
};

export default Users;
