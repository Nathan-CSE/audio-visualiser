import React, { useContext, useEffect, useState } from 'react';
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
import VisualiserContext from './VisualiserContext';

import { IoSettingsSharp } from "react-icons/io5";

import '../App.css';

export default function VisualiserOptions() {
  const { containerRef, videoRef, audioMotion } = useContext(VisualiserContext);
  const [open, setOpen] = React.useState(false);
  const [menuAnchorEls, setMenuAnchorEls] = useState({});

  const [isRadial, setIsRadial] = useState(false);
  const [columnModifier, setColumnModifier] = useState(4);
  const [colourMode, setColourMode] = useState('gradient');
  const [colourTheme, setColourTheme] = useState('classic');
  const [visualiserBg, setVisualiserBg] = useState(0.6);
  const [maxFPS, setMaxFPS] = useState(0);
  const [showPeaks, setShowPeaks] = useState(false);
  const [radialSpeed, setRadialSpeed] = useState(0);
  const [showAxisX, setShowAxisX] = useState(false);
  const [showAxisY, setShowAxisY] = useState(false);
  
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
    // console.log(event.target);

    switch(event.target.name) {
      case 'VisualiserType':
        setIsRadial(event.target.value);
        break;
      case 'ColumnModifier':
        setColumnModifier(event.target.value);
        break;
      case 'ColourMode':
        setColourMode(event.target.value);
        break;
      case 'ColourTheme':
        setColourTheme(event.target.value);
        break;
      case 'VisualiserBg':
        setVisualiserBg(event.target.value);
        break;
      case 'maxFPS':
        setMaxFPS(event.target.value);
        break;
      case 'showPeaks':
        setShowPeaks(event.target.value);
        break;
      case 'radialSpeed':
        setRadialSpeed(event.target.value);
        break;
      case 'showAxisX':
        setShowAxisX(event.target.value);
        break;
      case 'showAxisY':
        setShowAxisY(event.target.value);
        break;
      default:
        console.log('none of the above');
        break;
    }

  };

  const submitChanges = () => {
    var options = audioMotion.getOptions();

    options.radial = isRadial;
    options.mode = columnModifier;
    options.colorMode = colourMode;
    options.gradient = colourTheme;
    options.bgAlpha = visualiserBg;
    options.maxFPS = maxFPS;
    options.showPeaks = showPeaks;
    options.spinSpeed = radialSpeed;
    options.showScaleX = showAxisX;
    options.showScaleY = showAxisY;

    audioMotion.setOptions(options);

  }

  const resetOptions = () => {
   
    audioMotion.setOptions();
    
    var options = audioMotion.getOptions();
    
    options.gradient = 'classic';
    options.mode = 4;
    options.overlay = true;
    options.bgAlpha = 0.6;
    options.showScaleX = false;
    options.showScaleY = false;
    options.showPeaks = false;
    options.radial = false;

    setIsRadial(false);
    setColumnModifier(4);
    setColourMode('gradient');
    setColourTheme('classic');
    setVisualiserBg(0.6);
    setMaxFPS(0);
    setShowPeaks(false);
    setRadialSpeed(0);
    setShowAxisX(false);
    setShowAxisY(false);
    
    audioMotion.setOptions(options);
    // console.log("default options: ", options);
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

      <Typography variant="h5" marginTop={'1%'} marginBottom={'10%'} style={{ fontWeight: 600 }}>Visualiser Options</Typography>

      {/* Visualiser Type */}
      <FormControl sx={{ minWidth: '90%' }}>
        <InputLabel id="visualiser-type">Visualiser Type</InputLabel>
        <Select
          value={isRadial}
          name={'VisualiserType'}
          label={'Visualiser Type'}
          marginX={'1%'}
          onChange={handleChange}
        >
          <MenuItem value={false}>Line</MenuItem>
          <MenuItem value={true}>Radial</MenuItem>
        </Select>
      </FormControl>

      {/* Column Modifier */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Column Modifier</InputLabel>
        <Select
          value={columnModifier}
          label={'Column Modifier'}
          marginX={'1%'}
          name='ColumnModifier'
          onChange={handleChange}
        >
          <MenuItem value={7}>Less Columns</MenuItem>
          <MenuItem value={4}>Default Columns</MenuItem>
          <MenuItem value={2}>More Columns</MenuItem>
          <MenuItem value={1}>Even More Columns</MenuItem>
          <MenuItem value={10}>Line Graph</MenuItem>
          {/* <MenuItem value={10}>Filled Line Graph</MenuItem> */}
          <MenuItem value={0}>Discrete Frequencies</MenuItem>
        </Select>
      </FormControl>

      {/* Colour Mode */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Colour Mode</InputLabel>
        <Select
          value={colourMode}
          label={'Colour Mode'}
          marginX={'1%'}
          name='ColourMode'
          onChange={handleChange}
        >
          <MenuItem value={'gradient'}>Gradient</MenuItem>
          <MenuItem value={'bar-index'}>Bar Index</MenuItem>
          <MenuItem value={'bar-level'}>Bar Level</MenuItem>
        </Select>
      </FormControl>

      {/* Colour Theme */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Colour Theme</InputLabel>
        <Select
          value={colourTheme}
          label={'Colour Theme'}
          marginX={'1%'}
          name='ColourTheme'
          onChange={handleChange}
        >
          <MenuItem value={'classic'}>Classic</MenuItem>
          <MenuItem value={'prism'}>Prism</MenuItem>
          <MenuItem value={'rainbow'}>Rainbow</MenuItem>
          <MenuItem value={'orangered'}>Orange</MenuItem>
          <MenuItem value={'steelblue'}>Blue</MenuItem>
        </Select>
      </FormControl>

      {/* Visualiser Background Opacity */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Visualiser Background Opacity</InputLabel>
        <Select
          value={visualiserBg}
          label={'Visualiser Background Opacity'}
          marginX={'1%'}
          name='VisualiserBg'
          onChange={handleChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={0.3}>0.3</MenuItem>
          <MenuItem value={0.6}>0.6</MenuItem>
          <MenuItem value={0.9}>0.9</MenuItem>
        </Select>
      </FormControl>
      
      {/* Max FPS */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Visualiser Max FPS</InputLabel>
        <Select
          value={maxFPS}
          label={'Visualiser Max FPS'}
          marginX={'1%'}
          name='maxFPS'
          onChange={handleChange}
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={0}>Unlimited</MenuItem>
        </Select>
      </FormControl>
      
      {/* Show Peaks */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Show Peaks</InputLabel>
        <Select
          value={showPeaks}
          label={'Show Peaks'}
          marginX={'1%'}
          name='showPeaks'
          onChange={handleChange}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
      </FormControl>
      
      {/* Spin Speed */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Spin Speed</InputLabel>
        <Select
          value={radialSpeed}
          label={'Spin Speed'}
          marginX={'1%'}
          name='radialSpeed'
          onChange={handleChange}
        >
          <MenuItem value={0}>0 rpm</MenuItem>
          <MenuItem value={5}>5 rpm</MenuItem>
          <MenuItem value={10}>10 rpm</MenuItem>
          <MenuItem value={15}>15 rpm</MenuItem>
          <MenuItem value={20}>20 rpm</MenuItem>
        </Select>
      </FormControl>
      
      {/* Show X Axis */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Show X Axis</InputLabel>
        <Select
          value={showAxisX}
          label={'Show X Axis'}
          marginX={'1%'}
          name='showAxisX'
          onChange={handleChange}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
      </FormControl>
      
      {/* Show Y Axis */}
      <FormControl sx={{ minWidth: '90%', mt: '5%' }}>
        <InputLabel>Show Y Axis</InputLabel>
        <Select
          value={showAxisY}
          label={'Show Y Axis'}
          marginX={'1%'}
          name='showAxisY'
          onChange={handleChange}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
      </FormControl>
      

      <Button variant="contained" color="primary" onClick={submitChanges} sx={{ marginTop: 2 }}>
        Save Changes
      </Button>

      <Button variant="contained" color="secondary" onClick={resetOptions} sx={{ marginTop: 2 }}>
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