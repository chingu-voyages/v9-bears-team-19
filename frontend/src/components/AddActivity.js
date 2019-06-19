import React, { useState } from "react";
import { Mutation } from "react-apollo";
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
	};

	const ADD_ACTIVITY_MUTATION = gql`
		mutation ADD_ACTIVITY_MUTATION($name: String!, $dataFields: [String!]!) {
			createActivity(name: $name, dataFields: $dataFields) {
				id
			}
		}
	`;

	return (
		<Mutation mutation={ADD_ACTIVITY_MUTATION} variables={formValues}>
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
									<input name="activityName" onChange={handleChange} />
								</label>
								<label htmlFor="dataFields">
									Data Fields:
									{dataFields.map(v => (
										<p>{v}</p>
									))}
									<input
										name="dataFields"
										onChange={handleChange}
										value={formValues[dataFields]}
									/>
								</label>
								<button onClick={handleAddField}>+</button>
								<button type="submit">Submit</button>
							</fieldset>
						</form>
					</>
				);
			}}
		</Mutation>
	);
};

export default AddActivity;
