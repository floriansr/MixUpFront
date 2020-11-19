import './styles.scss';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

import { setCurrentTrack, setTracks } from '../../redux';
import APIManager from '../../services/APIManager';

const Player = ({ spotifyTrack, trackPlaylistId }) => {
  const { accessToken } = useSelector((state) => state.spotify_authentification);
  const dispatch = useDispatch();

  const transition = async () => {
    const res = await APIManager.finishTrack(trackPlaylistId);
    const newPlaylist = await APIManager.showPlaylist(res.playlist_id);

    dispatch(setTracks(newPlaylist.entries));
    dispatch(setCurrentTrack(newPlaylist.entries[0]));
  };

  useEffect(() => {
    setTimeout(transition, spotifyTrack.duration_ms * 0.95);
  }, [spotifyTrack]);

  return (
    <>
      <SpotifyPlayer
        autoPlay
        offset={1}
        token={accessToken}
        uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
      />
    </>
  );
};

export default Player;
