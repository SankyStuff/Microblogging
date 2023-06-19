import Message from "@/components/message"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {auth,db} from '../utils/firebase'
import { toast } from "react-toastify"
import { Timestamp, arrayUnion, doc, getDoc, updateDoc, onSnapshot} from "firebase/firestore"







export default function Details()
{
const router = useRouter();
const routeData = router.query;
const [message, setMessage] = useState('')
const [allMessages, setAllMessages] = useState([]);
//Submit Comment
const submitMessage = async() => {
    if(!auth.currentUser) return router.push('/auth/login');

    if(!message){
        toast.error("Dont Leave an Empty Message",{ position: toast.POSITION.TOP_CENTER, autoClose:1500})
    }

    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
        comments: arrayUnion({
          message,
          avatar: auth.currentUser.photoURL,
          userName: auth.currentUser.displayName,
          time: Timestamp.now(),
        }),
      });
      setMessage("");


}

//Get Comments
const getComments =async ()=>{
    const docRef = doc(db, 'posts', routeData.id);
    const unsubscribe = onSnapshot(docRef,(snapshot) =>{
    setAllMessages(snapshot.data().comments);

});
return unsubscribe;
};
useEffect(()=>{
    
    if(!router.isReady) return;
    getComments();
},[router.isReady])







    return(
        <div>
            <Message {...routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e) => setMessage(e.target.value)} type="text" value={message} placeholder="Send a Message" className="bg-gray-800 w-full p-2 text-white text-sm"/>
                    <button onClick={submitMessage} className="bg-cyan-500 mx-5 w-25 rounded-lg py-2 px-4">Submit</button></div>
                    <div className="py-3 my-2">
                        <h2 className="font-bold">Comments</h2>
                         {allMessages?.map((message) => (
                            <div className="bg-grey-800 p-4 my-4 border-y" key={message.time}>
                                <div className="flex items-center gap-2 mb-4">
                                    <img className="w-10 rounded-full" src={message.avatar} alt=""/>
                                    <h2>{message.userName}</h2>
                                </div>
                                <h2>{message.message}</h2>
                            </div>
                        ))} 
                    </div>
            </div>


        </div>
    )

                    }