import React, { PropTypes } from 'react';
import { ART } from 'react-native';
import glamorous, { withTheme } from 'glamorous-native';

const { Surface, Group, Shape, LinearGradient } = ART;

const Container = withTheme(
  glamorous.view({
    position: 'relative'
  })
);

const BottomWrapper = withTheme(
  glamorous.view(
    {
      width: '100%',
      position: 'absolute'
    },
    props => ({
      minHeight: props.height,
      bottom: props.height * 0.1,
      paddingLeft: props.theme.gutter,
      paddingRight: props.theme.gutter
    })
  )
);

function WaveformPath(props) {
  return (
    <Container {...props}>
      <Surface width={props.width} height={props.height}>
        <Group x={0} y={0}>
          <Shape
            d={props.path}
            strokeWidth={0}
            fill={`${props.theme.primaryColor}40`}
          />
        </Group>
      </Surface>
      <BottomWrapper {...props}>{props.children}</BottomWrapper>
    </Container>
  );
}

WaveformPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  path: PropTypes.string,
  theme: PropTypes.shape({ primaryColor: PropTypes.string.isRequired })
    .isRequired,
  children: PropTypes.node.isRequired
};

export default withTheme(WaveformPath);
