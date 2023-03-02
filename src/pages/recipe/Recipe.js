import { useNavigate, useParams } from 'react-router-dom'
import './Recipe.css'
import { useTheme } from '../../hooks/useTheme.js'
import { useLiveDoc } from '../../hooks/useLiveDoc'
import Trashcan from '../../assets/delete.svg'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import React from 'react'

export default function Recipe() {
    const { mode } = useTheme()
    const { id } = useParams()
    const { data: recipe, isPending, error } = useLiveDoc('recipes', id)
    const navigate = useNavigate()


    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "recipes", id));
        navigate("/")
    }

    return (
        <div className={`recipe ${mode}`}>
            {error && <div>{error}</div>}
            {isPending && <div>Loading data...</div>}
            {recipe && (
                <React.Fragment key={recipe.id}>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <img className="delete-action"
                        alt="trashcan icon"
                        src={Trashcan}
                        onClick={() => handleDelete(id)}>
                    </img>
                    <p>Takes {recipe.cookingTime} to cook</p>
                    <ul>{recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}</ul>
                    <p className='method'>{recipe.method}</p>
                </React.Fragment>

            )}
        </div>

    )
}
