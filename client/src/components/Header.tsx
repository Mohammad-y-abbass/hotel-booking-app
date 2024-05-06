import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='py-6 bg-blue-800'>
      <div className='container flex items-center justify-between mx-auto'>
        <span className='text-3xl font-bold tracking-tight text-white'>
          <Link to='/'>Booking App</Link>
        </span>
        <span className='flex space-x-2'>
          {isLoggedIn ? (
            <>
              <Link to='/my-bookings'>My Bookings</Link>
              <Link to='/my-hotels'>My Hotels</Link>
              <button>Sign out</button>
            </>
          ) : (
            <Link
              to='/sign-in'
              className='flex items-center px-3 font-bold text-blue-600 bg-white hover:bg-gray-100'
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
