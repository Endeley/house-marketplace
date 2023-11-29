//
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './component/PrivateRoute';
import Categories from './pages/Categories';
import Listing from './pages/Listing';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';

//
//
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Explore />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route path='/categories/:categoryName' element={<Categories />} />
                    <Route path='/categories/:categoryName/:listingId' element={<Listing />} />
                    <Route path='/edit-listing/:listingId' element={<EditListing />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/create-listing' element={<CreateListing />} />
                    <Route path='/contact/:ownerId' element={<Contact />} />
                    <Route path='/sign-up' element={<SignUp />} />
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
