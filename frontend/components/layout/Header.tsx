import React from 'react';
import {getMyUserData} from "@/data/services/get-my-user-data";
import { Button } from '../ui/button';
import { logoutAction } from '@/data/action/auth-action';
import { LogOutIcon } from 'lucide-react';
import LogoutButton from '../custom/LogoutButton';

async function Header() {
    const user = await getMyUserData()
    // const {email, username} = user.data
    console.log(user.data);
    return (
        <div className='flex justify-between items-center'>
            <div className="logo w-32">
                <img src='/Jobvite.svg' alt='logo'/>
            </div>
            <div>
                {/*<span>{username}</span>*/}
            </div>
            <LogoutButton/>
        </div>
    );
}

export default Header;