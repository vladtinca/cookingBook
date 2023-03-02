import './ThemeSelector.css'
import { useTheme } from "../hooks/useTheme.js"
import modeIconLight from '../assets/light_mode.svg'
import modeIconDark from '../assets/dark_mode.svg'


const themeColors = ["#52a53d", "#f08f9f", "#185ebb"]

export default function ThemeSelector() {
    const { changeColor, changeMode, mode } = useTheme()
    return (
        <div className='theme-selector'>
            <div className='hover'>
                <div className='theme-buttons'>
                    {themeColors.map((color) => (
                        <div key={color}
                            onClick={() => changeColor(color)}
                            style={{ background: color }}
                        />
                    ))}
                </div>
                <div className='modes'>
                    <img
                        src={modeIconLight}
                        alt='light mode button icon'
                        onClick={() => changeMode('light')}
                        style={{ filter: mode === 'dark' ? "invert(100%)" : 'invert(40%)' }}
                    ></img>
                    <img
                        src={modeIconDark}
                        alt='dark mode button icon'
                        onClick={() => changeMode('dark')}
                        style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(40%)' }}
                    ></img>
                </div>
            </div>
        </div >
    )
}
