import { useState } from 'react'
import { Card, CardActions, CardContent, Typography, Button, Container, Link, Grid } from '@mui/material';
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Dashboard_check() {
    const [tokencheck, setTokenCheck] = useState(window.localStorage.getItem('token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <Dashboard />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%", mx: "auto", mt: "12%", p: "2%", backgroundColor: "#e9e9e9" }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">Please Login To Access The Content</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ mx: "auto", fontSize: "1.5rem" }} onClick={() => nav('/')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}


const Dashboard = () => {
    const [DayCount, setDayCount] = useState('')
    const [MonthCount, setMonthCount] = useState('')
    const [YearCount, setYearCount] = useState('')
    const nav = useNavigate()

    useEffect(() => {
        const getData = async () => {

            try {
                await axios.get("http://localhost:5000/links/daycount").then((res) => {
                    setDayCount(res.data.day)
                    setMonthCount(res.data.month)
                    setYearCount(res.data.year)
                })
            }
            catch (err) {
                console.log("err::", err)
            }

        }
        getData()
    }, [])


    

    const Logout = () => {
        window.localStorage.removeItem('token')
        nav('/')
    }

    return (
        <>
            <Container sx={{ mt: "5%" }}>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" sx={{ mb: 4 }}>
                    <Grid ><Button variant="contained" onClick={() => nav('/links')}>Create Short Url</Button></Grid>
                    <Grid ><Button variant="contained" sx={{ float: "right" }} onClick={() => Logout()}>Logout</Button></Grid>

                </Grid>
                <Grid>
                    <Typography variant="h6" color="white" sx={{ backgroundColor: "#1976d2", mt: "5%", borderRadius: "1rem", p: "0.75rem" }}>Statistics</Typography>

                </Grid>
                <Card variant="outlined" sx={{backgroundColor:"#1976d2" ,color:"white", mt:"5%" ,p:"2%"}}>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center" >
                    <Grid >
                            <CardContent>
                            <Typography variant="h1" >{DayCount}<Typography variant="caption" sx={{ fontSize: "1.2rem" }}>Links/Day</Typography></Typography>
                            </CardContent>
                    </Grid>
                    <Grid>
                            <CardContent>
                                <Typography variant="h1">{MonthCount}<Typography variant="caption" sx={{ fontSize: "1.2rem" }}>Links/Month</Typography></Typography>
                            </CardContent>
                    </Grid>
                </Grid>
                </Card>

                
            </Container>
        </>
    );
}


