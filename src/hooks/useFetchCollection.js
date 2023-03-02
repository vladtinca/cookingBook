import { useState, useEffect } from "react"
import { db } from '../firebase/config.js'
import { collection, getDocs } from "firebase/firestore";

export const useFetchCollection = (what) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      setIsPending(true)
      try {
        const querySnapshot = await getDocs(collection(db, what));

        if (querySnapshot.empty) {
          setError(`No recipes to load`)
          setIsPending(false)
        } else {
          let results = []
          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results)
          setError(null)
          setIsPending(false)
        }
      } catch (err) {
        setIsPending(false)
        setError(err.message)
      }
    }

    fetchData()

  }, [what])

  return { data, isPending, error }
}