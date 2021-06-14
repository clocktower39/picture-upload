import React, { useState, useEffect } from "react";
import { Button, CardMedia, Grid, Input, TextField, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    root: {},
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
})

const User = () => {
    const classes = useStyles();
    const [images, setImages] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    birthdate: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newUser.photo);
    formData.append("name", newUser.name);
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

  useEffect(()=>{
      fetch('http://192.168.56.1:5000/files').then(res => res.json()).then(data => setImages([...data]))
      //secondary option
  },[])

  return (
    <Grid className={classes.root} container xs={12} justify="center">
        {images.map(image => (
            <Grid key={image.filename} item xs={12}>
                <CardMedia className={classes.media} image={`http://localhost:5000/image/${image.filename}`}/>
            </Grid>
        ))}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid item xs={12}>
          <Input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            placeholder="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="date"
            name="birthdate"
            value={newUser.date}
            onChange={handleChange}
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
