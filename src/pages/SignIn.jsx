//
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { app } from '../firebase.config';
import OAuth from '../component/OAuth';

//
function SignIn() {
    //
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const navigate = useNavigate();
    //
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                navigate('/');
            }
        } catch (error) {
            toast.error('Wrong User Credentials');
        }
    };

    //
    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>

                <form onSubmit={onSubmit}>
                    <input type='text' className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />
                    <div className='passwordInputDiv'>
                        <input type={showPassword ? 'text' : 'password'} className='passwordInput' id='password' placeholder='password' value={password} onChange={onChange} />
                        <img className='showPassword' src={visibilityIcon} alt='show password' onClick={() => setShowPassword((prevState) => !prevState)} />
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot Password ..?
                    </Link>
                    <div className='signInBar'>
                        <p className='signInText'>Sign In</p>
                        <button className='signInButton'>
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
                <OAuth />
                <Link to='/sign-up' className='registerLink'>
                    Sign Up Instead...
                </Link>
            </div>
        </>
    );
}

export default SignIn;
