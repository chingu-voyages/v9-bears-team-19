import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Form, Container, Header, Grid, Segment } from 'semantic-ui-react'


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
		<Mutation mutation={SIGNUP_MUTATION} variables={formValues}>
			{createUser => {
				return (
					<Container text textAlign="left">
						<Grid centered columns={2}>
							<Grid.Column>
								<Segment>
									<Header as="h2">Sign Up</Header>
									<Form
										method="post"
										onSubmit={e => {
											e.preventDefault();
											createUser();
										}}
									>
										<Form.Field>
											<label>Name</label>
											<input name="name" placeHolder="John Doe" onChange={handleChange} />
										</Form.Field>
										<Form.Field>
											<label htmlFor="email">Email</label>
											<input name="email" placeHolder="myemail@domain.com" onChange={handleChange} />
										</Form.Field>
										<Form.Field>
											<label htmlFor="club">Club</label>
											<input name="club" placeHolder="LA Area Runners" onChange={handleChange} />
										</Form.Field>
										<Form.Field>
											<label>Password</label>
											<input
												name="password"
												type="password"
												onChange={handleChange}
												placeholder="sneaky_password_123"
											/>
										</Form.Field>
											<Button type="submit">Submit</Button>
									</Form>
								</Segment>
							</Grid.Column>
						</Grid>
					</Container>
				);
			}}
		</Mutation>
	);
};

export default Signup;
