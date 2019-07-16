import React from 'react'
import AddActivity from './AddActivity'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'

export default function Track() {
  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <Header>Track Activity</Header>
            <AddActivity />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
