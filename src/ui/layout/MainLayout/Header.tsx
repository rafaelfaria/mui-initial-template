import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

// Config
import AppConfig from '../../../config';
import ColorMode from './ColorMode';

const Header = ({ toggleDrawer, drawerWidth }: any) => {
  const theme = useTheme();

  return (
    <AppBar
        position="fixed"
        sx={{
          transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          background: AppConfig.theme.header.background,
          boxShadow: "none",
          pr: 2,
          pl: `${drawerWidth}px`,
          [theme.breakpoints.down('md')]: {
            pl: 2,
          }
        }}
      >
      <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                onClick={toggleDrawer}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0 }}>
            Avatar
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;