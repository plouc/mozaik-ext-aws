import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
// import Instance                        from './Instance.jsx';

class Instances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: []
        }
    }

    getInitialState() {
        return {
            instances: []
        };
    }

    getApiRequest() {
        return {
            id: 'aws.instances'
        };
    }

    onApiData(instances) {
        // if we have an available filter on instance name, apply it
        if (this.props.nameFilter) {
            instances = _.filter(instances, instance => this.props.nameFilter.test(instance.name));
        }
        if (this.props.tagFilter) {
            instances = _.filter(instances, instance => {
              let retVal = false
              _.each(this.props.tagFilter, (val, key) => {
                if (!retVal) {
                  retVal = instance.tags.hasOwnProperty(key) && instance.tags[key] === val;
                }
              });
              return retVal
            });
        }

        this.setState({
            instances: instances
        });
    }

    render() {
      var instanceNodes = _.map(this.state.instances, instance => {
        var cssClass = 'aws__instance aws__instance--' + instance.state;

        return (
          <div key={instance.id} className={cssClass}>
            <span className="aws__instance__name">
              {instance.name}
            </span>
            <span className="aws__instance__state">
              {instance.state}
            </span>
            <span  className="aws__instance__id">{instance.id}</span>
          </div>
        );
      });

      return (
        <div>
          <div className="widget__header">
            AWS instances
            <span className="widget__header__count">
              {this.state.instances.length}
            </span>
            <i className="fa fa-hdd-o" />
          </div>
          <div className="widget__body">
            {instanceNodes}
          </div>
        </div>
      );
    }
}

Instances.propTypes = {
  nameFilter: PropTypes.any,
  tagFilter: PropTypes.object,
};

reactMixin(Instances.prototype, ListenerMixin);
reactMixin(Instances.prototype, Mozaik.Mixin.ApiConsumer);

export { Instances as default };
