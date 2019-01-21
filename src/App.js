import React, { Component } from 'react';
import 'react-bootstrap';
import ColumnConfigForm from './components/ColumnConfigForm';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header></header>
        <ColumnConfigForm />
      </div>
    );
  }
}

export default App;
