import React, { useState, useEffect } from "react";
import { Avatar, Button, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

const classes = {
  root: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}

const User = () => {
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newUser.photo);
    formData.append("username", newUser.name);
    console.log(formData);

    axios
      .post("http://localhost:5000/upload/", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  useEffect(() => {
    fetch('http://192.168.56.1:5000/users').then(res => res.json()).then(data => setUserList([...data]));
    //secondary option
  }, [])

  return (
    <Grid sx={classes.root} container xs={12} justify="center">
      <Grid container item xs={12} >
        <Stack>
          {userList.length > 0 && userList.map(user => (
            <>
              <Avatar key={user.username} src={`http://localhost:5000/image/${user.profilePicture}`} />
              <Typography variant="caption" >Username: {user.username}</Typography>
            </>
          ))}
        </Stack>
      </Grid>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <Grid item xs={12}>
          <TextField
            type="text"
            placeholder="Username"
            name="name"
            value={newUser.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default User;
