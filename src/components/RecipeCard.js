import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import './RecipeCard.css'
import Trashcan from '../assets/delete.svg'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function RecipeCard({ recipe }) {
    const { mode, color } = useTheme()
    //hover
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => { setIsHover(true); };
    const handleMouseLeave = () => { setIsHover(false); };
    const boxStyle = { backgroundColor: isHover ? color : '#dfdfdf', color: isHover ? '#fff' : '', };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "recipes", id));
    }

    return (
        <div className={`card ${mode}`}>
            <h3 >{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method.substring(0, 75)}...</div>
            <div className="commands">
                <img className="delete-action"
                    alt="trashcan icon"
                    src={Trashcan}
                    onClick={() => handleDelete(recipe.id)}>
                </img>
                <Link to={`/recipes/${recipe.id}`}
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >Cook This...</Link>

            </div>

        </div>
    )
}



