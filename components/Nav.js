import Link from "next/link";
import {auth} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'


export default function Nav(){


    const[user, loading]=useAuthState(auth);
    console.log(user);

return(
    <nav className="flex justify-between items-cemter py-10">
        

        <Link href="/">
        
        <button className="text-lg font-medium">Creative Minds</button>
        

        
        </Link>
    
        <ul className="flex items-center gap-10">
        
        
        {!user && (
            <div >
             {/* <a className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">    */}
            <Link href={"/auth/login"}>
            Join Now
            </Link>
             {/* </a>   */}
            </div>
            )}

        {user && (
<div className="flex item-center gap-6">
<Link href ="/post" className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg text-md "><button>Post</button></Link>
<Link href ="/dashboard"><img src={user.photoURL} alt=""  className ="w-12 rounded-full cursor-pointer"/></Link>

</div>

        )}


            </ul>
    </nav>
);

}