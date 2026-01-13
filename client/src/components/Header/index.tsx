import React from "react";
import { Box, AppBar, Toolbar, TextField, IconButton } from "@mui/material";

import { HelpOutline, Notifications, Search } from "@mui/icons-material";

export const Header = () => {
  return (
    <AppBar position="sticky" elevation={0} color="default">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            size="small"
            placeholder="Placeholder"
            InputProps={{
              startAdornment: <Search sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <HelpOutline />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
