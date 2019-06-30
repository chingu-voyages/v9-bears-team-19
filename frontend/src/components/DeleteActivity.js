import React from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";

const DELETE_ACTIVITY_MUTATION = gql`
	mutation DELETE_ACTIVITY_MUTATION($id: String!) {
		deleteActivity(id: $id) {
			message
		}
	}
`;

const DeleteActivity = props => {
	console.log(props);
	return (
		<Mutation
			mutation={DELETE_ACTIVITY_MUTATION}
			variables={{ id: "cjx3b0yv9m3380b51rihtqhza" }}
		>
			{deleteActivity => {
				return (
					<button
						onClick={e => {
							e.preventDefault();
							deleteActivity();
						}}
					>
						Delete Activity
					</button>
				);
			}}
		</Mutation>
	);
};

DeleteActivity.propTypes = {
	id: PropTypes.string.isRequired
};

export default DeleteActivity;
