import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import React from "react";

import {RootState} from "../redux/reducers";
import {UserState} from "../redux/user/types";

interface OwnProps {
  component: React.FC;
  roles: string[];
}

type IProps = MapStateProps & OwnProps;

const PrivateRoute: React.FC<IProps> = props => {
  const {component: Component, roles, user: {isAuthenticated, user}, ...rest} = props;
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (!isAuthenticated) return <Redirect
          to={{pathname: "/login", state: {from: props.location}}}/>
        if (!!user && !roles.includes(user?.role)) return <Redirect
          to={{pathname: '/', state: {from: props.location}}}/>
        return <Component {...props}/>
      }}/>
  );
};

interface MapStateProps {
  user: UserState;
}

const mapStateToProps = (state: RootState): MapStateProps => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
