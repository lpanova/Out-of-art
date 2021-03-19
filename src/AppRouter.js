import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Paints from './components/Paints';

import Login from './components/Login';
import Register from './components/Register';
import CreatePaint from './components/CreatePaint';
import MyPaints from './components/MyPaints';
import PaintDetails from './components/PaintDetails';
import EditPaint from './components/EditPaint';
import ErrorRoute from './components/ErrorRoute';
import { userAuthContext } from './context/UserAuthentication';

function AppRouter(props) {
  const { userAuth } = useContext(userAuthContext);
  return (
    <div className="second">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/paints" component={Paints} />
        <Route
          exact
          path="/mypaints"
          render={() =>
            userAuth.username ? <MyPaints /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/details/:id" component={PaintDetails} />
        <Route exact path="/edit/:id" component={EditPaint} />
        <Route
          exact
          path="/create"
          render={() =>
            userAuth.username ? <CreatePaint /> : <Redirect to="/login" />
          }
        />
        <Route component={ErrorRoute} />
      </Switch>
    </div>
  );
}

export default AppRouter;
