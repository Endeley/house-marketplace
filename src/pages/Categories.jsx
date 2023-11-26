import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, startAfter, limit, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../component/ListingItem';
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
                const listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                //
                console.log(listings);
                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('Could not fetch listings');
            }
        };
        fetchListings();
    }, [params.categoryName]);

    //
    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>{params.categoryName === 'rent' ? 'Place For Rent' : 'Place For Sale'}</p>
            </header>
            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='categoryListings'>
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p>No Listings for {params.categoryName} Yet</p>
            )}
        </div>
    );
};

export default Categories;
