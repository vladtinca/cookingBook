import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import './SubmitButton.css'

export default function SubmitButton() {

    const { color } = useTheme()
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => { setIsHover(true); };
    const handleMouseLeave = () => { setIsHover(false); };
    const boxStyle = { backgroundColor: isHover ? '#fff' : color, color: isHover ? color : '#fff', };

    return (
        <button className='submit'
            style={boxStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >Submit</button>
    )
}
