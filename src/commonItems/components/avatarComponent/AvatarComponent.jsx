import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

/**
 * @typedef {object} Props
 * @property {} size
 * @property {} [userAvatarUrl]
 * @property {} [title]
 * @property {} iconSymbol
 * @param {Props} props 
 * @returns 
 */

export const AvatarComponent = ({size, userAvatarUrl, title, iconSymbol}) => {
  
  //* States
  const [currentSize, setCurrentSize] = React.useState(size);

  //* UseEffects
  React.useEffect(() => {
    setCurrentSize(size);
  }, [size]);

  //* Main Body
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Avatar"
        src={userAvatarUrl}
        title={title? title: ''}
        sx={size ? { width: size, height: size } : {}}
      >
        <div style={size ? { fontSize: size / 2 + "px" } : {}}>
          {iconSymbol ? iconSymbol : "?"}
        </div>
      </Avatar>
    </Stack>
  );
};
