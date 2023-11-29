import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from './Spinner';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

//
const Slider = () => {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    //
    const navigate = useNavigate();

    //

    useEffect(() => {
        //  fetch listing on main page slider
        const explorSlide = async () => {
            const listingsRef = collection(db, 'listings');
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
            const querySnap = await getDocs(q);

            //
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setListings(listings);
            setLoading(false);
        };
        explorSlide();
    }, []);
    if (loading) {
        return <Spinner />;
    }

    return (
        listings && (
            <>
                <p className='exploreHeading'>Recommended</p>
                <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                    {listings.map(({ data, id }) => (
                        <SwiperSlide key={id} onClick={() => navigate(`/categories/${data.type}/${id}`)}>
                            <div style={{ width: '100%', height: '800px', background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: 'cover' }} className='swiperSlideDiv'>
                                <p className='swiperSlideText'>{data.name}</p>
                                <p className='swiperSlidePrice'>
                                    {' '}
                                    € {data.discountPrice ?? data.regularPrice} {data.type === 'rent' && ' / Month'}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    );
};

export default Slider;
