import { SET_CURRENT_TRACK, SET_TRACKS } from './tracklistType';

export const setTracks = (tracks, name, owner) => {
  return {
    type: SET_TRACKS,
    details: tracks,
    name,
    owner
  };
};

export const setCurrentTrack = (track) => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrack: track
  };
};
