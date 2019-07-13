import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

const AddActivity = props => {
	const [formValues, setFormValues] = useState({});
	const [activityName, setActivityName] = useState("");
	const [dataFields, setDataFields] = useState([]);

	const handleChange = e => {
		e.preventDefault();
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleAddField = e => {
		e.preventDefault();
		console.log(e.target.value);
		setDataFields([...dataFields, formValues.dataFields]);
		setFormValues({ ...formValues, dataFields: "" });
	};

	const ADD_ACTIVITY_MUTATION = gql`
		mutation ADD_ACTIVITY_MUTATION($name: String!, $dataFields: [String!]!) {
			createActivity(name: $name, dataFields: $dataFields) {
				id
			}
		}
	`;

	const QUERY_DATA_FIELDS = gql`
		query QUERY_DATA_FIELDS {
			dataMetrics {
				dataName
				id
			}
		}
	`;

	return (
		<Query query={QUERY_DATA_FIELDS}>
			{({ error, loading, data }) => {
				if (error) {
					return <h1> Error: {error}</h1>;
				}
				if (loading) {
					return <h1> Loading... </h1>;
				}
				return (
					<Mutation
						mutation={ADD_ACTIVITY_MUTATION}
						variables={{ name: formValues.activityName, dataFields }}
					>
						{createActivity => {
							return (
								<>
									<h1>Add a new activity</h1>
									<form
										method="post"
										onSubmit={e => {
											e.preventDefault();
											createActivity();
										}}
									>
										<fieldset>
											<label htmlFor="activityName">
												Name:
												<input
													name="activityName"
													onChange={handleChange}
													value={formValues.activityName}
												/>
											</label>
											{console.log(data.dataMetrics)}
											Data Fields:
											<fieldset>
												{data.dataMetrics.map(v => (
													<label htmlFor={v.id}>
														{v.dataName}
														<input
															type="checkbox"
															onChange={handleChange}
															id={v.id}
															name={v.dataName}
															value={formValues[v.dataName]}
														/>
													</label>
												))}
											</fieldset>
											{console.log(formValues)}
											<button onClick={handleAddField}>+</button>
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

export default AddActivity;
