import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import Register from './user-Register'
import ResetForm from './newpassword'
import Passwordreset from './passwordreset'
import Dashboard_Check from './dashboard'
import Links from './links'
import SuccessCard from './passwordsuccess'
import ActivationCard from './activation'
import Table_check from './table'
export default function Routing(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/signup" element={<Register/>}></Route>
                    <Route path="/forgetpassword" element={<Passwordreset/>}></Route>
                    <Route path="/resetpassword/:id" element={<ResetForm/>}></Route>
                    <Route path="/success" element={<SuccessCard/>}></Route>
                    <Route path="/activated" element={<ActivationCard/>}></Route>
                    <Route path="/dashboard" element={<Dashboard_Check/>}></Route>
                    <Route path="/links" element={<Links/>}></Route>
                    <Route path="/table" element={<Table_check/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}