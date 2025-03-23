import React, { useState } from 'react';
import { getUser, resetUserSession, getToken } from './service/AuthService';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import GraphIcon from '@mui/icons-material/ShowChart';
import Income from './component/Income';
import SettingsIcon from '@mui/icons-material/Settings';
import ContractIcon from '@mui/icons-material/AccountBalance';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Graph from './component/Graph';
import ContractList from './component/ContractList';
import Setting from './component/Setting';
import axios from 'axios';
import Balance from './component/Balance';

const contentUrl = process.env.REACT_APP_contentUrl;

const Content = (props) => {
  const [content, setContent] = useState('Default');
  const [setting, setSetting] = useState(null);
  const [incomeList, setIncomeList] = useState(null);
  const [settingType, setSettingType] = useState(null);
  const [contractList, setContractList] = useState(null);
  const [openGraph, setOpenGraph] = useState(false);
  const [openContractList, setOpenContractList] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openBalance, setOpenBalance] = useState(false);
  const [openIncome, setOpenIncome] = useState(false);
  const [balanceList, setBalanceList] = useState(null);

  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('/login');
  }

  // Income 데이터를 가져오는 핸들러 추가
  const incomeHandler = () => {
    const token = getToken();
    if (!token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    };
    const requestBody = {
      user_id: user.user_id,
      token: token,
      type: 'income'
    };

    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      setContent('Income');
      setIncomeList(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const settingHandler = (type) => {
    const token = getToken();
    if (!token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    };
    const requestBody = {
      user_id: user.user_id,
      token: token,
      type: 'getSetting'
    };

    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      setContent('Setting');
      setSetting(response.data);
      setSettingType(type);
    }).catch((error) => {
      console.log(error);
    });
  }

  const contractListHandler = () => {
    const token = getToken();
    if (!token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    };
    const requestBody = {
      user_id: user.user_id,
      token: token,
      type: 'contractList'
    };

    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      setContent('ContractList');
      setContractList(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleGraphClick = () => {
    setOpenGraph(!openGraph);
  };

  const handleContractListClick = () => {
    setOpenContractList(!openContractList);
  };

  const handleSettingClick = () => {
    setOpenSetting(!openSetting);
  };

  const handleBalanceClick = () => {
    setOpenBalance(!openBalance);
  };

  const handleIncomeClick = () => {
    setOpenIncome(!openIncome);
  };

  // Balance 데이터를 가져오는 핸들러 추가
  const balanceHandler = () => {
    const token = getToken();
    if (!token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': process.env.REACT_APP_x_api_key
      }
    };
    const requestBody = {
      user_id: user.user_id,
      token: token,
      type: 'futureBalance'
    };

    axios.post(contentUrl, requestBody, requestConfig).then(response => {
      setContent('Balance');
      setBalanceList(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* 왼쪽 메뉴 */}
      <div style={{ width: '250px', padding: '20px' }}>
        <h3>Hello {name}! You have been logged in!!!</h3>
        <input type="button" value="Logout" onClick={logoutHandler} /> <br />
        <Button variant="contained">Hello world</Button>

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
          {/* Graph 항목 */}
          <ListItemButton onClick={handleGraphClick}>
            <ListItemIcon>
              <GraphIcon />
            </ListItemIcon>
            <ListItemText primary="Graph" />
            {openGraph ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openGraph} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => setContent('Graph')}>
                <ListItemText primary="View Graph" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* ContractList 항목 */}
          <ListItemButton onClick={handleContractListClick}>
            <ListItemIcon>
              <ContractIcon />
            </ListItemIcon>
            <ListItemText primary="Contract List" />
            {openContractList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openContractList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={contractListHandler}>
                <ListItemText primary="View Contract List" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* BALANCE 항목 */}
          <ListItemButton onClick={handleBalanceClick}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="BALANCE" />
            {openBalance ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openBalance} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={balanceHandler}>
                <ListItemText primary="View Balance" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* INCOME 항목 */}
          <ListItemButton onClick={handleIncomeClick}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="INCOME" />
            {openIncome ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIncome} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={incomeHandler}>
                <ListItemText primary="View Income List" />
              </ListItemButton>
            </List>
          </Collapse>
          
          {/* Setting 항목 */}
          <ListItemButton onClick={handleSettingClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
            {openSetting ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSetting} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => settingHandler('USER')}>
                <ListItemText primary="USER" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => settingHandler('BINANCE')}>
                <ListItemText primary="BINANCE" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => settingHandler('SLACK')}>
                <ListItemText primary="SLACK" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>

      {/* 우측 콘텐츠 영역 */}
      <div style={{ flex: 1, padding: '20px' }}>
        {content === 'Graph' && <Graph />}
        {content === 'ContractList' && <ContractList contractList={contractList} />}
        {content === 'Setting' && <Setting type={settingType} setting={setting} />}
        {content === 'Income' && <Income incomeList={incomeList} />}
        {content === 'Balance' && <Balance balanceList={balanceList} />}
      </div>
    </div>
  );
}

export default Content;
