"use client"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const Hamburger = ({ showNavbar, handleToggleNavbar}) => {

    console.log(showNavbar, 'showNavbar')
    console.log(handleToggleNavbar, 'handleNavbar')

    return (
        <>
        {showNavbar ? (
            <CloseIcon onClick={handleToggleNavbar}/>
        ): (
            <MenuOpenIcon onClick={handleToggleNavbar}/>
        )}
        </>
    )
}

export default Hamburger;