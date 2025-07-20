

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-2">📚</span>
                            <span className="text-2xl font-bold">StoryVerse</span>
                        </div>
                        <p className="text-gray-400 mb-4">Empowering writers to share their stories and build successful
                            careers.</p>
                        <div className="flex space-x-4">
                            <div className="bg-purple-600 p-2 rounded-lg">
                                <span className="text-lg">❤️</span>
                            </div>
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <span className="text-lg">👥</span>
                            </div>
                            <div className="bg-green-600 p-2 rounded-lg">
                                <span className="text-lg">🌍</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition duration-300">Writing Tools</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Publishing</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Analytics</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Monetization</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Community</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition duration-300">Writer Forums</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Writing Challenges</a>
                            </li>
                            <li><a href="#" className="hover:text-white transition duration-300">Success Stories</a>
                            </li>
                            <li><a href="#" className="hover:text-white transition duration-300">Events</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition duration-300">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Writing Guide</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 StoryVerse. Empowering writers worldwide.</p>
                </div>
            </div>
        </footer>
    );
}