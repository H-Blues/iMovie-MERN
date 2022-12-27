import React from 'react';
import { Avatar, IconButton } from '@mui/material';

const avatarUploader = (props) => {
  return (
    <>
      <input accept="image/*" hidden id="icon-button-file" type="file" onChange={props.onChange} />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          className="iconButton">
          <Avatar alt={props.username} src={props.pic} sx={{ width: 120, height: 120 }} />
        </IconButton>
      </label>
    </>
  );
};
export default avatarUploader;
