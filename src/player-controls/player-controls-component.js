import React, { PureComponent } from "react";
import glamorous, { withTheme } from "glamorous-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Container = glamorous.view({
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row"
});

const PlayerIcon = withTheme(
  glamorous(Icon)(
    {
      backgroundColor: "transparent",
      margin: 0
    },
    props => {
      return {
        color: props.main
          ? props.theme.teritiaryColor
          : props.theme.secondaryColor
      };
    }
  )
);

const PlayerButtonWrapper = withTheme(
  glamorous.view(
    {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50
    },
    props => ({
      ...(props.main
        ? props.theme.defaultShadow(props.theme.primaryColor)
        : {}),
      backgroundColor: props.main
        ? props.isLoaded ? props.theme.primaryColor : "grey"
        : "transparent",
      width: props.main ? 60 : 30,
      height: props.main ? 60 : 30
    })
  )
);

const PlayerButton = props => (
  <PlayerButtonWrapper {...props}>
    <PlayerIcon {...props} />
  </PlayerButtonWrapper>
);

class PlayerControlsComponent extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.onPressPlayPause = this.onPressPlayPause.bind(this);
  }

  onPressPlayPause() {
    console.log(this.props.isPlaying);
    if (this.props.isPlaying) {
      this.props.pause();
    } else {
      this.props.play();
    }
  }

  render() {
    return (
      <Container>
        <PlayerButton name="repeat" size={this.props.theme.iconSizeRegular} />
        <PlayerButton
          name="step-backward"
          size={this.props.theme.iconSizeRegular}
        />
        <PlayerButton
          main
          isLoaded={this.props.isLoaded}
          size={this.props.theme.iconSizeBig}
          name={this.props.isPlaying ? "pause" : "play"}
          onPress={this.onPressPlayPause}
        />
        <PlayerButton
          name="step-forward"
          size={this.props.theme.iconSizeRegular}
        />
        <PlayerButton name="random" size={this.props.theme.iconSizeRegular} />
      </Container>
    );
  }
}

export default withTheme(PlayerControlsComponent);
