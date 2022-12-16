import React, { useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';

import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import SchoolIcon from '@material-ui/icons/School';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

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
    className: 'nested',
  },
  {
    title: 'Bootcamps',
    requestsKey: 'bootcamps',
    to: '/education/requests/bootcamps',
    className: 'nested',
  },
  {
    title: 'Professional training',
    requestsKey: 'profTraining',
    to: '/education/requests/prof-training',
    className: 'nested',
  },
  {
    title: 'School',
    requestsKey: 'school',
    to: '/education/requests/school',
    className: 'nested',
  },
  {
    title: 'Enterprise',
    requestsKey: 'enterprise',
    to: '/education/requests/enterprise',
    className: 'nested',
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

const useStyles = makeStyles((theme) => ({
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
}));

const StyledBadge = withStyles(() => ({
  badge: {
    right: -16,
    top: 15,
    padding: '0 4px',
  },
}))(Badge);

const Navigation = () => {
  const { isAuth, login } = useContext(AuthContext);
  const dispatch = useDispatch();
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
  const classes = useStyles();
  const renderMenuItems = (items, parentKey = '') => {
    const elements = items.map((item, index) => {
      const key = `${parentKey}-${index}`;
      if (item.divider) {
        return <Divider key={key} className={classes[item.className]} />;
      }
      if (item.subheader) {
        return (
          <ListSubheader
            key={key}
            inset
            disableSticky
            className={classes[item.className]}
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
          <StyledBadge
            badgeContent={requestsCountMap[item.requestsKey]}
            color="primary"
          >
            {itemText}
          </StyledBadge>
        );
      }
      if (item.group) {
        const collapseIconClass = item.requestsKey
          ? classes.collapseIconWithBadge
          : '';
        return (
          <React.Fragment key={key}>
            <ListItem
              button
              onClick={() => setOpenRequests(!openRequests)}
              className={classes[item.className]}
            >
              {icon}
              {listTextEl}
              {openRequests ? (
                <ExpandLess className={collapseIconClass} />
              ) : (
                <ExpandMore className={collapseIconClass} />
              )}
            </ListItem>
            <Collapse in={openRequests} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.items, key)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }
      return (
        <ListItem
          key={key}
          button
          onClick={() => navigate(item.to)}
          className={classes[item.className]}
        >
          {icon}
          {listTextEl}
        </ListItem>
      );
    });
    return <>{elements}</>;
  };
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <div>
          {isAuth ? (
            renderMenuItems(menuItems)
          ) : (
            <ListItem button onClick={login}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </div>
      </List>
    </Drawer>
  );
};

export default Navigation;
