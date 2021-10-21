import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button component={NavLink} exact to="/" color="inherit" activeClassName="Mui-focusVisible" >Upload Movie</Button>
          <Button component={NavLink} exact to="/movies" color="inherit" activeClassName="Mui-focusVisible" >Movie List</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
