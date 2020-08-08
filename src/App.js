import React, { Component } from 'react';
import './App.css';
import Meals from './Meals'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <link href="https://fonts.googleapis.com/css?family=Noto+Serif|Rubik:700&display=swap" rel="stylesheet" />
          <h1 className="App-title"><a href='/'>Dinner Menu?!</a></h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/mealsList"/>
                )}/>
                 <Route exact path='/mealsList' component={Meals} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
