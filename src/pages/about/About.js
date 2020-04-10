import React from 'react';
import { Button } from 'react-bootstrap';
import './About.css';
import Author from '../../components/author/Author'

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  render() {
    return (
      <div className="App" id="about-board">
        <h3>Hi! We're in About</h3>
        <Button onClick={() => this.setState(state => ({ show: !state.show }))}>Turn Off </Button>
        {this.state.show && <Author name="Diogo" info={{ work: "teacher", description: "nice teacher" }} />}
      </div>
    );
  }
}
