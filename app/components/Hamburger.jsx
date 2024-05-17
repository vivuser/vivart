"use client"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Hamburger = ({ showNavbar, handleToggleNavbar}) => {

    console.log(showNavbar, 'showNavbar')
    console.log(handleToggleNavbar, 'handleNavbar')

    return (
        <>
        {showNavbar ? (<>
            <CloseIcon onClick={handleToggleNavbar}/>
            <Sidebar isOpen={showNavbar} onClose={handleToggleNavbar}/>
            </>
        ): (
            <MenuOpenIcon onClick={handleToggleNavbar} className=' m-1   md:hidden'/>
        )}
        </>
    )
}

export default Hamburger;