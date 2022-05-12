import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Card, CardActions, CardContent, Typography, Button, Container, Link, Grid } from '@mui/material';


export default function Table_check() {
    const [tokencheck, setTokenCheck] = useState(window.localStorage.getItem('token'))
    const nav = useNavigate()
    return (
        tokencheck ? <>
            <Table_data />
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



const Table_data = ()=> {
    const [data, setData] = useState({})
    const [FullUrl, setFullUrl] = useState([])
    const [ShortUrl, setShortUrl] = useState([])
    const [clicks, setClicks] = useState({})
    const[ url , setUrl] = useState("https://day-45.herokuapp.com")
    const nav = useNavigate()
    useEffect(() => {
        const getData = async () => {

            try {
                let token = jwtDecode(localStorage.getItem('token'))
                let id = token.user._id
                await axios.get(`${url}/links/${id}`).then((res) => {
                    setData(res.data)
                    setClicks(res.data.clicks)
                    setFullUrl(res.data.url)
                    setShortUrl(res.data.short_url)
                })
            }
            catch(err){
                console.log(err)
            }
        }
        getData()
    },[])


    const Short_Url = async (str) => {
        let response = await axios.get(`${url}/${str}`)
        let res = await axios.post(`${url}/${str}`)
        console.log(response,res)
        if (response) {
            console.log(clicks)
            setClicks(res.data.clicks)
            window.open(`https://${response.data}`, '_blank')
        }
    }

    return (
        <>
            {FullUrl?<Container>
                <TableContainer>
                    <Table sx={{ minWidth: 700 , mt :"10%"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Url&nbsp;</StyledTableCell>
                                <StyledTableCell>Short_Url&nbsp;</StyledTableCell>
                                <StyledTableCell>Clicks&nbsp;</StyledTableCell>
                                <StyledTableCell>Created At&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {FullUrl.map((row, i) => (
                                <StyledTableRow key={i + 1}>
                                    <StyledTableCell>{row}</StyledTableCell>
                                    <StyledTableCell><Link underline="none" onClick={() => Short_Url(ShortUrl[i])}  href="#">{ShortUrl[i]}</Link></StyledTableCell>
                                    <StyledTableCell>{clicks[i]}</StyledTableCell>
                                    <StyledTableCell>{data.createdAt[i].substring(0, 10)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={{mt : "7%"}} container direction="row" justifyContent="space-around">
                    <Button variant="contained" onClick={() =>nav('/dashboard')}>Dashboard</Button>
                    <Button variant="contained" onClick={() =>nav('/links')}>Create Another Url</Button>
                </Grid>
            </Container>:<>
            <Container>
                <Card variants="outlined" sx={{maxWidth :"40rem",mt:"15%",mx:"auto",width:"100%"}}>
                    <CardContent sx={{textAlign : "center"}}>
                    <Typography variant="h4">No Records Found</Typography>
                    </CardContent>
                    <CardActions >
                    <Button sx={{mx:"auto", width :"40%"}} variant="contained" onClick={() => nav('/links')}>Create One</Button>
                    </CardActions>
                </Card>
            </Container>
            </>}
        </>
    );
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 20
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
