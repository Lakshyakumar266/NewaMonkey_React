import React, { useState } from 'react'

import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEW_API
  const pageSize = 12

  const [progress, setProgress] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
        />

        <Switch>

          <Route exact path="/"><News apiKey={apiKey} setProgress={setProgress} key="general" PageSize={pageSize} country="in" category="general" /></Route>

          <Route exact path="/business"><News apiKey={apiKey} setProgress={setProgress} key="business" PageSize={pageSize} country="in" category="business" /></Route>

          <Route exact path="/entertainment"><News apiKey={apiKey} setProgress={setProgress} key="entertainment" PageSize={pageSize} country="in" category="entertainment" /></Route>

          <Route exact path="/health"><News apiKey={apiKey} setProgress={setProgress} key="health" PageSize={pageSize} country="in" category="health" /></Route>

          <Route exact path="/science"><News apiKey={apiKey} setProgress={setProgress} key="science" PageSize={pageSize} country="in" category="science" /></Route>

          <Route exact path="/sports"><News apiKey={apiKey} setProgress={setProgress} key="sports" PageSize={pageSize} country="in" category="sports" /></Route>

          <Route exact path="/technology"><News apiKey={apiKey} setProgress={setProgress} key="technology" PageSize={pageSize} country="in" category="technology" /></Route>

        </Switch>
      </Router>
    </>
  )
}

export default App