import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const SESSIONS_QUERY = gql`
	{
		sessions {
			name
			id
			date
			activityType {
				id
				name
			}
		}
	}
`;

const Sessions = props => {
	return (
		<Query query={SESSIONS_QUERY}>
			{({ data, loading, error }) => {
				if (loading) {
					return <p>loading...</p>;
				}
				if (error) {
					return <p>{error.message}</p>;
				}
				return data.sessions.map(v => (
					<p>
						{v.name}, {v.activityType}, {v.id}, {v.date}
					</p>
				));
			}}
		</Query>
	);
};

export default Sessions;
