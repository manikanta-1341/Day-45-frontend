import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik'
import axios from 'axios'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [user, setUser] = useState({
        username: "",
        firstname: "",
        lastname: "",
        password: ""
    })
    const handleSubmit = async (e,onSubmitProps) => {
       try{
            let response = await axios.post('http://localhost:5000/register',{
                user : e
            })
            if(!response.data.msg && response.status === 200){
                // console.log("res::",response)
                onSubmitProps.resetForm()
            }
            else{
                alert(response.data.msg)
            }
       }
       catch(err){
           console.log(err)
       }
    }

    const Validate = (value) => {
        let error = {}
        if (value.firstname === "") {
            error.firstname = "Firstname is Required"
        }
        if (value.lastname === "") {
            error.lastname = "Lastname is Required"
        }
        if (!value.username.includes(".com") || !value.username.includes("@")) { 
            error.username = "Username must be a valid Email address"
        }
        if (value.password === "") {
            error.password = "Password is Required"
        }
        return error
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Formik
                        initialValues={user}
                        validate={(value) => Validate(value)}
                        onSubmit={(e,onSubmitProps) => handleSubmit(e,onSubmitProps)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstname"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            autoFocus
                                            value={values.firstname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Typography color="red">{touched.firstname && errors.firstname}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastname"
                                            label="Last Name"
                                            name="lastname"
                                            autoComplete="family-name"
                                            value={values.lastname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Typography color="red">{touched.lastname && errors.lastname}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Typography sx={{color:"grey"}} variant="caption">Username must be a valid Email address</Typography>
                                        <Typography color="red">{touched.username && errors.username}</Typography>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Typography color="red">{touched.password && errors.password}</Typography>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="/" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>

                        )}
                    </Formik>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}