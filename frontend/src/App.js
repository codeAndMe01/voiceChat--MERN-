import './App.css';

import React from 'react';
import { BrowserRouter as Router,Routes, Route , Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';  // Correct the component name to start with a capital letter

import Navigation from './components/shared/Navigation/Navigation';


import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';





function App() {
  return (
    <Router>  {/* Correct the component name to BrowserRouter */}
      
      <Navigation />
    
     <Routes>


     <Route
          path="/"
          element={<GuestRoute><Home /></GuestRoute>}
        />

     <Route
          path="/authenticate"
          element={<GuestRoute><Authenticate /></GuestRoute>}
        />

        <Route
        path="/activate"
        element = {<SemiProtectedRoute> <Activate /> </SemiProtectedRoute> }
        />

        <Route
        path="/rooms"
        element = {<ProtectedRoute> <Rooms /> </ProtectedRoute> }
        />

     </Routes>
      
    </Router>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  const {isAuth} = useSelector((state) => state.auth)

  return !isAuth ? children : <Navigate to="/rooms" replace state={{ from: rest.location }} />;
};

const SemiProtectedRoute = ({children , ...rest}) =>{
  const {user,isAuth} = useSelector((state) => state.auth)
  //ternary operator 

  return (
     !isAuth ? (<Navigate to="/" replace state={{ from: rest.location }} /> )
     : isAuth && !user.activated ? (children) : ( <Navigate to="/rooms" replace state={{ from: rest.location }} />)
  )

}

const ProtectedRoute = ({children , ...rest}) =>{
  const {user,isAuth} = useSelector((state) => state.auth)
   
  //ternary operator 

  return (
     !isAuth ? (<Navigate to="/" replace state={{ from: rest.location }} /> )
     : isAuth && !user.activated ?  ( <Navigate to="/activate" replace state={{ from: rest.location }} />) : (children) 
  )

}

export default App;