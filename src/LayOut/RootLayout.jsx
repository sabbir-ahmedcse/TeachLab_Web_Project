import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'
import Banner from '../Components/Banner'

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <aside>
                <Outlet></Outlet>
               
            </aside>
            <section>
                <Footer></Footer>
            </section>
        </div>
    )
}

export default RootLayout