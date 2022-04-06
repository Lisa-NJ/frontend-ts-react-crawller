import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import HomePage from './Pages/Home'

export default () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  )
}
