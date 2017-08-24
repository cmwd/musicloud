import { PureComponent, PropTypes } from 'react';
import { Audio } from 'expo';

const generateFakeWave = length => Array.from({ length }, () => Math.random());
const createGeneratorInterval = cb =>
  setInterval(() => cb(generateFakeWave(5)), 250);

class PlayerController extends PureComponent {
  constructor(props, context) {
    super(props, context);

    const { children, handlePlayerError, ...initialState } = props;

    this.state = {
      wave: [],
      isPlaying: false,
      isBufering: false,
      ...initialState
    };
    this.playbackInstance = null;
    this.waveGeneratorInterval = null;

    this.handlePlaybackUpdate = this.handlePlaybackUpdate.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
  }

  async componentDidMount() {
    try {
      await Audio.setIsEnabledAsync(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });
    } catch (error) {
      this.props.handlePlayerError(error);
    }
  }

  componentWillUnmount() {
    this.unload();
  }

  handlePlaybackUpdate(status) {
    if (!this.waveGeneratorInterval && status.isPlaying) {
      this.waveGeneratorInterval = createGeneratorInterval(wave =>
        this.setState({ wave })
      );
    } else if (this.waveGeneratorInterval && !status.isPlaying) {
      clearInterval(this.waveGeneratorInterval);
      this.waveGeneratorInterval = null;
    }

    this.setState(status);
  }

  async unload() {
    try {
      if (this.playbackInstance) {
        await this.playbackInstance.unloadAsync();
        this.playbackInstance.setCallback(null);
        this.playbackInstance = null;
      }
    } catch (error) {
      this.props.handlePlayerError(error);
    }
  }

  async load(source) {
    await this.unload();

    this.playbackInstance = new Audio.Sound();
    this.playbackInstance.setCallback(this.handlePlaybackUpdate);

    try {
      await this.playbackInstance.loadAsync(source);
    } catch (error) {
      this.props.handlePlayerError(error);
    }
  }

  play() {
    if (this.state.isLoaded) {
      this.playbackInstance.playAsync();
    }
  }

  pause() {
    if (this.state.isLoaded) {
      this.playbackInstance.pauseAsync();
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      play: this.play,
      pause: this.pause,
      load: this.load
    });
  }
}

PlayerController.propTypes = {
  children: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  handlePlayerError: PropTypes.func.isRequired
};

PlayerController.defaultProps = {
  handlePlayerError: error => console.error(error),
  volume: 1.0,
  rate: 1.0,
  muted: false,
  shouldPlay: false
};

export default PlayerController;
