import { useState, useEffect } from "react"
import { db } from '../firebase/config.js'
import { collection, onSnapshot } from "firebase/firestore";

export const useLiveCollection = (what) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        setIsPending(true)
        const unsub = onSnapshot(collection(db, what), (snapshot) => {


            if (snapshot.empty) {
                setError(`No recipes to load`)
                setIsPending(false)
            } else {
                let results = []
                snapshot.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                });
                setData(results)
                setError(null)
                setIsPending(false)
            }
        }, (err) => {
            setIsPending(false)
            setError(err.message)
        });

        return () => unsub()

    }, [what])

    return { data, isPending, error }
}