import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToApp from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>opções</ListSubheader>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);
