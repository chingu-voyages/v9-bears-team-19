import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";

// querying apollo-server for all clubs

const ALL_CLUBS_QUERY = gql`
	query ALL_CLUBS_QUERY {
		clubs {
			id
			name
			email
			address
		}
	}
`;

const AllClubs = props => {
	return (
		<Query query={ALL_CLUBS_QUERY}>
			{/* query returns an object including data,error & loading */}
			{({ data, error, loading }) => {
				if (loading) {
					return <h1>Loading...</h1>;
				}
				if (error) {
					return <h1> Error: {error.message}</h1>;
				}
				// take the data object and map over clubs creating a link with a handleclick coming from props
				return data.clubs.map(v => (
					<a onClick={() => props.handleClick(v)}>
						<div key={v.id}>
							<div>{v.name}</div>
							<div>{v.email}</div>
							<div>{v.address}</div>
						</div>
					</a>
				));
			}}
		</Query>
	);
};

// expect props.handleClick to be a function
AllClubs.propTypes = {
	handleClick: PropTypes.func
};

// or if there is no function, do nothing
AllClubs.defaultProps = {
	handleClick: () => {}
};

export default AllClubs;
