//
import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase.config';

//
export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef();

    //
    useEffect(() => {
        if (isMounted) {
            const auth = getAuth(app);
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true);
                }
                setLoading(false);
            });
        }
        return () => {
            isMounted.current = false;
        };
    }, [isMounted]);
    return { loggedIn, loading };
};
