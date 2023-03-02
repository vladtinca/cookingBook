
import RecipeList from '../../components/RecipeList.js'
import { useLiveCollection } from '../../hooks/useLiveCollection.js'

//style
import './Home.css'


export default function Home() {
    const { data: recipes, isPending, error } = useLiveCollection('recipes')

    return (
        <div className='home'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading data..</div>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}
