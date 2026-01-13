import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Group, Settings } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const drawerWidth = 260;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box p={3}>
        <Typography variant="h6" fontWeight={700}>
          uSecure
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Management Console
        </Typography>
      </Box>

      <List>
        <ListItemButton
          selected={pathname == "/users"}
          onClick={() => navigate("/users")}
        >
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItemButton>
      </List>

      <Box flexGrow={1} />

      <Box p={2}>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
