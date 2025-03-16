const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-northeast-2'
})
const util = require('../utils/util');
const binance = require('../utils/binance');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User';

async function content(requestBody){
  const user_id = requestBody.user_id;
  const token = requestBody.token;
  const verification = auth.verifyToken(user_id, token);
  if (!verification.verified){
    return util.buildResponse(401, verification)
  }

  const dynamoUser = await getUser(user_id.toLowerCase().trim());
  if(!dynamoUser || !dynamoUser.user_id){
    return util.buildResponse(403, {
      message: 'User not found.'
    })
  }

  if(!dynamoUser || !dynamoUser.api_key || !dynamoUser.secret_key) {
    return util.buildResponse(403, {
      message: 'API KEY and SECRET KEY Not Found.'
    })
  }

  // 가져올 데이터에 따라서 변수 바꿀 것
  const tmpData = binance.getBinance(dynamoUser.api_key, dynamoUser.secret_key);

  // 추가로 들어갈 정보가 있는지 생각해볼 것
  const response = {
    data : tmpData
  }

  return util.buildResponse(200, response)
}
async function getUser(user_id){
  const params = {
    TableName: userTable,
    Key: {
      user_id: user_id
    }
  }

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  })
}

module.exports.content = content;