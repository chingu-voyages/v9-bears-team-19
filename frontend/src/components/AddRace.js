import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const ADD_RACE_MUTATION = gql`
	mutation ADD_RACE_MUTATION(
		$ActivityType: String!
		$title: String!
		$event_date: String
		$competitors: [String]!
		$race_times: [String]!
	) {
		createActivity(
			ActivityType: $ActivityType
			event_date: $event_date
			title: $title
			competitors: $competitors
			race_times: $race_times
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

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<Mutation mutation={ADD_RACE_MUTATION} variables={formValues}>
			{createRace => {
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
							Race Name
							<input
								type="text"
								name="title"
								value={formValues.title}
								onChange={handleChange}
							/>
						</label>
						<button type="submit">Submit</button>
					</form>
				);
			}}
		</Mutation>
	);
};

export default AddActivity;
