const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-northeast-2'
})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User';

async function content(requestBody){
  const user_id = requestBody.user_id;
  const content_id = requestBody.content_id;

  const params = {
    TableName: userTable,
    Key: {
      user_id: user_id  
    }
  }

  const user = await dynamodb.get(params).promise();
  if(!user || !user.Item){
    return util.buildResponse(403, {
      message: 'User not found, please register for an account.'
    })
  }

  const userContent = user.Item.content;
  const content = await dynamodb.get(params).promise();


}