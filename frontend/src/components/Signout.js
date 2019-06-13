import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const Signout = () => {
	const SIGNOUT_MUTATION = gql`
		mutation SIGNOUT_MUTATION($email: String!, $password: String!) {
			logoutUser {
				message
			}
		}
	`;

	return (
		<Mutation mutation={SIGNOUT_MUTATION}>
			{logoutUser => {
				return (
					<form
						method="post"
						onSubmit={e => {
							e.preventDefault();
							logoutUser();
						}}
					>
						<fieldset>
							<button type="submit">Sign Out</button>
						</fieldset>
					</form>
				);
			}}
		</Mutation>
	);
};

export default Signout;
