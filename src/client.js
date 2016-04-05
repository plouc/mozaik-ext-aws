import Promise from 'bluebird';
import AWS     from 'aws-sdk';
import _       from 'lodash';
import chalk   from 'chalk';
import config  from './config';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    AWS.config.region = config.get('aws.region');

    const ec2            = new AWS.EC2();
    const cloudFormation = new AWS.CloudFormation();
    const s3             = new AWS.S3();

    return {
        stacks() {
            const def = Promise.defer();

            cloudFormation.describeStacks({}, function (err, data) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(data.Stacks);
                }
            });

            return def.promise;
        },

        buckets() {
            const def = Promise.defer();

            s3.listBuckets({}, function (err, data) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(data.Buckets);
                }
            });

            return def.promise;
        },

        instances() {
            const def             = Promise.defer();
            const amis            = [];
            const vpcsInstanceIds = {};
            const instances       = [];

            ec2.describeInstances({}, function (err, data) {
                if (err) {
                    def.reject(err);
                } else {
                    data.Reservations.forEach(function (reservation) {
                        reservation.Instances.forEach(function (instanceData) {
                            var instance = {
                                id:               instanceData.InstanceId,
                                state:            instanceData.State.Name,
                                type:             instanceData.InstanceType,
                                privateIpAddress: instanceData.PrivateIpAddress,
                                publicIpAddress:  instanceData.PublicIpAddress || null,
                                vpc:              instanceData.VpcId,
                                loadBalancers:    [],
                                securityGroups:   []
                            };

                            instanceData.SecurityGroups.forEach(function (sg) {
                                instance.securityGroups.push(sg.GroupId);
                            });

                            instance.tags = {};
                            instanceData.Tags.forEach(function (tag) {
                                instance.tags[tag.Key.toLowerCase()] = tag.Value;
                            });

                            instance.name = instance.tags.name || null;

                            instances.push(instance);

                            amis.push(instanceData.ImageId);

                            if (typeof instance.vpc != 'undefined') {
                                if (!vpcsInstanceIds[instance.vpc]) {
                                    vpcsInstanceIds[instance.vpc] = [];
                                }
                                vpcsInstanceIds[instance.vpc].push(instance.id);
                            }
                        });
                    });
                    def.resolve(instances);
                }
            });

            return def.promise;
        }
    };
};

module.exports = client;
