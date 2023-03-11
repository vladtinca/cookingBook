//styles
import './Search.css'

import { useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.js'
import { useFetchCollection } from "../../hooks/useFetchCollection.js"
import RecipeList from '../../components/RecipeList'
export default function Search() {

    const { mode } = useTheme()
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const search = queryParams.get('q')
    const recipes = []

    const { data } = useFetchCollection('recipes')

    if (data) {

        data.forEach((doc) => {
            for (const [key, value] of Object.entries(doc)) {
                if (typeof (value) == "string") {
                    if (value.toLowerCase().includes(search.toLowerCase())) {
                        recipes.push(doc)
                        break
                    }
                }
                else if (typeof (value) == "object") {
                    let i = ""
                    for (const [key, nvalue] of Object.entries(value)) {
                        i = i + nvalue.toLowerCase()
                    }
                    if (i.includes(search.toLowerCase())) {
                        recipes.push(doc)
                        break
                    }



                }
            }
        })

    }

    //. ?q=something
    return (
        <div className={`search-page ${mode}`}>
            <h2 className="page-stitles">Recipes including "{search}"</h2>
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}
