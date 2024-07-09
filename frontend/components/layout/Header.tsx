import React from 'react';
import {getMyUserData} from "@/data/services/get-my-user-data";

async function Header() {
    const user = await getMyUserData()
    const {email, username} = user.data
    console.log(email, username)
    return (
        <div className='flex justify-between items-center'>
            <div className="logo w-32">
                <img src='/Jobvite.svg' alt='logo'/>
            </div>
            <div>
                <span>{username}</span>
            </div>
        </div>
    );
}

export default Header;