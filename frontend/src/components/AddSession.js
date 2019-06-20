import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

const AddSession = props => {
	const [formValues, setFormValues] = useState({});
	const [dataValues, setDataValues] = useState({});

	const handleChange = e => {
		e.preventDefault();
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleAddData = e => {
		e.preventDefault();
		setDataValues({ ...dataValues, [e.target.name]: e.target.value });
		setFormValues({ ...formValues, dataValues: JSON.stringify(dataValues) });
	};

	const ADD_SESSION_MUTATION = gql`
		mutation ADD_ACTIVITY_MUTATION(
			$name: String!
			$date: String!
			$activityType: String!
			$dataValues: String!
		) {
			createSession(
				name: $name
				date: $date
				activityType: $activityType
				dataValues: $dataValues
			) {
				id
			}
		}
	`;

	const ALL_ACTIVITIES_QUERY = gql`
		query ALL_ACTIVITIES_QUERY {
			activities {
				id
				name
				dataFields
			}
		}
	`;

	return (
		<Query query={ALL_ACTIVITIES_QUERY}>
			{({ data, loading, error }) => {
				if (loading) {
					return <p>...Loading</p>;
				}
				if (error) {
					return <p>Error: {error.message}</p>;
				}
				return (
					<Mutation mutation={ADD_SESSION_MUTATION} variables={formValues}>
						{createSession => {
							return (
								<>
									<h1>Add a new session</h1>
									<form
										method="post"
										onSubmit={e => {
											e.preventDefault();
											createSession();
										}}
									>
										<fieldset>
											<label htmlFor="name">
												Name:
												<input
													name="name"
													onChange={handleChange}
													value={formValues.name}
												/>
											</label>
											<label htmlFor="date">
												date:
												<input
													name="date"
													onChange={handleChange}
													value={formValues.date}
												/>
											</label>
											<label htmlFor="activityType">
												activityType:
												<select name="activityType" onChange={handleChange}>
													{data.activities.map(v => (
														<option value={v.id} key={v.id}>
															{v.name}
														</option>
													))}
												</select>
											</label>
											{!!formValues.activityType &&
												data.activities
													.filter(v => v.id === formValues.activityType)[0]
													.dataFields.map(v => (
														<label htmlFor={v}>
															{v}:
															<input
																name={v}
																key={v}
																onChange={handleAddData}
																value={dataValues[v]}
															/>
														</label>
													))}
											<button type="submit">Submit</button>
										</fieldset>
									</form>
								</>
							);
						}}
					</Mutation>
				);
			}}
		</Query>
	);
};

export default AddSession;
