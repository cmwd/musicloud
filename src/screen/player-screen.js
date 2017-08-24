import React from 'react';
import { View } from 'react-native';

import PlayerControls from '../player-controls';
import PlayerWaveform from '../player-waveform';
import PlayerTopbar from '../player-topbar';
import PlayerPlaylist from '../player-playlist';

export default function PlayerScreenComponent(props) {
  return (
    <View>
      <PlayerTopbar {...props} />
      <PlayerWaveform {...props}>
        <PlayerControls {...props} />
      </PlayerWaveform>
      <PlayerPlaylist {...props} />
    </View>
  );
}
