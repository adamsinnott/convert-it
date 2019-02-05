import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import HexToDecApp from './containers/HexToDecApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Convert IT!</h1>
        </header>
        <main>
            <HexToDecApp />
        </main>
      </div>
    );
  }
}

export default App;
