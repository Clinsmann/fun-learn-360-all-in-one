import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import React from "react";

import {RootState} from "../redux/reducers";

interface OwnProps {
  component: React.FC;
  path?: string;
}

type IProps = MapStateProps & OwnProps;

const UnPrivateRoute: React.FC<IProps> = props => {
  const {component: Component, isAuthenticated, ...rest} = props;
  return (
    <Route
      {...rest}
      render={(props: any) => isAuthenticated ?
        <Redirect to={{pathname: "/", state: {from: props.location}}}/> :
        <Component {...props}/>
      }/>
  );
};

interface MapStateProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(UnPrivateRoute);
