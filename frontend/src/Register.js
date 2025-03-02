import React, {useState} from 'react';
import axios from 'axios';

const registerUrl = 'https://6ai91tqlw0.execute-api.ap-northeast-2.amazonaws.com/prod/register';

const Register = () => {
  const [ID, setID] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (ID.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === ''){
      setMessage('All fields are required')
      return;
    }
    setMessage(null)
    
    const requestConfig = {
      headers: {
        'x-api-key': 'JQJiilHgU61t5MB9MMYIcaEhfiOPmmkL4W49KdaA'
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