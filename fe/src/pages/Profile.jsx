import React from "react";
import { validateNotLoggedInUser } from "../utility/protectRoutes";

const Profile = () =>{
    validateNotLoggedInUser();
    return(
        <div>
            Profile
        </div>
    )
}
export default Profile;