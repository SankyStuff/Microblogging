export default function Message({children, avatar, username, description})
{return(
    <div className="bg-black  p-8 rounded-lg text-white space-y-1 border-2 my-4">
        <div className="flex items-center gap-2">
            <img src = {avatar} className="w-10 rounded-full"/>
            <h2>{username}</h2>
        </div>
        <div className="py-4">
            <p>{description}</p>


        </div>
        {children}
    </div>
)}