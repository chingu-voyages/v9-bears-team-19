import React from "react";
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
		)
	}
	{
		id
	}
`;

const AddActivity = props => (
	<Mutation mutation={CREATE_ACTIVITY_MUTATION}>
		{createActivity => {
			return (
				<form>
					<label>
						test <input type="text" />
					</label>
				</form>
			);
		}}
	</Mutation>
);

export default AddActivity;
