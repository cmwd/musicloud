import React, { Component, PropTypes } from 'react';
import { Dimensions } from 'react-native';
import { scaleLinear } from 'd3-scale';
import { line, curveCatmullRom } from 'd3-shape';

import PlayerWaveformComponent from './player-waveform-component';

const COMPONENT_HEIGHT = 200;

const shapeGenerator = line()
  .x(([value]) => value)
  .y(([, value]) => value)
  .curve(curveCatmullRom.alpha(0.7));

class PlayerWaveformContainer extends Component {
  constructor(props, context) {
    super(props, context);

    const { width } = Dimensions.get('screen');

    this.state = { height: COMPONENT_HEIGHT, width };
    this.scaleX = null;
    this.scaleY = null;

    this.scaleValues = this.scaleValues.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!(this.scaleX && this.scaleY) && newProps.wave.length) {
      this.scaleX = scaleLinear()
        .domain([0, newProps.wave.length - 1])
        .range([0, this.state.width]);
      this.scaleY = scaleLinear().domain([0, 1]).range([0, this.state.height]);
    }
  }

  scaleValues(memo, value, index, array) {
    const result = [...memo, [this.scaleX(index), this.scaleY(value)]];

    if (index + 1 === array.length) {
      result.push(
        [this.state.width, this.state.height],
        [0, this.state.height]
      );
    }

    return result;
  }

  render() {
    return (
      <PlayerWaveformComponent
        {...this.state}
        children={this.props.children}
        path={shapeGenerator(this.props.wave.reduce(this.scaleValues, []))}
      />
    );
  }
}

PlayerWaveformContainer.propTypes = {
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired,
  wave: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired
};

PlayerWaveformContainer.defaultProps = {
  maxWidth: 300,
  maxHeight: 150
};

export default PlayerWaveformContainer;
