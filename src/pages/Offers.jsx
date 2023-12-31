import { useState, useEffect } from 'react';

import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../component/ListingItem';
import Spinner from '../component/Spinner';

//
const Offers = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);
    // eslint-disable-next-line no-unused-vars

    //

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //  get refernce
                const listingsRef = collection(db, 'listings');

                // create query
                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10));

                //

                const querySnap = await getDocs(q);
                //
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListing(lastVisible);
                //
                const listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                //

                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('Could not fetch listings');
            }
        };
        fetchListings();
    }, []);

    //

    const fetchMoreListings = async () => {
        try {
            //  get refernce
            const listingsRef = collection(db, 'listings');

            // create query
            const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), startAfter(lastFetchedListing), limit(10));
            // / execute query

            const querySnap = await getDocs(q);
            //

            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedListing(lastVisible);

            //
            const listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            //

            setListings((prevState) => [...prevState, ...listings]);
            setLoading(false);
        } catch (error) {
            toast.error('Could not fetch listings');
        }
    };

    //
    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>Offers</p>
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
                    <br />
                    <br />
                    {lastFetchedListing && (
                        <p className='loadMore' onClick={fetchMoreListings}>
                            Load More
                        </p>
                    )}
                </>
            ) : (
                <p>There are no current Offers </p>
            )}
        </div>
    );
};

export default Offers;
