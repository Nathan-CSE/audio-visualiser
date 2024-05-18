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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { IoSettingsSharp } from "react-icons/io5";

import '../App.css';

export default function VisualiserOptions() {
  const [open, setOpen] = React.useState(false);
  const [menuAnchorEls, setMenuAnchorEls] = useState({});
  const [isRadial, setIsRadial] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (menuName) => (event) => {
    setMenuAnchorEls((prev) => ({ ...prev, [menuName]: event.currentTarget }));
  };

  const handleMenuClose = (menuName) => () => {
    setMenuAnchorEls((prev) => ({ ...prev, [menuName]: null }));
    setOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.value) {
      setIsRadial(true);
    } else {
      setIsRadial(false);
    }

  };

  const submitChanges = () => {

  }

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

      
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel id="demo-simple-select-label">Visualiser Type</InputLabel>
        <Select
          value={isRadial}
          marginX={'1%'}
          label="VisualiserType"
          onChange={handleChange}
        >
          <MenuItem value={false}>Line</MenuItem>
          <MenuItem value={true}>Radial</MenuItem>
        </Select>
      </FormControl>
      

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