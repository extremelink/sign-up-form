import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export function validateLoggedInUser(){
    // logged in user redirect to home page
    const navigate = useNavigate()
    const {userInfo} = useContext(UserContext)
    if(userInfo){
        return navigate("/")
    }
}
export function validateNotLoggedInUser(){
    // not logged in user redirect to login page
    const navigate = useNavigate()
    const {userInfo} = useContext(UserContext)
    // debugger
    if(!userInfo){
        return navigate("/")
    }
}