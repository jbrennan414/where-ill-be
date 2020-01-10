import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import TodayIcon from '@material-ui/icons/Today';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

import headshot from '../assets/headshot.jpg';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
        <List>
          <Link to={`/profile`}>
            <ListItem button key={"My Profile"}>
                <ListItemIcon><Avatar src={headshot} /></ListItemIcon>
                <ListItemText primary={"My Profile"} />
            </ListItem>
          </Link>
        </List>
      <Divider />
      <List>
          <Link to={`/calendar`}>
            <ListItem button key={"Calendar"}>
                <ListItemIcon><TodayIcon /></ListItemIcon>
                <ListItemText primary={"Calendar"} />
            </ListItem>
          </Link>
        </List>
      <Divider />
      <List>
          <ListItem button key={"Sign Out"}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}>Open Left</Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}