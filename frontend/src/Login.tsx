import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from './service/AuthService'

const loginUrl = process.env.REACT_APP_loginUrl;

const Login = (props:any) => {
  const [ID, setID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  const submitHandler = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ID.trim() === '' || password.trim() === ''){
      setErrorMessage('Both ID and password are required');
      return;
    }
    setErrorMessage(null)
    
    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    }
    const requestBody = {
      user_id: ID,
      password: password
    }

    axios.post(loginUrl, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      props.history.push('/premium-content');
    }).catch((error) => {
      if (error.response.status === 401 || error.response.status === 403){
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage('sorry... the backend server is down. please try again later');
      }
    })
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        ID: <input type="text" value={ID} onChange={event => setID(event.target.value)}/> <br/>
        password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/> <br/>
        <input type="submit" value="Login" />
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
 }

export default Login