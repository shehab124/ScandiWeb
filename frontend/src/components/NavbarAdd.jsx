import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ submitHandler, selectProductType }) => {

    const navigate = new useNavigate();

    const handleCancel = () => navigate('/');

    return (
        <nav>
            <div className="navbar">
                <h1>Product Add</h1>
                <div className='links'>
                    <button onClick={submitHandler} className='buttons'>Save</button>
                    <button
                        className='buttons'
                        onClick={handleCancel}
                    >
                        Cancel</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;