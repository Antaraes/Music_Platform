"use client";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import { FC, useState } from "react";
import DrawerCommp from "./DrawerComp";
import Music from "@/app/music/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
const LINKS = [
  { text: "Home", href: "/" },
  { text: "Music", href: "/music" },
  { text: "Plugin", href: "/plugin" },
];
interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isAdminView = false;
  const isAuthuser = false;
  const user = {
    role: "i",
  };
  const links = ["Contact", "Alll"];
  return (
    <>
      <AppBar sx={{ background: "#000" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerCommp links={LINKS} />
            </>
          ) : (
            <Grid sx={{ placeItems: "center" }} container>
              <Grid item xs={2}>
                <Typography>Shop</Typography>
              </Grid>
              <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
                <List sx={{ display: "flex", gap: 2 }}>
                  {LINKS.map(({ text, href }) => (
                    <ListItem key={href} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={href}
                        sx={{ color: "white", "&:hover": { color: "primary.main" } }}
                      >
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              {!isAuthuser && (
                <Grid item xs={4}>
                  {" "}
                </Grid>
              )}

              <Grid item xs={isAuthuser ? 5 : 1}>
                <Box>
                  {!isAdminView && isAuthuser ? (
                    <>
                      <Button sx={{ marginLeft: 1 }} variant="outlined">
                        Account
                      </Button>
                      <Button sx={{ marginLeft: 1 }} variant="outlined">
                        Cart
                      </Button>
                    </>
                  ) : null}
                  {user?.role === "admin" ? (
                    isAdminView ? (
                      <>
                        <Button sx={{ marginLeft: 1 }} variant="outlined">
                          Client View
                        </Button>
                      </>
                    ) : (
                      <Button sx={{ marginLeft: 1 }} variant="outlined">
                        Admin View
                      </Button>
                    )
                  ) : null}
                  {isAuthuser ? (
                    <Button sx={{ marginLeft: 1 }} variant="contained">
                      Logout
                    </Button>
                  ) : (
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                      Login
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
