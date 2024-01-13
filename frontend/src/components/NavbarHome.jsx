import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <h1>Product List</h1>
                <div className='links'>
                    <Link to='/add-product'>ADD</Link>
                    <button style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px' }}>MASS DELETE</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;