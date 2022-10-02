import React from "react"
import { Outlet } from "react-router-dom";

import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export interface RootLayoutProps {
	children?: React.ReactNode
}

const RootLayout = ({ children = <Outlet /> }: RootLayoutProps) => (
	<>
        <Header/>
		<Navbar />
		<main style={{minHeight: '100vh', minWidth: "100%"}}>{children}</main> 
		<Footer/>
	</>
)

export default RootLayout;// = React.memo(RootLayoutComponent)