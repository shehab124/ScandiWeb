import { Link } from 'react-router-dom'

const Navbar = ({ submitHandler, selectProductType }) => {
    return (
        <nav>
            <div className="navbar">
                <h1>Product Add</h1>
                <div className='links'>
                    <button onClick={submitHandler} disabled={!selectProductType} style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px' }}>Save</button>
                    <button style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px' }}>Cancel</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;