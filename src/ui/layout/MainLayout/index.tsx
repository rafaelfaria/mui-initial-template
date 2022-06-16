import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// Material
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

// Config
import AppConfig from '../../../config';

// components
import Header from './Header';
import Sidebar from './Sidebar';
import Decoration from './Decoration';

type MainProps = {
  isDrawerOpen: boolean;
};

const Main = styled('div')<MainProps>(({ theme, isDrawerOpen }: any) => ({
  display: 'flex',
  transition: theme.transitions.create('padding', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(isDrawerOpen && {
    paddingLeft: `${AppConfig.menu.drawerWidth}px`
  }),
  ...(!isDrawerOpen && {
    paddingLeft:`${AppConfig.menu.drawerWidthSmall}px`
  }),
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
  },
}));

export default function MainLayout() {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const [isDrawerOpen, setDrawerOpen] = useState(matchUpMd);
  const [ drawerStateBeforeViewPortChange, setDrawerStateBeforeViewPortChange ] = useState(matchUpMd);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOnCloseDrawer = () => {
    setDrawerOpen(false);
  }

  useEffect(() => {
    if (!matchUpMd && isDrawerOpen) {
     setDrawerOpen(false)
    } else
        // This is more an edge case for changing view port from mobile to desktop
        // If you go from small, to medium+, then check if the previous state of the drawer
        // was opened, so we can re-open it
        if (matchUpMd && !isDrawerOpen && drawerStateBeforeViewPortChange) {
          setDrawerOpen(true);
        }

    setDrawerStateBeforeViewPortChange(isDrawerOpen);
  }, [matchUpMd]);

  return (
    <Main isDrawerOpen={isDrawerOpen}>
      <CssBaseline />

      <Header
        toggleDrawer={toggleDrawer}
        drawerWidth={(isDrawerOpen ? AppConfig.menu.drawerWidth : AppConfig.menu.drawerWidthSmall)}
      />

      <Sidebar
        isDrawerOpen={isDrawerOpen}
        handleOnCloseDrawer={handleOnCloseDrawer}
        matchUpMd={matchUpMd} />

      <Decoration />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px", position: "relative" }}>
        <Outlet />
      </Box>
    </Main>
  );
}