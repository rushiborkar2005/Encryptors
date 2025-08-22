import React, { useState } from 'react';

import { Outlet } from 'react-router-dom'
import Footer from '../UI/Footer'
import Navbar from '../UI/Navbar'
import SignIn from '../UI/SignIn';

const AppLayout = () => {
    const [showSignIn, setShowSignIn] = useState(false);
  return (
    <div>
        <Navbar onSignInClick={() => setShowSignIn(true)} />
        <SignIn isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
        <Outlet />
        <Footer />
    </div>
  )
}

export default AppLayout
