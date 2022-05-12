import { Formik } from 'formik'
import axios from 'axios'
import { Box, TextField, Button, Container,Card,CardActions,Typography,CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'

export default function Dashboard_check() {
    const [tokencheck, setTokenCheck] = useState(window.localStorage.getItem('token'))
    const nav = useNavigate()
    return (
        tokencheck ? <>
            <Links />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%",mx:"auto",mt:"12%", p:"2%",backgroundColor:"#e9e9e9"}} variant="outlined"> 
                    <CardContent>
                        <Typography sx={{textAlign:"center"}}  variant="h5" color="dark">Login to Fetch The Data</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{mx:"auto",fontSize:"1.5rem"}}  onClick={() => nav('/')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}



const Links = ()=> {
    const nav = useNavigate();
   const [url,setUrl] = useState("https://day-45.herokuapp.com")

    let initialvalues = {
        url: ""
    };
    const Validate = (value) => {
        let error = {};
        if (value.url === "") {
            error.url = "Url is Required";
        }
        return error;
    };

    const handleSubmit = async (e) => {
        let token = jwtDecode(localStorage.getItem('token'));
        let id = token.user._id;
        // console.log(id)
        let response = await axios.post(`${url}/links/${id}`, {
            url: e.url
        });
        if (!response.data.msg) {
            nav('/table');
        }
    };
    return (
        <>
            <Formik
                initialValues={initialvalues}
                validate={(value) => Validate(value)}
                onSubmit={(e) => handleSubmit(e)}
            >
                {({
                    values, errors, touched, handleChange, handleBlur, handleSubmit,
                }) => (
                    <Container >
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:"10%", width: "100%", maxWidth: "60rem", display: "flex", justifyContent: "space-evenly" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="url"
                                label="Url"
                                name="url"
                                autoComplete="url"
                                autoFocus
                                value={values.url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ marginRight: "2%", minWidth: "8rem" }} />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Convert
                            </Button>
                            </Box>
                            <Button variant="contained" sx={{mt : "5%"}} onClick={() =>nav('/table')}>Your Links</Button>
                    </Container>
                )}
            </Formik>
        </>
    );
}