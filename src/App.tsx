import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUser } from "./store/userSlice/thunks";
import { setFetching } from "./store/userSlice";
import { Profile } from "./pages/auth";
import { Box, CircularProgress, Container, Paper } from "@mui/material";
import ThemeProvider from "@mui/system/ThemeProvider";
import theme from "./themes/theme";

const App: React.FC = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const fetchingUser = useAppSelector((state) => state.user.fetching);

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) userDispatch(getUser());
    else userDispatch(setFetching(false));
  }, [userDispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container id="app" maxWidth="sm">
        <Paper>
          <Box
            sx={{
              height:'100vh',
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {fetchingUser ? <CircularProgress /> : <Profile />}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
