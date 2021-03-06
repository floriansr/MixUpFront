import { Fab, Tooltip, Zoom } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import { message } from 'antd';

import './style.scss';

import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareButton = () => {
  const handleClick = () => {
    return message.success('Link copied to clipboard and ready to be shared.', 3);
  };

  return (
    <div className="share-button">
      <CopyToClipboard text={window.location.href}>
        <Tooltip
          title="Share playlist"
          aria-label="add"
          TransitionComponent={Zoom}
          enterDelay={200}
          leaveDelay={200}>
          <Fab color="primary">
            <Share onClick={handleClick} style={{ cursor: 'pointer' }} />
          </Fab>
        </Tooltip>
      </CopyToClipboard>
    </div>
  );
};

export default ShareButton;
