import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import './Header.css'


export default function Header(){
    return (
        <header className='header'>
            <img src="https://colombiafintech.co/static/uploads/unnamed%201.png" alt="Logo paynet" className='header-img' />
            <div className='header-group-icons'>
                <IconButton>
                    <NotificationsNoneIcon className='header-notification-icon'/>
                </IconButton>
                <span>Username</span>
                <IconButton>
                    <AccountCircleIcon className='header-account-icon'/>
                </IconButton>
            </div>
        </header>
    )
}
