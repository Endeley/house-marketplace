/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, app } from '../firebase.config';
import shareIcon from '../assets/svg/shareIcon.svg';
import Spinner from '../component/Spinner';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore from 'swiper/core';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Listing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    //
    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth(app);

    //
    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId);
            const docShnap = await getDoc(docRef);

            //

            if (docShnap.exists()) {
                setListing(docShnap.data());
                setLoading(false);
            }
        };
        fetchListing();
    }, [navigate, params.listingId]);

    if (loading) {
        return <Spinner />;
    }

    //
    return (
        <main>
            <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} slidesPerView={1} pagination={{ clickable: true }}>
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                width: '100%',
                                height: '500px',

                                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                            className='swiperSlideDiv'></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className='shareIconDiv'
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShareLinkCopied(true);
                    setTimeout(() => {
                        setShareLinkCopied(false);
                    }, 2000);
                }}>
                <img src={shareIcon} alt='ShareIcon' />
            </div>

            {shareLinkCopied && <p className='linkCopied'>Link Copied</p>}

            <div className='listingDetails'>
                <p className='listingName'>
                    {listing.name} - €{listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p className='listingLocation'>{listing.location}</p>
                <p className='listingType'>For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
                {listing.offer && <p className='discountPrice'>€{listing.regularPrice - listing.discountedPrice} discount</p>}

                <ul className='listingDetailsList'>
                    <li>{listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : '1 bedroom'}</li>
                    <li>{listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : '1 bathroom'}</li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>
                <div className='listingLocationTitle'>Location</div>
                <div className='leafletContainer'>
                    <MapContainer style={{ height: '100%', width: '100%' }} center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png' />
                        <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
                        Contact Owner
                    </Link>
                )}
            </div>
        </main>
    );
};

export default Listing;
