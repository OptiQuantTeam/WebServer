import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getToken, getUser } from '../service/AuthService';
import axios from 'axios';
import { useState } from 'react';

const contentUrl = process.env.REACT_APP_contentUrl;

const Setting = (props) => {
  const [id, setID] = useState(props.setting.user.user_id); 
  const [name, setName] = useState(props.setting.user.name || '');
  const [email, setEmail] = useState(props.setting.user.email || '');
  const [api_key, setApiKey] = useState(props.setting.user.api_key || '');
  const [secret_key, setSecretKey] = useState(props.setting.user.secret_key || '');
  const [type, setType] = useState(props.setting.user.type || '');
  const [leverage, setLeverage] = useState(props.setting.user.leverage || '');
  const [sl, setSL] = useState(props.setting.user.sl || '');
  const [tp, setTP] = useState(props.setting.user.tp || '');
  const [ratio, setRatio] = useState(props.setting.user.ratio || '');
  const [slack_channel, setSlackChannel] = useState(props.setting.user.slack_channel || '');
  const [slack_token, setSlackToken] = useState(props.setting.user.slack_token || '');
  const [slack_user, setSlackUser] = useState(props.setting.user.slack_user || '');
  
  const storeHandler = () => {
    console.log(props.setting);
    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    }
    const requestBody = {
      user_id: getUser().user_id,
      token: getToken() ,
      type: 'updateSetting',
      data: {
        "name": name,
        "email": email,
        "api_key": api_key,
        "secret_key": secret_key,
        "type": type,
        "leverage": leverage,
        "sl": sl,
        "tp": tp,
        "ratio": ratio,
        "slack_channel": slack_channel,
        "slack_token": slack_token,
        "slack_user": slack_user
      }
    }
    
    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  return <div>
    Setting <br/>
    <TextField id="standard-basic" label="user_id" variant="standard" value={id} onChange={(e) => setID(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="api_key" variant="standard" value={api_key} onChange={(e) => setApiKey(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="secret_key" variant="standard" value={secret_key} onChange={(e) => setSecretKey(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="type" variant="standard" value={type} onChange={(e) => setType(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="leverage" variant="standard" value={leverage} onChange={(e) => setLeverage(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="sl" variant="standard" value={sl} onChange={(e) => setSL(e.target.value)} /> <br/> 
    <TextField id="standard-basic" label="tp" variant="standard" value={tp} onChange={(e) => setTP(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="ratio" variant="standard" value={ratio} onChange={(e) => setRatio(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="slack_channel" variant="standard" value={slack_channel} onChange={(e) => setSlackChannel(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="slack_token" variant="standard" value={slack_token} onChange={(e) => setSlackToken(e.target.value)} /> <br/>
    <TextField id="standard-basic" label="slack_user" variant="standard" value={slack_user} onChange={(e) => setSlackUser(e.target.value)} /> <br/>
    <Button variant="contained" onClick={storeHandler}>Store</Button>
    
  </div>;
};

export default Setting;