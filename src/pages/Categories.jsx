import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../component/ListingItem';
import Spinner from '../component/Spinner';

//
const Categories = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);
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
    }, [params.categoryName]);

    //
    // pagination / loadmore
    const fetchMoreListings = async () => {
        try {
            //  get refernce
            const listingsRef = collection(db, 'listings');

            // create query
            const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), startAfter(lastFetchedListing), limit(10));
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
                    <br />
                    <br />
                    {lastFetchedListing && (
                        <p className='loadMore' onClick={fetchMoreListings}>
                            Load More
                        </p>
                    )}
                </>
            ) : (
                <p>No Listings for {params.categoryName} Yet</p>
            )}
        </div>
    );
};

export default Categories;
