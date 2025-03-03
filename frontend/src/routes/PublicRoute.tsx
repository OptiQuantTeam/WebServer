import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getToken } from '../service/AuthService';
import { IComponent } from '../interface/IComponent';

const PublicRoute: React.FC<IComponent> = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !getToken() ? <Component {...props}/>
        : <Redirect to={{pathname: '/premium-content'}}/>
      }}
    />
  )
}

export default PublicRoute