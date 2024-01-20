import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ submitHandler, selectProductType }) => {

    const navigate = new useNavigate();

    const handleCancel = () => navigate('/');


    return (
        <nav>
            <div className="navbar">
                <h1>Product Add</h1>
                <div className='links'>
                    <button onClick={submitHandler} disabled={!selectProductType} style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px' }}>Save</button>
                    <button
                        style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px' }}
                        onClick={handleCancel}
                    >
                        Cancel</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;