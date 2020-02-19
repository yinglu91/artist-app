// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

import { useContext } from 'react';
import { MusicPlayerContext } from './MusicPlayerContext';

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  function playTrack(trackName) {
    if (trackName === state.currentTrackName) {
      togglePlay();
    } else {
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(trackName);
      state.audioPlayer.play();
      setState(state => ({
        ...state,
        currentTrackName: trackName,
        isPlaying: true
      }));
    }
  }

  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }

  function reset() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    }

    state.audioPlayer = new Audio();
    state.currentTrackName = null;
    state.isPlaying = false;
  }

  return {
    playTrack,
    togglePlay,
    currentTrackName: state.currentTrackName,
    isPlaying: state.isPlaying,
    reset
  };
};

export default useMusicPlayer;
