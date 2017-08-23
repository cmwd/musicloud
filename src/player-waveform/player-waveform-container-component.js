import React, { PureComponent } from "react";
import { Dimensions } from "react-native";
import glamorous, { withTheme } from "glamorous-native";
import {
  Svg,
  Rect,
  Polygon,
  LinearGradient,
  Stop,
  Defs
} from "react-native-svg";

import WaveformPath from "./player-waveform-path-component";

const COMPONENT_HEIGHT = 200;

const Container = withTheme(
  glamorous.view({
    position: "relative"
  })
);

const BottomWrapper = withTheme(
  glamorous.view(
    {
      width: "100%",
      position: "absolute",
      bottom: COMPONENT_HEIGHT * 0.4
    },
    props => ({
      paddingLeft: props.theme.gutter,
      paddingRight: props.theme.gutter
    })
  )
);

class PlayerWaveformComponent extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.dimensionsKey = "screen";
    this.state = Dimensions.get(this.dimensionsKey);
    this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.handleDimensionsChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.handleDimensionsChange);
  }

  handleDimensionsChange(event) {
    this.setState(event[this.dimensionsKey]);
  }

  render() {
    return (
      <Container>
        <Svg width={this.state.width} height={COMPONENT_HEIGHT}>
          <Defs>
            <LinearGradient
              id="grad"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0%"
                stopColor={this.props.theme.primaryColor}
                stopOpacity="0.2"
              />
              <Stop
                offset="90%"
                stopColor={this.props.theme.primaryColor}
                stopOpacity="0.01"
              />
            </LinearGradient>

            <WaveformPath
              id="clip"
              points={[]}
              width={this.state.width}
              height={COMPONENT_HEIGHT}
            />
          </Defs>
          <Rect
            x="0"
            y="0"
            width={this.state.width}
            height={COMPONENT_HEIGHT}
            fill="url(#grad)"
            clipPath="url(#clip)"
          />
        </Svg>
        <BottomWrapper children={this.props.children} />
      </Container>
    );
  }
}

export default withTheme(PlayerWaveformComponent);
