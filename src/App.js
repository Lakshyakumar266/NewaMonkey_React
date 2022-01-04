import React, { Component } from 'react'

import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEW_API
  pageSize = 12
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />

          <Switch>

            <Route exact path="/"><News apiKey={this.apiKey} setProgress={this.setProgress} key="general" PageSize={this.pageSize} country="in" category="general" /></Route>

            <Route exact path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} key="business" PageSize={this.pageSize} country="in" category="business" /></Route>

            <Route exact path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" PageSize={this.pageSize} country="in" category="entertainment" /></Route>

            <Route exact path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} key="health" PageSize={this.pageSize} country="in" category="health" /></Route>

            <Route exact path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} key="science" PageSize={this.pageSize} country="in" category="science" /></Route>

            <Route exact path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" PageSize={this.pageSize} country="in" category="sports" /></Route>

            <Route exact path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" PageSize={this.pageSize} country="in" category="technology" /></Route>

          </Switch>
        </Router>
      </>
    )
  }
}
