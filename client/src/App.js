import React, { Component } from 'react';
import { Route, Switch , Redirect} from 'react-router-dom';
import './App.css';
import NotFoundPage from "./components/NotFoundPage";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";



class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Switch>
              <Route path='/' exact component={SongList}/>
              <Route path='/songs/new' component={SongCreate}/>
              <Route path='/songs/:id' component={SongDetail}/>
              <Route path='/404' exact component={NotFoundPage}/>
              <Redirect from='*' to='/404'/>
          </Switch>
      </div>
    );
  }
}

export default App;
