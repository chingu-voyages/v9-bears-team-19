import React from 'react'
import { Segment, List, Grid } from 'semantic-ui-react'

import { workoutData } from './DummyData'

export default function History() {
  let renderHistory = (workoutData) => {
    return workoutData.map(workout => {
      return (
        <List.Item horizontal>
          <List.Content>
            <List.Header>{workout.date}</List.Header>
            <List.Item>Type: {workout.workoutType}</List.Item>
            <List.Item>Time Elapsed: {workout.timeElapsed}</List.Item>
            <List.Item>Distance: {workout.distance}</List.Item>
          </List.Content>
        </List.Item>
      )
    })
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={8}>
          <Segment>
            <List divided relaxed align="left" size={"large"}>
              {renderHistory(workoutData)}
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
