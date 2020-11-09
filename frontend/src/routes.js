import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import Feed from './pages/Feed'
import NewFarm from './pages/NewFarm'
import Details from './pages/Details'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Feed}/>
        <Route path="/register" component={Register}/>

        <Route path="/login" component={Logon}/>
        <Route path="/farm/new" component={NewFarm}/>
        <Route path="/farm/detail" component={Details}/>
      </Switch>
    </BrowserRouter>
  )
}
