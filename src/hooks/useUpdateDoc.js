import { doc, updateDoc } from "firebase/firestore";

export default function useUpdateDoc(what, id, object) {

  const pushUpdate = async () => {
    await updateDoc(doc(db, what, id), { object });
  }

  pushUpdate()

  return {}

}
