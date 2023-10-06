import { FC, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import Link from "next/link";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
type linksProps = {
  text: string;
  href: string;
};
interface DrawerCommp {
  links: linksProps[];
}

const DrawerCommp: FC<DrawerCommp> = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {" "}
        <List>
          {links.map((link, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                sx={{ color: "black", "&:hover": { color: "secondary.main" } }}
              >
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <IconButton sx={{ marginLeft: "auto", color: "white" }} onClick={() => setOpen(!open)}>
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};
export default DrawerCommp;
