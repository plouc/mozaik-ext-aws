import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
// import Instance                        from './Instance.jsx';

class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buckets: []
        }
    }

    getInitialState() {
        return {
            buckets: []
        };
    }

    getApiRequest() {
        return {
            id: 'aws.buckets'
        };
    }

    onApiData(buckets) {
        this.setState({
            buckets: buckets
        });
    }

    render() {
      var bucketNodes = _.map(this.state.buckets, bucket => {
        var cssClass = 'aws__instance aws__bucket';
        return (
          <div className={cssClass} key={bucket.Name}>
            <span className="aws__instance__name">
              {bucket.Name}
            </span>
            <span className="aws__instance__date">
              {bucket.CreationDate}
            </span>
          </div>
        );
      });

      return (
        <div>
          <div className="widget__header">
            AWS Buckets
            <span className="widget__header__count">
              {this.state.buckets.length}
            </span>
            <i className="fa fa-hdd-o" />
          </div>
          <div className="widget__body">
            {bucketNodes}
          </div>
        </div>
      );
    }
}

reactMixin(Buckets.prototype, ListenerMixin);
reactMixin(Buckets.prototype, Mozaik.Mixin.ApiConsumer);

export { Buckets as default };
