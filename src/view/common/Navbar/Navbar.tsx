import {Link} from "react-router-dom";
import {useEffect, useState} from "react";




export  function Navbar() {





    const [userrole , setUserRole]  = useState<string | null>(null);
    useEffect(()=>{



        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            const role = userInfo.role;
            setUserRole(role)// "USER"
        }


    } , [])


    return (


        <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="relative">
                            <span className="text-3xl mr-2">📚</span>
                            <div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                        </div>
                        <span
                            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">StoryVerse</span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="/"
                           className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Home
                            </a>
                        <a href="/startWriting"
                           className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Start
                            Writing</a>
                        {/*<a href="/seeStories"*/}
                        {/*   className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">See*/}
                        {/*    Stories</a>*/}

                        <a href="/myStories"
                           className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">My
                            Stories</a>
                        <a href="/rules"
                           className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Rules & Policies
                            </a>

                        { userrole === "ADMIN" ? (
                            <a href="/admin"
                               className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Go To
                                Dashboard</a>
                        ) : (
                            <p>

                            </p> )}

                    </div>
                    <div className="flex space-x-4">
                        <Link to="/login">
                            <button
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300">Sign
                            In
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

    );
}


