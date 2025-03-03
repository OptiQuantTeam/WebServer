import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';
import { IUser } from './interface/IUser';

const PremiumContent = (props:any) => {
  const user:IUser|null|undefined = getUser();
  const name = user !== undefined && user ? user.name: '';

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

export default PremiumContent