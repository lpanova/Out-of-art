import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Paints from './components/Paints';
import Login from './components/Login';
import Register from './components/Register';
import CreatePaint from './components/CreatePaint';
import MyPaints from './components/MyPaints';
import PaintDetails from './components/PaintDetails';
import EditPaint from './components/EditPaint';

function AppRouter(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/paints" component={Paints} />
        <Route exact path="/mypaints" component={MyPaints} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create" component={CreatePaint} />
        <Route exact path="/details/:id" component={PaintDetails} />
        <Route exact path="/edit/:id" component={EditPaint} />
      </Switch>
    </div>
  );
}

export default AppRouter;
