import { Button } from '@material-ui/core';

import './styles.scss';

import * as React from 'react';
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
