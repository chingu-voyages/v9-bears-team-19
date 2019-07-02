import React from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";

const DELETE_SESSION_MUTATION = gql`
	mutation DELETE_SESSION_MUTATION($id: String!) {
		deleteSession(id: $id) {
			message
		}
	}
`;

const DeleteSession = props => {
	return (
		<Mutation mutation={DELETE_SESSION_MUTATION} variables={{ id: props.id }}>
			{deleteSession => {
				return (
					<button
						onClick={e => {
							e.preventDefault();
							deleteSession();
						}}
					>
						Delete Session
					</button>
				);
			}}
		</Mutation>
	);
};

DeleteSession.propTypes = {
	id: PropTypes.string.isRequired
};

export default DeleteSession;
