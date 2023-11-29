//  imports
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

//
const Contact = () => {
    const [message, setMessage] = useState('');
    const [owner, setOwner] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    //

    const params = useParams();

    //

    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(db, 'users', params.ownerId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setOwner(docSnap.data());
            } else {
                toast.error('Could not get owner Data');
            }
        };

        getOwner();
    }, [params.ownerId]);

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    // returns
    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Contact Owner</p>
            </header>
            {owner !== null && (
                <main>
                    <div className='contatctLandlord'>
                        <p className='landlordName'>Contact {owner?.name}</p>
                    </div>
                    <form className='messageForm'>
                        <div className='messageDiv'>
                            <label htmlFor='message' className='messageLabel'>
                                Message
                            </label>
                            <textarea placeholder='Enter Your Message Here' name='message' className='textarea ' id='message' value={message} onChange={onChange}></textarea>
                        </div>
                        <a href={`mailto:${owner.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type='button' className='primaryButton'>
                                Send Message
                            </button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    );
};

export default Contact;
