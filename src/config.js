var convict = require('convict');

var config = convict({
    aws: {
        region: {
            doc:    'The AWS region.',
            default: 'eu-west-1',
            format:  String,
            env:     'AWS_REGION'
        }
    }
});

module.exports = config;