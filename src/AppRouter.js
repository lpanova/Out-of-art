import React, { useContext } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Paints from './components/Paints';

import Login from './components/Login';
import Register from './components/Register';
import CreatePaint from './components/CreatePaint';
import MyPaints from './components/MyPaints';
import PaintDetails from './components/PaintDetails';
import EditPaint from './components/EditPaint';
import Error from './components/Error';
import { userAuthContext } from './context/UserAuthentication';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './components/NotFound';

function AppRouter(props) {
  let location = useLocation();
  const { userAuth } = useContext(userAuthContext);
  return (
    <div className="second">
      <ErrorBoundary key={location.pathname}>
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
          <Route path="/error" component={Error} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default AppRouter;
