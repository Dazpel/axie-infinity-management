import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axieBackground from "../../assets/img/axie_background.jpeg";
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg";
import "./style.css";
import {
  GoogleAuthProvider,
  OAuthCredential,
  signInWithPopup,
} from "@firebase/auth";
import { firebaseAuth, firebaseDb } from "../AuthProvider/fbConfig";
import { doc, setDoc } from "firebase/firestore";

function Copyright(props: any) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        We are NOT affiliated with Axie Infinity. This is a fan site dedicated
        to the game
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        You can contact us at{" "}
        <a href="mailto:quimeraacademy@gmail.com">quimeraacademy@gmail.com</a>
      </Typography>
    </>
  );
}

const theme = createTheme();

export default function Login() {
  const [isScholar, setIsScholar] = React.useState(false);
  const [isManager, setIsManager] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleProvider = () => {
    const provider = new GoogleAuthProvider();
    // let credential: OAuthCredential | null;

    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        // console.log("token", token);
        // // The signed-in user info.
        const user = result.user;
        const docData = {
          name: user.displayName,
          profilePicture: user.photoURL,
          email: user.email,
          roninAddress: null,
          isGreeted: false,
          walletAddress: null,
          scholarsId: [],
          academySettings: {},
        };
        const res = await setDoc(
          doc(firebaseDb, "managers", user.uid),
          docData
        );
        console.log(res);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("error", error);
      });
  };

  const handleRole = (role: String) => {
    switch (role) {
      case "scholar":
        setIsScholar(true);
        setIsManager(false);
        break;
      case "manager":
        setIsScholar(false);
        setIsManager(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    alert("Scholar not found");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <img
            style={{
              height: "100%",
              width: "100%",
            }}
            src={axieBackground}
            alt={"Axie infinity Image"}
            loading="lazy"
          />
        </Grid>
        <Grid
          item
          className="formContainer"
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            className="signIn_form"
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box className="signIn_btn--Group" gap={4}>
              <Button
                type="submit"
                onClick={() => handleRole("manager")}
                fullWidth
                className="userRole_btn"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Manager
              </Button>
              <Button
                type="submit"
                onClick={() => handleRole("scholar")}
                fullWidth
                className="userRole_btn"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Scholar
              </Button>
            </Box>
            {isManager && (
              <Grid item>
                <Button
                  className="socialBtns"
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon className="socialIcons" />}
                  onClick={handleGoogleProvider}
                >
                  <Typography style={{ fontSize: "12px", paddingLeft: 20 }}>
                    Continue with Google
                  </Typography>
                </Button>
              </Grid>
            )}
            {isScholar && (
              <Box
                component="form"
                className="scholar_form"
                // noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  className="signIn_btn"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enter
                </Button>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 2 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
