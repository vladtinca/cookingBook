
import RecipeCard from './RecipeCard'
import './RecipeList.css'


export default function RecipeList({ recipes }) {
    if (recipes.length === 0)
        return (<div className='error'>No recipes found...</div>)
    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}
