import React, { useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import Badge from '@mui/material/Badge';

import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MonetizationOn from '@mui/icons-material/MonetizationOn';

import { AuthContext } from './auth/auth-context';
import {
  fetchRequests,
  selectAllRequests,
  selectTotalRequests,
} from '../store/requests-slice';

const educationItems = [
  {
    title: 'University',
    requestsKey: 'university',
    to: '/education/requests/university',
    styleName: 'nested',
  },
  {
    title: 'Bootcamps',
    requestsKey: 'bootcamps',
    to: '/education/requests/bootcamps',
    styleName: 'nested',
  },
  {
    title: 'Professional training',
    requestsKey: 'profTraining',
    to: '/education/requests/prof-training',
    styleName: 'nested',
  },
  {
    title: 'School',
    requestsKey: 'school',
    to: '/education/requests/school',
    styleName: 'nested',
  },
  {
    title: 'Enterprise',
    requestsKey: 'enterprise',
    to: '/education/requests/enterprise',
    styleName: 'nested',
  },
];

const menuItems = [
  { title: 'Accounts', to: '/accounts', icon: <PeopleIcon /> },
  { title: 'Organizations', to: '/organizations', icon: <BusinessIcon /> },
  { divider: true },
  { subheader: 'Education' },
  {
    title: 'Trial requests',
    requestsKey: 'total',
    icon: <SchoolIcon />,
    group: true,
    items: educationItems,
  },
  {
    title: 'Activation codes',
    to: '/education/activation-codes',
    icon: <MonetizationOn />,
  },
];

const drawerWidth = 250;

const Navigation = () => {
  const { isAuth, login } = useContext(AuthContext);
  const theme = useTheme()
  const dispatch = useDispatch();

  const styles = {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    nested: {
      paddingLeft: theme.spacing(4),
    },
    collapseIconWithBadge: {
      marginLeft: 28,
    },
    badge: {
      right: -16,
      top: 15,
      padding: '0 4px',
    },
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchRequests());
    }
  }, [isAuth]);
  const requests = useSelector(selectAllRequests);
  const totalRequests = useSelector(selectTotalRequests);
  const requestsByType = _.groupBy(requests, 'type');
  const requestsCountMap = _.mapValues(
    requestsByType,
    (values) => values.length
  );
  requestsCountMap.total = totalRequests;
  const [openRequests, setOpenRequests] = useState(true);

  const renderMenuItems = (items, parentKey = '') => {
    const elements = items.map((item, index) => {
      const key = `${parentKey}-${index}`;
      if (item.divider) {
        return <Divider key={key} sx={styles[item.styleName]} />;
      }
      if (item.subheader) {
        return (
          <ListSubheader
            key={key}
            inset
            disableSticky
            sx={styles[item.styleName]}
          >
            {item.subheader}
          </ListSubheader>
        );
      }
      const icon = item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null;
      const itemText = <ListItemText primary={item.title} />;
      let listTextEl = itemText;
      if (item.requestsKey) {
        listTextEl = (
          <Badge
            badgeContent={requestsCountMap[item.requestsKey]}
            color="primary"
            sx={{"& .MuiBadge-badge": styles.badge}}>
            {itemText}
          </Badge>
        );
      }
      if (item.group) {
        const collapseIconStyle = item.requestsKey
          ? styles.collapseIconWithBadge
          : undefined;
        return (
          <React.Fragment key={key}>
            <ListItemButton
              onClick={() => setOpenRequests(!openRequests)}
              sx={styles[item.styleName]}
            >
              {icon}
              {listTextEl}
              {openRequests ? (
                <ExpandLess sx={collapseIconStyle} />
              ) : (
                <ExpandMore sx={collapseIconStyle} />
              )}
            </ListItemButton>
            <Collapse in={openRequests} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.items, key)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }
      return (
        <ListItemButton
          key={key}
          onClick={() => navigate(item.to)}
          sx={styles[item.styleName]}
        >
          {icon}
          {listTextEl}
        </ListItemButton>
      );
    });
    return <>{elements}</>;
  };
  return (
    <Drawer
      variant="permanent"
      sx={styles.drawer}
      PaperProps={{sx: styles.drawerPaper}}
      anchor="left"
    >
      <div style={styles.toolbar} />
      <Divider />
      <List>
        <div>
          {isAuth ? (
            renderMenuItems(menuItems)
          ) : (
            <ListItemButton onClick={login}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </div>
      </List>
    </Drawer>
  );
};

export default Navigation;
