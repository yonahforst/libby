'use strict';

var AWS =require('aws-sdk')

const publish = (topic, message) => {
  var sns = new AWS.SNS()

  return sns.createTopic({
      Name: topic
    }).promise()
    .then(res => {
      var params = {
        TopicArn: res.TopicArn,
        Subject: topic,
        Message: JSON.stringify(message),
      }

      return sns.publish(params).promise()
    })
}

module.exports = publish

