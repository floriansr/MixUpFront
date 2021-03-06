import {
  Chip,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MusicNoteOutlined, MusicOffOutlined, NavigateNext } from '@material-ui/icons';
import { message } from 'antd';
import shortID from 'shortid';

import './styles.scss';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { APIManager } from 'services';

import { setTracks } from '../../redux';

const PlaylistTable = ({ spotifyDetails }) => {
  const dispatch = useDispatch();
  const tracklist = useSelector((state) => state.tracks.tracks);
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  const userId = useSelector((state) => state.user.data.id);
  const useStyles = makeStyles({
    root: {
      width: '75%',
      backgroundColor: 'rgb(27, 31, 34) !important',
      margin: 'auto',
      borderRadius: '4px',
      padding: '1%',
      paddingBottom: '2%',
      marginBottom: '3%',
      boxShadow: '1px 1px 20px rgb(27, 31, 34)'
    },
    container: {
      maxHeight: 1000
    }
  });

  const classes = useStyles();

  const setTrackPlaylist = (data) => {
    dispatch(setTracks(data));
  };

  const Likes = async (track) => {
    const res = await APIManager.upVote(track.id, userId);
    const playlist = await APIManager.showPlaylist(res.playlist_id);

    if (playlist.status === 'success') {
      setTrackPlaylist(playlist.entries);
    } else {
      return message.error(playlist.messages[0], 3);
    }
  };

  const Dislikes = async (track) => {
    const res = await APIManager.downVote(track.id, userId);
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (playlist.status === 'success') {
      setTrackPlaylist(playlist.entries);
    } else {
      return message.error(playlist.messages[0], 3);
    }
  };

  const columns = [
    { id: 'title', label: 'TITLE', minWidth: 170 },
    { id: 'artist', label: 'ARTIST', minWidth: 170 },
    { id: 'added_by', label: 'ADDED BY', minWidth: 170 },
    { id: 'score', label: 'SCORE', maxWidth: 60 }
  ];

  const createData = (title, artist, score, added_by, id) => {
    return {
      title,
      artist,
      score,
      added_by,
      id
    };
  };

  const rows = [];

  spotifyDetails &&
    spotifyDetails.length < 41 &&
    tracklist
      .sort((a, b) => b.score - a.score)
      .map((p) => {
        const title = spotifyDetails.find((el) => p.track_spotify_id === el.id).name;

        const artist = spotifyDetails.find((el) => p.track_spotify_id === el.id).artists[0].name;
        if (p.is_played === false) {
          rows.push(createData(title, artist, p.score, p.added_by.username, p.id));
        }
      });

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'rgb(27, 31, 34)' }}>
              <TableCell />
              {columns.map((column) => (
                <TableCell
                  key={shortID.generate()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={shortID.generate()}>
                    <TableCell>{index === 0 && <NavigateNext />}</TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={shortID.generate()} align={column.align}>
                          {column.id === 'score' ? (
                            <Chip
                              label={value}
                              style={{
                                backgroundColor: 'rgb(247, 249, 249)',
                                borderRadius: '100%',
                                padding: '1%',
                                width: '3.5rem',
                                height: '3.5rem'
                              }}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    {row.id !== currentTrack.id && (
                      <>
                        <TableCell>
                          <Tooltip title="Up vote">
                            <Fab
                              style={{
                                backgroundColor: 'rgb(77, 217, 117)',
                                color: 'rgb(247, 249, 249)'
                              }}
                              className={classes.fab}
                              onClick={() => Likes(row)}>
                              <MusicNoteOutlined />
                            </Fab>
                          </Tooltip>
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Down vote">
                            <Fab
                              color="secondary"
                              className={classes.fab}
                              onClick={() => Dislikes(row)}>
                              <MusicOffOutlined />
                            </Fab>
                          </Tooltip>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PlaylistTable;
