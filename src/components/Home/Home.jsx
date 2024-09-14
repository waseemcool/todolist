import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { setTodoItemsToLocalStorage } from "../../utils/todoItemsUtils";
import TodoList from "../Todo/TodoList";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoItems, setTodoItems] = useState([]);

  const [openAddPopup, setOPenAddPopup] = useState(false);

  const { signOut: authSignOut } = useAuth();
  let todoItemsArray = [];
  useEffect(() => {
    const array = localStorage.getItem("todos");
    const todos = JSON.parse(array);
    const userLS = localStorage.getItem("user");
    const user = JSON.parse(userLS);

    if (todos != null) {
      const todosForUser = todos.filter(
        (todo) => todo.userEmail === user.email
      );
      setTodoItems(todosForUser);
      // todoItemsArray.push(todosForUser);
    }
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("loggedInEmail");
    authSignOut();
    navigate("/signin");
  };

  const array = localStorage.getItem("todos");
  const todos = JSON.parse(array);

  const userLS1 = localStorage.getItem("user");
  const user = JSON.parse(userLS1);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const todoExist =
      todoItems && todoItems.filter((todo) => todo.title === title);

    todoItems.map((todo) => todoItemsArray.push(todo));
    // if (todos != null) {
    //   todos.map((todo) => {
    //     todoItemsArray.push(todo);
    //   });
    // }
    //   const todosForUser=todos.filter((todo)=>todo.userEmail===user.email)
    //   setTodoItems(todosForUser);
    // setTodoItems(todoItemsArray);
    if (todoExist !== null && todoExist.length > 0) {
      alert("Todo Item already exist");
    } else {
      const payload = {
        title: title,
        description: description,
        isCompleted: isCompleted,
        userEmail: user.email,
      };

      todoItemsArray.push(payload);

      setTodoItemsToLocalStorage(todoItemsArray);

      setTodoItems(todoItemsArray);

      // const array = localStorage.getItem("todos");
      // const todos = JSON.parse(array);
      // const userLS = localStorage.getItem("user");
      // const user = JSON.parse(userLS);

      // if (todos != null) {
      //   const todosForUser = todos.filter(
      //     (todo) => todo.userEmail === user.email
      //   );
      //   setTodoItems(todosForUser);
      // }

      alert("Todo Item Added Successfully");
    }
  };

  const handleAddPopupOpen = () => {
    setOPenAddPopup(true);
  };

  const handleAddPopupClose = () => {
    setOPenAddPopup(false);
  };

  return (
    <div>
      <Grid2 container>
        <Grid2 size={12}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  HOME
                </Typography>
                <div>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={handleSignOut}
                    style={{ fontWeight: "bold" }}
                  >
                    Sign Out
                  </Button>
                </div>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid2>
        <Grid2 size={12}>
          <Stack
            direction="row"
            spacing={3}
            paddingY={3}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              endIcon={<AddCircleOutlineIcon color="primary" />}
              onClick={handleAddPopupOpen}
            >
              Add Todo
            </Button>
          </Stack>
        </Grid2>
      </Grid2>

      <Dialog
        open={openAddPopup}
        onClose={handleAddPopupClose}
        PaperProps={{
          component: "form",
          onSubmit: handleAddTodo,
        }}
      >
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPopupClose}>Cancel</Button>
          <Button type="submit">Add Todo</Button>
        </DialogActions>
      </Dialog>
      {/* <form onSubmit={handleAddTodo}>
        <h2>Add Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Add Todo</button>
      </form> */}
      <div>
        <TodoList todoItems={todoItems} setTodoItems={setTodoItems} />
      </div>
    </div>
  );
};

export default Home;
