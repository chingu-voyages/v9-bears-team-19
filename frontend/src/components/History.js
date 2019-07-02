import React from 'react'
import { Segment, List, Grid, Button, Divider } from 'semantic-ui-react'

import { workoutData } from './DummyData'

export default function History() {
  let renderHistory = (workoutData) => {
    return workoutData.map(workout => {
      return (
        <List.Item horizontal>
          <Button floated="right">Edit</Button>
          <List.Header>{workout.date}</List.Header>
          <List.Content horizontal>
            <List.Description>{workout.workoutType}  | {workout.distance} km  |  {workout.timeElapsed} min</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <List divided relaxed verticalAlign='middle' size={'big'}>
              {renderHistory(workoutData)}
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
