import React from "react";
import { Segment, List, Grid, Button, Divider } from "semantic-ui-react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ACTIVITIES_QUERY = gql`
	{
		activities {
			title
			id
			date
			duration
			ActivityType
		}
	}
`;

export default function History() {
	return (
		<Query query={ACTIVITIES_QUERY}>
			{({ data, error, loading }) => {
				if (error) {
					return <h1> Error! : {error.message}</h1>;
				}
				if (loading) {
					return <h1>Loading...</h1>;
				}

				if (data) {
					let renderHistory = data.activities.map(workout => (
						<List.Item key={workout.id} horizontal>
							<Button floated="right">Edit</Button>
							<List.Header>{workout.date}</List.Header>
							<List.Content horizontal>
								<List.Description>
									{workout.ActivityType} | {workout.distance} km |{" "}
									{workout.duration} min
								</List.Description>
							</List.Content>
						</List.Item>
					));
					return (
						<Grid centered>
							<Grid.Row>
								<Grid.Column>
									<Segment>
										<List divided relaxed verticalAlign="middle" size={"big"}>
											{renderHistory}
										</List>
									</Segment>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					);
				}
			}}
		</Query>
	);
}
