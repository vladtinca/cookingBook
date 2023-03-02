import { useState, useEffect } from "react"
import { db } from '../firebase/config.js'
import { doc, getDoc, getDocFromCache } from "firebase/firestore";

export const useFetchDoc = (what, id) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            setIsPending(true)

            try {
                const docSnap = await getDoc(doc(db, what, id));
                if (!docSnap.exists()) {
                    setError(`No recipes...`)
                    setIsPending(false)
                } else {
                    setData(docSnap.data())
                    setError(null)
                    setIsPending(false)
                }



            } catch (err) {
                setIsPending(false)
                setError(err.message)
                try {
                    const resultsCache = await getDocFromCache(doc(db, what, id));
                    setData(resultsCache)
                    setError(null)
                    setIsPending(false)

                    console.log("Cached document data:", doc.data());
                } catch (e) {
                    console.log("Error getting cached document:", e);
                }
            }

        }

        fetchData()

    }, [what, id])

    return { data, isPending, error }
}