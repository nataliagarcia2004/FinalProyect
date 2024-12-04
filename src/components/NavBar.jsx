import { Link } from 'react-router-dom';  
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';  

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* title*/}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Personal Trainer
        </Typography>
        
        <Box sx={{ display: 'flex' }}>
          {/* customers and trainings, the 2 pages */}
          <Button color="inherit" component={Link} to="/customers">Customers</Button>
          <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
