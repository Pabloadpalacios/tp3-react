
import './App.css';
import React, { Component } from 'react';
import HeroesComponent from './HeroesComponent';
import DashboardComponent from './DashboardComponent';
function App() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Tour of Heroes</h1>          
        </header>
        <body> 
          <HeroesComponent/>
          <DashboardComponent></DashboardComponent>
        </body>
      </div>
    )
}

export default App;
