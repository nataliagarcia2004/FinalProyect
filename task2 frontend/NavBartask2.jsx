import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Personal Trainer App
        </Typography>
        <Button component={Link} to="/">Customers</Button>
        <Button component={Link} to="/trainings">Trainings</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
