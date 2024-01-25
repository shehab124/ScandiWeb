import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ deleteHandler }) => {

    const navigate = new useNavigate();
    const addHandler = () => {
        navigate('/add-product')
    }

    return (
        <nav>
            <div className="navbar">
                <h1>Product List</h1>
                <div className='links'>
                    <button onClick={addHandler} className='buttons'>ADD</button>
                    <button onClick={deleteHandler} className='buttons' id="delete-product-btn">MASS DELETE</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;