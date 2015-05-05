'use strict';

import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import mixin from 'react-mixin'; // eslint-disable-line no-unused-vars

// import {
//   } from 'material-ui';

import Breadcrumbs from '../Breadcrumbs';
import FormatHelpers from '../mixins/FormatHelpers'; // eslint-disable-line no-unused-vars
import NodeActions from '../../actions/NodeActions';
import EditNode from './EditNode';
import CreateNode from './CreateNode';
import './Node.less';

export { CreateNode, EditNode };

@mixin.decorate(FormatHelpers)
export default class Node extends Component {

  state = {
    node: null
  };

  componentDidMount() {
    NodeActions.getNode(this.props.params.nodeId)
      .then(node => this.setState({node: node}))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Node">
        <Breadcrumbs>
          <a href="#/dash">Dashboard</a>
          &nbsp;/&nbsp;
          <a href="#/nodes">Nodes</a>
          {this.state.node ? ' / ' + this.state.node.id : ''}
        </Breadcrumbs>
        <EditNode nodeRef={this.state.node} />
      </div>
    );
  }

}