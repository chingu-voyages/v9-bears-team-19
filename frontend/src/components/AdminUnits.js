import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

const AdminUnits = props => {
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

	const ALL_UNITS = gql`
		query ALL_UNITS {
			dataUnits {
				name
				id
			}
		}
	`;

	const ADD_UNIT_MUTATION = gql`
		mutation ADD_UNIT_MUTATION($name: String!, $dataFields: [String!]!) {
			createDataUnit(name: $name, dataFields: $dataFields) {
				id
			}
		}
	`;

	return (
		<Query query={ALL_UNITS}>
			{({ data, error, loading }) => {
				if (error) {
					return <h1>Error: {error.message}</h1>;
				}
				if (loading) {
					return <h1>Loading...</h1>;
				}
				console.log(data.dataUnits);
				return (
					<fieldset>
						<span>
							Select ALL units which could be used to measure this activity
						</span>
						{data.dataUnits.map(v => (
							<label htmlFor={v.name}>
								{v.name}
								<input type="checkbox" key={v.id} id={v.id} name={v.name} />
							</label>
						))}
					</fieldset>
				);
				// <Mutation
				// 	mutation={ADD_ACTIVITY_MUTATION}
				// 	variables={{ name: formValues.activityName, dataFields }}
				// >
				// 	{createActivity => {
				// 		return (
				// 			<>
				// 				<h1>Add a new activity</h1>
				// 				<form
				// 					method="post"
				// 					onSubmit={e => {
				// 						e.preventDefault();
				// 						createActivity();
				// 					}}
				// 				>
				// 					<fieldset>
				// 						<label htmlFor="activityName">
				// 							Name:
				// 							<input
				// 								name="activityName"
				// 								onChange={handleChange}
				// 								value={formValues.activityName}
				// 							/>
				// 						</label>
				// 						<label htmlFor="dataFields">
				// 							Data Fields:
				// 							{dataFields.map(v => (
				// 								<p>{v}</p>
				// 							))}
				// 							<input
				// 								name="dataFields"
				// 								onChange={handleChange}
				// 								value={formValues.dataFields}
				// 							/>
				// 						</label>
				// 						<button onClick={handleAddField}>+</button>
				// 						<button type="submit">Submit</button>
				// 					</fieldset>
				// 				</form>
				// 			</>
				// 		);
				// 	}}
				// </Mutation>
			}}
		</Query>
	);
};

export default AdminUnits;
