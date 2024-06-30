import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { SidepanelConfig } from "../../types/Config.ts";

type MainMenuButtonProps = {
  setSidepanelStatus: Dispatch<SetStateAction<SidepanelConfig>>;
};

export default function MainMenuButton({
  setSidepanelStatus,
}: Readonly<MainMenuButtonProps>) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openNewTicketForm() {
    setSidepanelStatus({
      open: true,
      formType: "NewTicket",
    });
    setAnchorEl(null);
  }

  function navigateToSearch() {
    navigate("/");
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="main menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuList>
          <MenuItem onClick={navigateToSearch}>
            <ListItemIcon>
              <SearchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Search</ListItemText>
          </MenuItem>
          <MenuItem onClick={openNewTicketForm}>
            <ListItemIcon>
              <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>New Ticket</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
