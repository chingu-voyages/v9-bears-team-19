import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'

import TopNavbar from './components/TopNavbar'
import Placeholder from './components/Placeholder'

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Container>
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </Container>
    </div>
  );
}

export default App;
