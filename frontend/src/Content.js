import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';

const Content = (props) => {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name: '';

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      Hello {name}! You have been loggined in!!! <br/>
      <input type="button" value="Logout" onClick={logoutHandler}/>
    </div>
  )
}

export default Content