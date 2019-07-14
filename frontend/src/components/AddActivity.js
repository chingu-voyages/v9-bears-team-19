import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

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

const parseDate = dateString => {
	const re = new RegExp(`(<day>\d{2})-(<month>\d{2})-(<year>\d{4})`);
};

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
					<form>
						<label htmlFor="date">
							Date
							<input
								type="date"
								name="date"
								value={formValues.date}
								onChange={handleChange}
							/>
						</label>
						<label htmlFor="ActivityType">
							Activity Type
							<select
								id="ActivityType"
								name="ActivityType"
								value={formValues.ActivityType}
								onChange={handleChange}
							>
								<option>--Choose an Activity Type--</option>
								<option value="CYCLING">Cycling</option>
								<option value="RUNNING">Running</option>
							</select>
						</label>
						<label htmlFor="title">
							Activity Title
							<input
								type="text"
								name="title"
								value={formValues.title}
								onChange={handleChange}
							/>
						</label>
						<label htmlFor="distance">
							Distance
							<input
								type="number"
								name="distance"
								value={formValues.distance}
								onChange={handleChange}
							/>
						</label>
					</form>
				);
			}}
		</Mutation>
	);
};

export default AddActivity;
