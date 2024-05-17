import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { IoSettingsSharp } from "react-icons/io5";

import '../App.css';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [menuAnchorEls, setMenuAnchorEls] = useState({});

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (menuName) => (event) => {
    setMenuAnchorEls((prev) => ({ ...prev, [menuName]: event.currentTarget }));
  };

  const handleMenuClose = (menuName) => () => {
    setMenuAnchorEls((prev) => ({ ...prev, [menuName]: null }));
    setOpen(false); // Close the drawer when a menu item is selected
  };


  const DrawerList = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      sx={{ width: 350, height: '100vh', bgcolor: 'white', color: 'black', paddingTop: '10%' }}
      // onClick={toggleDrawer(false)}
      PaperProps={{
        sx: {
          opacity: 1,
        }
      }}
    >

      <Typography variant="h5" style={{ fontWeight: 600 }}>Visualiser Options</Typography>

      {['Visualiser Mode', 'Column Modifier', 'Colour Theme', 'Background'].map((menuName) => (
        <Box key={menuName} sx={{ margin: 2 }}>
          <Button
            variant="contained"
            onClick={handleMenuClick(menuName)}
            sx={{ width: '100%' }}
          >
            {menuName}
          </Button>
          <Menu
            anchorEl={menuAnchorEls[menuName]}
            open={Boolean(menuAnchorEls[menuName])}
            onClose={handleMenuClose(menuName)}
          >
            {['Option 1', 'Option 2', 'Option 3'].map((option) => (
              <MenuItem key={option}>
                {option}
              </MenuItem>
              // <MenuItem key={option} onClick={handleMenuClose(menuName)}>
              //   {option}
              // </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}

      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Save Changes
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>
        Reset to Default
      </Button>

    </Box>
  );

  return (
    <Box className="menus" sx={{ position: 'relative' }}>

      {/* Dunno why the border is round */}
      <IconButton 
        onClick={toggleDrawer(true)}
        sx={{
          position: 'absolute',
          marginTop: '0%',
          left: '2%',
          border: '2px solid white',
          opacity: '75%'
        }}
      >
        <IoSettingsSharp size={40} style={{ color: 'white' }} />
      </IconButton>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        hideBackdrop
        sx={{
          opacity: '95%',
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}