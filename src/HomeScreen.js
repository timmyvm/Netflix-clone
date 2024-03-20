import React from 'react';
import HomeScreenCSS from "./HomeScreen.css"
import Nav from './Nav';
import Banner from './Banner';

const HomeScreen = () => {
    return (
        <div className='homeScreen'>
            {/* Nav */}

            <Nav/>

            <Banner/>
            
            

            {/* Rows */}
        </div>
    );
}

export default HomeScreen;
