import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  Card as MuiCard,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
  Link as MuiLink,
  CssBaseline,
} from "@mui/material";
import AppTheme from "../../theme/AppTheme";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "20vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const SignInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user: authUser, signIn: authSignIn } = useAuth();

  const navigate = useNavigate();

  const array = localStorage.getItem("users");
  const users = JSON.parse(array);

  const handleSignIn = (e) => {
    // alert(email);
    // alert(password);

    e.preventDefault();

    if (email === "") {
      alert("Enter the E-mail");
    } else if (password === "") {
      alert("Enter the Password");
    } else {
      const signInUser = users.filter(
        (user) => user.email === email && user.password === password
      );
      if (signInUser !== null) {
        const payload = {
          email: email,
          password: password,
        };

        try {
          const response = authSignIn(payload);
          if (response === "Success") {
            alert("User Logged Successfully");
          }
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("loggedInEmail", email);
          //localStorage.setItem("user", JSON.stringify(payload));
          navigate("/");
        } catch (error) {
          console.log("Sign In Failed", error);
          alert("Sign In Failed");
        }
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    // <form onSubmit={handleSignIn}>
    //   <h2>Sign In</h2>
    //   <input
    //     type="email"
    //     placeholder="E-mail"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <br />
    //   <input
    //     type="password"
    //     placeholder="Pasword"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <br />
    //   <button type="submit">Sign In</button>
    //   <Link to="/register">
    //     <button>Go To Register</button>
    //   </Link>
    // </form>

    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <TextField
                // error={emailError}
                // helperText={emailErrorMessage}
                //id="email"
                type="email"
                //name="email"
                placeholder="your@gmail.com"
                autoComplete="email"
                autoFocus
                //required
                fullWidth
                variant="outlined"
                //color={emailError ? "error" : "primary"}
                color="primary"
                sx={{ ariaLabel: "email" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                // error={passwordError}
                // helperText={passwordErrorMessage}
                //name="password"
                placeholder="••••••"
                type="password"
                //id="password"
                autoComplete="current-password"
                autoFocus
                //required
                fullWidth
                variant="outlined"
                //color={passwordError ? "error" : "primary"}
                color="primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              //onClick={validateInputs}
              style={{ fontWeight: "bold", fontSize: "17px" }}
            >
              Sign In
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span>
                <MuiLink
                  //href=""
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  <Link to="/register">Register</Link>
                </MuiLink>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export default SignInForm;
