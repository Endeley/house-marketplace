import { Link } from 'react-router-dom';
import Slider from '../component/Slider';

import rentCategoryImage from '../assets/jpg/home1.jpg';
import saleCategoryImage from '../assets/jpg/home2.jpg';

function Explore() {
    return (
        <div className='explore'>
            <header>
                <p className='pageHeader'>Explore</p>
            </header>
            <main>
                <Slider />
                <p className='exploreCategoryHeading'>Categories</p>
                <div className='exploreCategories'>
                    <Link to='/categories/rent'>
                        <img src={rentCategoryImage} alt='rent' className='exploreCategoryImg' />
                        <p className='exploreCategoryName'>Places For Rent</p>
                    </Link>
                    <Link to='/categories/sale'>
                        <img src={saleCategoryImage} alt='sell' className='exploreCategoryImg' />
                        <p className='exploreCategoryName'>Places For Sell</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Explore;
