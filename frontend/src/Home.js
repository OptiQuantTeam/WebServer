import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { getToken } from './service/AuthService'; // getToken을 가져옴

const Home = () => {
  const options = ["수익률 차트", "거래 내역", "환경 설정"]; // 목록 리스트
  const [selectedOption, setSelectedOption] = useState("");
  
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const token = getToken(); // 토큰 가져오기

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        OptiquantTeam
      </Typography>

      {token ? ( // 로그인한 경우 Select 목록 표시
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">옵션 선택</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="옵션 선택"
            onChange={handleChange}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : ( // 로그인하지 않은 경우 메시지 표시
        <Typography variant="body1" color="error">
          로그인이 필요합니다.
        </Typography>
      )}
    </div>
  );
};

export default Home;
