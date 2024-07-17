import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import userPhoto from "../img/clients/c1.jpg"

export const AvatarComponent = (props) => {
    return (
      <Stack direction="row" spacing={2}>
        <Avatar alt="User" src={props.userAvatarUrl} title={props.username}>
          {props.username? props.username[0].toUpperCase():"?"}
        </Avatar>
      </Stack>
    );
}