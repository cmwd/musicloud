import React, { PropTypes } from 'react';
import { View, ScrollView, Button } from 'react-native';

function PlaylistItem(props) {
  const { onSelectPlaylistItem, ...rest } = props;
  return (
    <View>
      <Button
        onPress={() => {
          props.onSelectPlaylistItem(rest);
        }}
        title={`${rest.author} - ${rest.title}`}
      />
    </View>
  );
}

PlaylistItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onSelectPlaylistItem: PropTypes.func.isRequired
};

export default function PlayerPlaylistComponent(props) {
  return (
    <ScrollView>
      {props.playlist.map(item => (
        <PlaylistItem
          key={item.id}
          {...item}
          onSelectPlaylistItem={props.load}
        />
      ))}
    </ScrollView>
  );
}

PlayerPlaylistComponent.propTypes = {
  playlist: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ).isRequired,
  load: PropTypes.func.isRequired
};
