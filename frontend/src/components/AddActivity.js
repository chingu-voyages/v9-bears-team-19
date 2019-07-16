import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Form, Container, Grid } from 'semantic-ui-react'

const CREATE_ACTIVITY_MUTATION = gql`
	mutation CREATE_ACTIVITY_MUTATION(
		$ActivityType: String!
		$date: String!
		$title: String!
		$distance: Float!
		$distance_unit: String!
		$duration: Int!
		$elevation: Float!
		$elevation_unit: String!
	) {
		createActivity(
			ActivityType: $ActivityType
			date: $date
			title: $title
			distance: $distance
			distance_unit: $distance_unit
			duration: $duration
			elevation: $elevation
			elevation_unit: $elevation_unit
		) {
			id
		}
	}
`;



const AddActivity = props => {
	const [formValues, setFormValues] = useState({
		date: "01-01-2001",
		distance: 0
	});

	const handleChange = e => {
		e.preventDefault();
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	console.table(formValues);
	return (
		<Mutation mutation={CREATE_ACTIVITY_MUTATION} variables={formValues}>
			{createActivity => {
				return (
					<Form>

						<Form.Field>
							<label htmlFor="date">Date</label>
							<input
								placeholder="Date"
								type="date"
								name="date"
								value={formValues.date}
								onChange={handleChange}
							/>
						</Form.Field>
						
						<Form.Select
							label="Activity Type"
							id="ActivityType"
							name="ActivityType"
							value={formValues.ActivityType}
							onChange={handleChange}
							options={[
								{ text: 'Running', value: 'RUNNING' },
								{ text: 'Cycling', value: 'CYCLING' }
							]}
						>
						</Form.Select>
						
						<Form.Field>
							<label htmlFor="title">Activity Title</label>
							<input
								type="text"
								name="title"
								value={formValues.title}
								onChange={handleChange}
							/>
						</Form.Field>

						<Form.Field>
							<label htmlFor="distance">Distance</label>
							<input
								type="number"
								name="distance"
								value={formValues.distance}
								onChange={handleChange}
							/>
						</Form.Field>

						<Form.Field>
							<label htmlFor="duration">Duration</label>
							<input
								type="number"
								name="duration"
								value={formValues.duration}
								onChange={handleChange}
							/>
						</Form.Field>

						<Button type="submit">Log Workout</Button>
						
					</Form>
				);
			}}
		</Mutation>
	);
};

export default AddActivity;
