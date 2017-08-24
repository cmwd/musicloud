import React, { Component, PropTypes } from 'react';
import glamorous, { withTheme } from 'glamorous-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Container = withTheme(
  glamorous.view(
    {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 25
    },
    props => ({
      paddingLeft: props.theme.gutter,
      paddingRight: props.theme.gutter
    })
  )
);

const Header = glamorous.view({
  flexWrap: 'wrap',
  alignItems: 'center'
});

const HeaderTitle = withTheme(
  glamorous.text({ fontWeight: 'bold' }, props => ({
    color: props.theme.primaryColor
  }))
);

const SongTitle = glamorous.text({
  color: 'black'
});

function PlayerTopbarComponent(props) {
  return (
    <Container>
      <Icon
        name="chevron-down"
        size={props.theme.iconSizeRegular}
        color={props.theme.primaryColor}
      />
      <Header>
        <HeaderTitle children="Song title" />
        <SongTitle children={props.title} />
      </Header>
      <Icon
        name="plus"
        size={props.theme.iconSizeRegular}
        color={props.theme.primaryColor}
      />
    </Container>
  );
}

PlayerTopbarComponent.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    iconSizeRegular: PropTypes.number.isRequired,
    primaryColor: PropTypes.string.isRequired
  }).isRequired
};

PlayerTopbarComponent.defaultProps = {
  title: 'Title'
};

export default withTheme(PlayerTopbarComponent);
