import { useState, useEffect } from "react"
import { db } from '../firebase/config.js'
import { doc, onSnapshot } from "firebase/firestore";

export const useLiveDoc = (what, id) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        setIsPending(true)
        const unsub = onSnapshot(doc(db, what, id), (snapshot) => {

            if (snapshot.empty) {
                setError(`No recipe to load`)
                setIsPending(false)
            } else {
                setData(snapshot.data())
                setError(null)
                setIsPending(false)
            }
        }, (err) => {
            setIsPending(false)
            setError(err.message)
        });

        return () => unsub()

    }, [what, id])

    return { data, isPending, error }
}