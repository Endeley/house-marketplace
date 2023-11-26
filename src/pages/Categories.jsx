import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, startAfter, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../component/Spinner';

//
const Categories = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    //

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //  get refernce
                const listingsRef = collection(db, 'listings');

                // create query
                const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10));
                // / execute query

                const querySnap = await getDocs(q);
                if (querySnap.empty) {
                    console.log('No documents found.');
                } else {
                    querySnap.forEach((doc) => {
                        console.log(doc.data());
                    });
                } //
            } catch (error) {
                console.log(error);
            }
        };
        fetchListings();
    }, [params.categoryName]);

    //
    return <div>Categories</div>;
};

export default Categories;
