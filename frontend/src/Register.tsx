import React, {useState} from 'react';
import axios from 'axios';

const registerUrl = process.env.REACT_APP_registerUrl;

const Register = () => {
  const [ID, setID] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string|null>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ID.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === ''){
      setMessage('All fields are required')
      return;
    }
    setMessage(null)
    
    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    }
    const requestBody = {
      user_id: ID,
      email: email,
      name: name,
      password: password
    }
    axios.post(registerUrl, requestBody, requestConfig).then(response => {
      setMessage('Registeration Successful')
    }).catch(error => {
      if (error.response.status === 401){
        setMessage(error.response.data.message);
      } else {
        setMessage('sorry... the backend server is down!! please try again later')
      }
    })
  }
  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        ID: <input type="text" value={ID} onChange={event => setID(event.target.value)}/> <br/>
        email: <input type="text" value={email} onChange={event => setEmail(event.target.value)}/> <br/>
        name: <input type="text" value={name} onChange={event => setName(event.target.value)}/> <br/>
        password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/> <br/>
        <input type="submit" value="Register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Register