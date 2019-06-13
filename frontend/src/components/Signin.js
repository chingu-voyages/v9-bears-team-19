import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const Signin = () => {
	const [formValues, setFormValues] = useState({});

	const handleChange = e => {
		e.preventDefault();
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const SIGNIN_MUTATION = gql`
		mutation SIGNUP_MUTATION($email: String!, $password: String!) {
			loginUser(email: $email, password: $password) {
				id
			}
		}
	`;

	return (
		<Mutation mutation={SIGNIN_MUTATION} variables={formValues}>
			{loginUser => {
				return (
					<form
						method="post"
						onSubmit={e => {
							e.preventDefault();
							loginUser();
						}}
					>
						<fieldset>
							<h2>Sign In</h2>
							<label htmlFor="email">
								Email:
								<input name="email" onChange={handleChange} />
							</label>
							<label>
								Password:
								<input
									name="password"
									type="password"
									onChange={handleChange}
								/>
							</label>
							<button type="submit">Sign In</button>
						</fieldset>
					</form>
				);
			}}
		</Mutation>
	);
};

export default Signin;
