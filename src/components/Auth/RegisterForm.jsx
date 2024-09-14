import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

const RegisterContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "15vh",
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

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .required("Please enter your E-mail Address")
//     .email("Invalid E-mail Address"),
//   name: Yup.string().required("Please enter your Name"),
//   password: Yup.string()
//     .required("Please enter your Password")
//     .min(7, "Password must be at least 7 characters"),
// });

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { usersArray: authUsers, register: authRegister } = useAuth();

  const navigate = useNavigate();

  const array = localStorage.getItem("users");
  const users = JSON.parse(array);

  // const {
  //   register,
  //   handleRegister,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });

  const handleRegister = (e) => {
    // alert(email);
    // alert(name);
    // alert(password);

    e.preventDefault();

    if (email === "") {
      alert("Enter the E-mail");
    } else if (name === "") {
      alert("Enter the Name");
    } else if (password === "") {
      alert("Enter the Password");
    } else {
      const userExist = users && users.filter((user) => user.email === email);
      if (userExist !== null && userExist.length > 0) {
        alert("User already exist");
      } else {
        const payload = {
          email: email,
          name: name,
          password: password,
        };

        try {
          const response = authRegister(payload);
          if (response === "Success") {
            alert("User Registered Successfully");
          }
          navigate("/signin");
        } catch (error) {
          console.log("Registration Failed", error);
          alert("Registration Failed");
        }
      }
    }
  };

  return (
    // <form onSubmit={handleRegister}>
    //   <h2>Register</h2>
    //   <input
    //     type="email"
    //     placeholder="E-mail"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <br />
    //   <input
    //     type="text"
    //     placeholder="Name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <br />
    //   <input
    //     type="password"
    //     placeholder="Pasword"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <br />
    //   <button type="submit">Sign Up</button>
    //   <Link to="/signin">
    //     <button>Go To Sign In</button>
    //   </Link>
    // </form>
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <RegisterContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                // error={nameError}
                // helperText={nameErrorMessage}
                //id="email"
                type="text"
                //name="email"
                placeholder="Name"
                autoComplete="name"
                autoFocus
                //required
                fullWidth
                variant="outlined"
                //color={nameError ? "error" : "primary"}
                color="primary"
                sx={{ ariaLabel: "name" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              Register
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <MuiLink
                  //href=""
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  <Link to="/signin">Sign In</Link>
                </MuiLink>
              </span>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </AppTheme>
  );
};

export default RegisterForm;
