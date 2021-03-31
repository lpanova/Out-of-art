import React, { useContext } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Home from './Home';
import Paintings from './Paintings';
import Login from './Login';
import Register from './Register';
import CreatePainting from './CreatePainting';
import MyPaintings from './MyPaintings';
import PaintingDetails from './PaintingDetails';
import EditPainting from './EditPainting';
import Error from './Error';
import { userAuthContext } from '../context/UserAuthentication';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';

function AppRouter(props) {
  let location = useLocation();
  const { userAuth } = useContext(userAuthContext);
  return (
    <div className="second">
      <ErrorBoundary key={location.pathname}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/paintings" component={Paintings} />
          <Route
            exact
            path="/mypaintings"
            render={() =>
              userAuth.username ? <MyPaintings /> : <Redirect to="/login" />
            }
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/details/:id" component={PaintingDetails} />
          <Route exact path="/edit/:id" component={EditPainting} />
          <Route
            exact
            path="/create"
            render={() =>
              userAuth.username ? <CreatePainting /> : <Redirect to="/login" />
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
