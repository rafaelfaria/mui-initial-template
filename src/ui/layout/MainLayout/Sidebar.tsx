import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Material
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

// icons
import NestedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoreHoriz from '@mui/icons-material/MoreHoriz';

// Config
import AppConfig, { menuItems, menuItemsAdmin } from '../../../config';

// components
import LogoSmall from '../../../assets/tokenzeiro.png'
import { ListItem } from '@mui/material';

export default function Sidebar({ isDrawerOpen, handleOnCloseDrawer, matchUpMd }: any) {
  const [ openedState, setOpenItem ] = useState({});

  const handleMenuItemClick = ({ id, isNested }: any) => {
    if (isNested) {
      setOpenItem((prevState:any) => ({...prevState, [id]: !prevState[id]}));
    }
  }

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={handleOnCloseDrawer}
      variant={matchUpMd ? 'permanent' : 'temporary'}
      anchor="left"
      ModalProps={{ keepMounted: true }}
    >
      <Branding>
        <img src={LogoSmall} width={40} alt="Tokenzeiro" />
        <SiteName isDrawerOpen={isDrawerOpen} className="branding-name">CryptoToken</SiteName>
      </Branding>
      <MenuList>
        <List>
          {menuItems.map((item: any) => <RenderMenuItem item={item} handleMenuItemClick={handleMenuItemClick} openedState={openedState} isDrawerOpen={isDrawerOpen} />)}
        </List>

        <>
          <Divider />
          <List>
            {menuItemsAdmin.map((item: any) => <RenderMenuItem item={item} handleMenuItemClick={handleMenuItemClick} openedState={openedState} isDrawerOpen={isDrawerOpen} />)}
          </List>
        </>
      </MenuList>
    </Drawer>
  );
}


const RenderMenuItem = ({ item, handleMenuItemClick, openedState, isDrawerOpen } : any) => {
  const itemId = `${item.type}-${item.label}-${item.link}`;
  const location = useLocation();
  const isSelected = location.pathname === item.link;

  switch(item.type) {
    case 'menuTitle':
      return <>
              <Typography variant="menuTitle" className="item-title">{item.label}</Typography>
              <ListItem className="item-title-less"><ListItemIcon><MoreHoriz /></ListItemIcon></ListItem>
            </>

    case 'menu':
      const isNestedOpen = openedState[itemId];

      return (
        <>
          <MenuItem
            id={itemId}
            item={item}
            isSelected={isSelected}
            handleMenuItemClick={handleMenuItemClick}
            isNested={item.children}
            isNestedOpen={isNestedOpen}
            sx={{
              ...(openedState[itemId] && {
                background: 'rgba(0,0,0,.035)'
              })
            }}
            />

          {item.children &&
            <Collapse in={isDrawerOpen && isNestedOpen}
            sx={{ background: 'rgba(0,0,0,.035)'}}>
              <List>
                {item.children.map((item: any) => <RenderMenuItem item={item} handleMenuItemClick={handleMenuItemClick} openedState={openedState} isDrawerOpen={isDrawerOpen} />)}
              </List>
            </Collapse>
          }
        </>
      );
  }

  return null;
}

const MenuItem = ({ id, item, isSelected, handleMenuItemClick, isNested, isNestedOpen, ...props }: any) => {
  const navigate = useNavigate();

  const handleOnClickItem = () => {
    handleMenuItemClick({ id, isNested });

    if (item.link) {
      navigate(item.link);
    }
  }

  const rotateExpand = isNestedOpen ? "rotate(0)" : "rotate(-90deg)";

  return (
    <ListItemButtonWrapper
        key={id}
        selected={isSelected}
        onClick={handleOnClickItem}
        {...props}
      >
      <ListItemIcon sx={{ minWidth: 45, color: 'inherit' }}>
        {item.icon || <NestedIcon style={{ fontSize: 10, marginLeft: 4 }} />}
      </ListItemIcon>
      <ListItemText>
        <Typography variant="menu" display="block" sx={{
          ...(isSelected && {
            color: 'inherit',
            fontWeight: 800
          }),
          ...(!isSelected && {
            color: '#000000'
          })
        }}
        >
          {item.label}
        </Typography>
      </ListItemText>
      {isNested && <ExpandMore style={{ transform: rotateExpand, transition: "all 0.2s linear", color: "#afafaf" }} />}
    </ListItemButtonWrapper>
  );
}

// ***************************************************
// Branding
// ***************************************************
const Branding = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  width: 'inherit',
  height: AppConfig.menu.drawerWidthSmall,
  boxShadow: '0 1px 2px 1px rgb(209 206 206 / 20%)',
  padding: '22px 12px 22px 10px',
  overflow: 'hidden',
}));

type SiteNameProps = {
  isDrawerOpen: boolean;
};

const SiteName = styled(Typography)<SiteNameProps>(({ theme, isDrawerOpen }) => ({
  fontSize: 24,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 10,
  opacity: 1,
  ...(!isDrawerOpen && {
    opacity: 0,
  }),
}));


// ***************************************************
// Drawer
// ***************************************************

const openedMixin = (theme: Theme): CSSObject => ({
  width: AppConfig.menu.drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'hidden',
  width: `${AppConfig.menu.drawerWidthSmall}px`,
  [theme.breakpoints.down('md')]: {
    left: -1,
    width: 0
  },
});

const MenuList = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '64px',
  height: '100%',
  width: 'inherit',
  overflowX: 'auto',
  paddingBottom: '65px',
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}));

const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    position: 'fixed',
    left: 0,
    zIndex: 1300,
    width: AppConfig.menu.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    height: "100%",
    boxShadow: '0 4px 7px 0 rgb(0 0 0 / 20%)',
    '& .item-title': {
      display: 'none'
    },
    '& .item-title-less': {
      display: 'none'
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .item-title': {
        display: 'block'
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .item-title-less': {
        display: 'block'
      },
    }),
    "&:hover": {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .branding-name': {
        opacity: 1
      },
      '& .item-title': {
        display: 'block'
      },
      '& .item-title-less': {
        display: 'none'
      }
    },
  }),
);

// List Item

const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
  color: 'rgba(0,0,0,.54)',
  background: 'transparent',
  '&.Mui-selected': {
    transition: theme.transitions.create('background', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    ...AppConfig.theme.menu.selected, // Contains some styles for the colors
    paddingRight: '0 0 0 21px',
    color: '#FFFFFF',
    marginRight: '10px',
    userSelect: 'none',
    borderRadius: '0 5px 5px 0'

  }
}));

