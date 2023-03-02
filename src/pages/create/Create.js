import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Create.css'
import { useTheme } from '../../hooks/useTheme.js'
import SubmitButton from '../../components/SubmitButton'
import { db } from '../../firebase/config.js'
import { addDoc, collection } from 'firebase/firestore'

export default function Create() {
    const { mode } = useTheme()
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)
    const navigate = useNavigate()

    const resetFrom = () => {
        setTitle('')
        setMethod('')
        setCookingTime('')
        setNewIngredient('')
        setIngredients([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await addDoc(collection(db, "recipes"), { title, ingredients, method, cookingTime: cookingTime + " minutes" });
        resetFrom()
        if (data) { navigate("/") }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()
        if (ing && !ingredients.includes(ing)) {
            setIngredients((prevIngredients) => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
        ingredientInput.current.removeAttribute("required")
    }

    //hover
    const { color } = useTheme()
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => { setIsHover(true); };
    const handleMouseLeave = () => { setIsHover(false); };
    const boxStyle = { backgroundColor: isHover ? '#fff' : color, color: isHover ? color : '#fff', };

    return (
        <div className={`create ${mode}`}>
            <h2 className='page-title'>Add Recipe</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    <span>Title</span>
                    <input required type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label>
                    <span>Ingredients</span>
                    <div className='ingredients'>
                        <input required type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button className='btn' onClick={handleAdd}
                            style={boxStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >Add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>
                <label>
                    <span>Method</span>
                    <textarea required type="text"
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}

                    />
                </label>
                <label className='time'>
                    <span>Cooking Time (minutes):</span>
                    <input required type="number" min="0"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                    />
                </label>
                <SubmitButton />
            </form>
        </div>
    )
}
