/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "postsTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "creationDate";
const sortKeyType = "N";
const hasSortKey = sortKeyName !== "";
const path = "/heart";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

app.patch(path, function (req, res) {
  const postId = req.body.postId;
  const username = req.body.username;
  const creationDate = req.body.creationDate;

  const key = {
    id: postId,
    creationDate: creationDate
  }

  let getItemParams = {
    TableName: tableName,
    Key: key
  };

  dynamodb.get(getItemParams, (err, data) => {

    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Error retrieving heartedUsernames: ' + err.message });
    } else {
      const indexOfHeartedUsername = data.Item.heartedUsernames.indexOf(username);

      let patchItemParams = indexOfHeartedUsername >= 0 ?
        {
          TableName: tableName,
          Key: key,
          UpdateExpression: "SET hearted=hearted-:value REMOVE heartedUsernames[" + indexOfHeartedUsername + "]",
          ExpressionAttributeValues: {
            ':value': 1,
          },
          ReturnValues: "ALL_NEW"
        }
        :
        {
          TableName: tableName,
          Key: key,
          UpdateExpression: "SET hearted=hearted+:value, #hu = list_append(#hu, :user)",
          ExpressionAttributeValues: {
            ':user': [username],
            ':value': 1,
          },
          ExpressionAttributeNames: {
            "#hu": "heartedUsernames"
          },
          ReturnValues: "ALL_NEW"
        };

      dynamodb.update(patchItemParams, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: 'Error Updating hearts: ' + err.message });
        } else {
          res.json({ success: 'hearts updated successfully', url: req.url, data: data });
        }
      });
    }
  });
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
