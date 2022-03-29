import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUser } from "./store/userSlice/thunks";
import { setFetching } from "./store/userSlice";
import { Profile } from "./pages/auth";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
        <Paper elevation={5}>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {fetchingUser ? <Loading /> : <Profile />}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

const Loading: React.FC = (): JSX.Element => {
  return (
    <>
      <Stack
        position={"absolute"}
        left={0}
        right={0}
        top={0}
        bgcolor={theme.palette.secondary.main}
        height="10vh"
        alignItems="center"
        justifyContent={"center"}
      >
        <Typography
          fontSize={24}
          fontWeight={800}
          color={"rgba(0, 0, 0, 0.87)"}
        >
          <strong>Welcome to Traductora!</strong>
        </Typography>
        <Typography color={"rgba(0, 0, 0, 0.87)"}>
          A speech-to-speech language translation app
        </Typography>
      </Stack>
      <CircularProgress />
    </>
  );
};

export default App;
