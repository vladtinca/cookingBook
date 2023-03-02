import './Navbar.css'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useTheme } from '../hooks/useTheme'
import { useState } from 'react'


export default function Navbar() {
    const { color } = useTheme()

    //hover
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => { setIsHover(true); };
    const handleMouseLeave = () => { setIsHover(false); };
    const boxStyle = { backgroundColor: isHover ? '#fff' : "transparent", color: isHover ? color : '#fff', };

    return (
        <div className='navbar' style={{ background: color }}>
            <nav>
                <NavLink to="/" className='brand' >
                    <h1>Cooking Book</h1></NavLink>
                <SearchBar />
                <NavLink to="/create"
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >New Recipe</NavLink>
            </nav>
        </div >
    )
}
