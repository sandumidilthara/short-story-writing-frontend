import { Link } from "react-router-dom";
export  function Navbar() {

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
                        <a href="/contact"
                           className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Contact
                            Us</a>

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