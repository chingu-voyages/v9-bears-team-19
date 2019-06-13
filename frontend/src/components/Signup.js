import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";

const Signup = () => {
	const [formValues, setFormValues] = useState({});

	const handleChange = e => {
		e.preventDefault();
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const SIGNUP_MUTATION = gql`
		mutation SIGNUP_MUTATION(
			$email: String!
			$name: String!
			$password: String!
			$club: String!
		) {
			createUser(email: $email, name: $name, club: $club, password: $password) {
				id
			}
		}
	`;

	return (
		<Mutation
			mutation={SIGNUP_MUTATION}
			variables={formValues}
			refetchQueries={[{ query: CURRENT_USER_QUERY }]}
		>
			{createUser => {
				return (
					<form
						method="post"
						onSubmit={e => {
							e.preventDefault();
							createUser();
						}}
					>
						<fieldset>
							<h2>Sign Up</h2>
							<label htmlFor="name">
								Name:
								<input name="name" onChange={handleChange} />
							</label>
							<label htmlFor="email">
								Email:
								<input name="email" onChange={handleChange} />
							</label>
							<label htmlFor="club">
								Club:
								<input name="club" onChange={handleChange} />
							</label>
							<label>
								Password:
								<input
									name="password"
									type="password"
									onChange={handleChange}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</form>
				);
			}}
		</Mutation>
	);
};

export default Signup;
