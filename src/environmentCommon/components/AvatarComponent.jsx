import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export const AvatarComponent = (props) => {
  const [size, setSize] = React.useState(props.size);

  React.useEffect(() => {
    setSize(props.size);
  }, [props.size]);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Avatar"
        src={props.userAvatarUrl}
        title={props.title? props.title: ''}
        sx={size ? { width: size, height: size } : {}}
      >
        <div style={size ? { fontSize: size / 2 + "px" } : {}}>
          {props.iconSymbol ? props.iconSymbol : "?"}
        </div>
      </Avatar>
    </Stack>
  );
};
