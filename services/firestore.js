import {collection,doc ,getDoc,getDocs,setDoc,deleteDoc,updateDoc} from 'firebase/firestore'
import {db} from '../instances/firebase'


function dbService(collectionName){
  const Collection =collectionName
  return {
    get,
    set,
    update,
    remove,
  }
  function get(docName){
  return new Promise(async (resolve,reject)=>{
    try{
      let ref = collection(db,Collection)
      let result;
      let data
      if(docName){
        ref = doc(ref,docName)
        result = await getDoc(ref)
        data = result.data()
      }else{
        result = await getDocs(ref)
        data = result.docs.map(doc=>doc.data())
      }
      resolve(data)
    }catch(error){
      reject(data)
    } 
  })
  }

  function set(docName,data){
    return new Promise(async (resolve,reject)=>{
      try{
        const ref = doc(db,Collection,docName)
        await setDoc(ref,data)
        resolve(true)
      }catch(error){
        reject(error)
      }
    }) 
  }

  async function update(docName,data){
    return new Promise(async (resolve,reject)=>{
      try{
        const ref = doc(db,Collection,docName)
        await updateDoc(ref,data)
        resolve(true)
      }catch(error){
        reject(error)
      }
    })
  }

  async function remove(docName){
    return new Promise(async (resolve,reject)=>{
      try{
        const ref = doc(db,Collection,docName)
        await deleteDoc(ref)
        resolve(true)
      }catch(error){
        reject(error)
      }
    })
  } 
}

export default  {
  contactService:dbService('contact')
}

