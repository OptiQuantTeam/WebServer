import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getToken, getUser } from '../service/AuthService';
import axios from 'axios';
import { useState} from 'react';

const contentUrl = process.env.REACT_APP_contentUrl;

const Setting = (props) => {
  

  const [USER, setUSER] = useState({
    'id': props.setting.user.user_id || '',
    'name': props.setting.user.name || '',
    'email': props.setting.user.email || ''
  });

  const [BINANCE, setBINANCE] = useState({
    'api_key': props.setting.user.api_key || '',
    'secret_key': props.setting.user.secret_key || '',
    'type': props.setting.user.type || '',
    'leverage': props.setting.user.leverage || '',
    'sl': props.setting.user.sl || '',
    'tp': props.setting.user.tp || '',
    'ratio': props.setting.user.ratio || ''
  });
            
  const [SLACK, setSLACK] = useState({
    'channel': props.setting.user.slack_channel || '',
    'token': props.setting.user.slack_token || '',
    'user': props.setting.user.slack_user || ''
  });


  
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
        "name": USER.name,
        "email": USER.email,
        "api_key": BINANCE.api_key,
        "secret_key": BINANCE.secret_key,
        "type": BINANCE.type,
        "leverage": BINANCE.leverage,
        "sl": BINANCE.sl,
        "tp": BINANCE.tp,
        "ratio": BINANCE.ratio,
        "slack_channel": SLACK.slack_channel,
        "slack_token": SLACK.slack_token,
        "slack_user": SLACK.slack_user
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
    {props.type === 'USER' && <TextField id="standard-basic" label="user_id" variant="standard" value={USER.id} onChange={(e) => setUSER({...USER, id: e.target.value})} />}
    {props.type === 'USER' && <TextField id="standard-basic" label="name" variant="standard" value={USER.name} onChange={(e) => setUSER({...USER, name: e.target.value})} />}
    {props.type === 'USER' && <TextField id="standard-basic" label="email" variant="standard" value={USER.email} onChange={(e) => setUSER({...USER, email: e.target.value})} />}
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="api_key" variant="standard" value={BINANCE.api_key} onChange={(e) => setBINANCE({...BINANCE, api_key: e.target.value})} />}
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="secret_key" variant="standard" value={BINANCE.secret_key} onChange={(e) => setBINANCE({...BINANCE, secret_key: e.target.value})} />}
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="type" variant="standard" value={BINANCE.type} onChange={(e) => setBINANCE({...BINANCE, type: e.target.value})} />}
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="leverage" variant="standard" value={BINANCE.leverage} onChange={(e) => setBINANCE({...BINANCE, leverage: e.target.value})} />}
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="sl" variant="standard" value={BINANCE.sl} onChange={(e) => setBINANCE({...BINANCE, sl: e.target.value})} />} 
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="tp" variant="standard" value={BINANCE.tp} onChange={(e) => setBINANCE({...BINANCE, tp: e.target.value})} />}
    {props.type === 'BINANCE' && <TextField id="standard-basic" label="ratio" variant="standard" value={BINANCE.ratio} onChange={(e) => setBINANCE({...BINANCE, ratio: e.target.value})} />}
    {props.type === 'SLACK' && <TextField id="standard-basic" label="slack_channel" variant="standard" value={SLACK.slack_channel} onChange={(e) => setSLACK({...SLACK, slack_channel: e.target.value})} />}
    {props.type === 'SLACK' && <TextField id="standard-basic" label="slack_token" variant="standard" value={SLACK.token} onChange={(e) => setSLACK({...SLACK, token: e.target.value})} />}
    {props.type === 'SLACK' && <TextField id="standard-basic" label="slack_user" variant="standard" value={SLACK.user} onChange={(e) => setSLACK({...SLACK, user: e.target.value})} />}
    <Button variant="contained" onClick={storeHandler}>Store</Button>
    
  </div>;
};

export default Setting;