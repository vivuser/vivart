"use client"
import { useState } from "react";
import Hamburger from "./Hamburger";
import MainNavbar from "./MainNavbar";

const NavbarWrapper = ({ children }) => {
    const [showNavbar, setShowNavbar] = useState(false);

    const handleToggleNavbar = () => {
        setShowNavbar(!showNavbar)
    };

    return  (
        <div>
            <Hamburger showNavbar={showNavbar} handleToggleNavbar={handleToggleNavbar}/> 
            {/* <MainNavbar showNavbar={showNavbar}/> */}
            {children}
        </div>
    )
}

export default NavbarWrapper;