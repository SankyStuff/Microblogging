import {auth, db} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import Message from '@/components/message'
import {BsTrash2Fill} from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';
import Link from 'next/link';

import {collection, query, where, onSnapshot, orderBy, deleteDoc, doc} from "firebase/firestore"

export default function Dashboard()
{
    const route = useRouter();
    const[user, loading] = useAuthState(auth);
    const[posts, setPosts] = useState([])
//    console.log(user);

    const getData = async () =>{
        if (loading) return;
        if (!user) return route.push("/auth/login");
        console.log("RUN!");
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot =>{
            setPosts(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }));
        return unsubscribe;
    };



    //Delete Post
    const deletePost = async(id) =>{
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);

    };

    //EditPost 


    //Get User Data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return(


        <div>
            <h1>Your Post</h1>
            <div>{posts.map(post => {
                return(
                <Message{...post} key={post.id}>
                
                <div className='flex gap-4'>
                    <button className='text-pink-600 flex item-center justify-center gap-2 py-2 text-sm' onClick={()=>deletePost(post.id)}><BsTrash2Fill className='text-2xl'/>Delete</button>
                    <Link href={{pathname: "/post", query:post}}>
                        <button className='text-teal-600 flex item-center justify-center gap-2 py-2 text-sm'><AiFillEdit className='text-2xl'/>Edit</button>
                        </Link>
                    </div>
                

                </Message>)
            })}</div>


            <button className='font-medium text-white bg-gray-800 py-2 px-4 my-10' onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )


}