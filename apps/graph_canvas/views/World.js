'use strict';

import React, // eslint-disable-line no-unused-vars
  { Component, PropTypes } from 'react';

import radium from 'radium';
import decorate from 'common-web-ui/lib/decorate';

import GCElementsLayer from './layers/Elements';
import GCVectorsLayer from './layers/Vectors';

@radium
@decorate({
  propTypes: {
    className: PropTypes.string,
    css: PropTypes.object,
    elements: PropTypes.array,
    style: PropTypes.object,
    vectors: PropTypes.array
  },
  defaultProps: {
    className: 'GraphCanvasWorld',
    css: {},
    elements: [],
    style: {},
    vectors: []
  },
  contextTypes: {
    graphCanvas: PropTypes.any
  }
})
export default class GCWorld extends Component {

  get graphCanvas() {
    return this.context.graphCanvas;
  }

  state = {
    vectors: this.props.vectors,
    elements: this.props.elements
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      vectors: nextProps.vectors,
      elements: nextProps.elements
    });
  }

  render() {
    // onDoubleClick={this.props.enableMarks && this.touchWorld.bind(this) || null}
    // onContextMenu={(e) => { e.stopPropagation(); e.preventDefault(); /*this.drawNode()(e)*/}}
    try {
      var cssWorldSpaceTransform = this.cssWorldSpaceTransform,
          cssWorldSize = this.graphCanvas.cssWorldSize;
      return (
        <div
            className={this.props.className}
            onDoubleClick={this.touchWorld.bind(this)}
            style={[cssWorldSize, cssWorldSpaceTransform]}>

          <GCVectorsLayer ref="vectors">
            {this.state.vectors}
          </GCVectorsLayer>

          <GCElementsLayer ref="elements">
            {this.state.elements}
            {this.props.children}
          </GCElementsLayer>
        </div>
      );
    } catch (err) {
      console.error(err.stack || err);
    }
  }

  get cssWorldSpaceTransform() {
    return {
      transform: this.graphCanvas.worldSpaceTransform.toCSS3Transform()
      // transformOrigin: 'center center 0',
      // transformStyle: 'flat',
      // transformBox: 'border-box'
    };
  }

  touchWorld(event) {
    if (this.graphCanvas.refs.marks) {
      this.graphCanvas.refs.marks.markWorld(event);
    }
  }

}
