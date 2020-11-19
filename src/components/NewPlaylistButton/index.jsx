import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const NewPlaylistButton = () => {
  return (
    <>
      <Link to="/new-playlist">
        <Button variant="contained" color="secondary" id="new-playlist-button">
          Create a playlist
        </Button>
      </Link>
    </>
  );
};

export default NewPlaylistButton;
