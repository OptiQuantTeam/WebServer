import React from 'react';
import { getUser, resetUserSession, getToken } from './service/AuthService';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useState } from 'react';
import Graph from './component/Graph';
import ContractList from './component/ContractList';
import Setting from './component/Setting';
import axios from 'axios';

const contentUrl = process.env.REACT_APP_contentUrl;



const Content = (props) => {
  const [content, setContent] = useState('Default');
  const [setting, setSetting] = useState(null);
  const [contractList, setContractList] = useState(null);

  const user = getUser();
  const name = user !== 'undefined' && user ? user.name: '';

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('/login');
  }

  const settingHandler = (event) => {
    //props.history.push('/content/getSetting');
    event.preventDefault();
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }
    
    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    }
    const requestBody = {
      user_id: user.user_id,
      token: token,
      type: 'getSetting'
    }
    console.log(requestBody);
    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      setContent('Setting');
      console.log(response.data);
      setSetting(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const contractListHandler = (event) => {
    event.preventDefault();
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }
    
    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    }
    const requestBody = {
      user_id: user.user_id,
      token: token,
      type: 'contractList',
      symbol: 'ETHUSDT' // 다른 자산을 보고 싶으면 이 곳을 수정하면 됨
    }
    console.log(requestBody);
    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      setContent('ContractList');
      console.log(response.data);
      setContractList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }


  return (
    <div>
      Hello {name}! You have been loggined in!!! <br/>
      <input type="button" value="Logout" onClick={logoutHandler}/> <br/>
      <Button variant="contained">Hello world</Button>
      <List
      sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>

        <ListItemText primary="Graph" onClick={() => setContent('Graph')}/>
      </ListItemButton>
      <ListItemButton>

        <ListItemText primary="ContractList" onClick={contractListHandler}/>
      </ListItemButton>
      <ListItemButton >

        <ListItemText primary="Setting" onClick={settingHandler}/>
       
      </ListItemButton>

    </List>

      {content === 'Graph' && <Graph />}
      {content === 'ContractList' && <ContractList contractList={contractList} />}
      {content === 'Setting' && <Setting setting={setting} />}

    </div>
  )
}

export default Content