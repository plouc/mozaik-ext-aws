var components = {
    Instances: require('./Instances.jsx'),
    Stacks:    require('./Stacks.jsx')
};

require('mozaik/browser')
    .add('aws.instances', components.Instances)
    .add('aws.stacks',    components.Stacks)
;

module.exports = components;