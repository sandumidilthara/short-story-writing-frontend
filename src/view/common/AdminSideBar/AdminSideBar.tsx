
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: '/admin/main', label: 'Dashboard', icon: '📊' },
        { path: '/admin/category', label: 'Category' ,icon: '📖' },
        { path: '/admin/user', label: 'User',icon: '👥' },
        { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
    ];

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <nav className="h-full bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 shadow-xl border-r border-purple-100">
            <div className="mb-10">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    <span className="mr-2">⚡</span>
                    Admin Portal
                </div>



                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Control Panel
                </h2>
            </div>

            <ul className="space-y-3">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`group flex items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                location.pathname === item.path
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl border-l-4 border-purple-700'
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 hover:shadow-lg'
                            }`}
                        >
                            <div className={`p-2 rounded-lg mr-4 transition-all duration-300 ${
                                location.pathname === item.path
                                    ? 'bg-white/20'
                                    : 'bg-gradient-to-br from-purple-50 to-blue-50 group-hover:scale-110'
                            }`}>
                                <span className="text-lg">{item.icon}</span>
                            </div>
                            <span className="font-semibold">{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>


            <div className="mb-4">
                <button
                    onClick={handleBackClick}
                    className="group flex items-center p-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 hover:shadow-lg w-full"
                >
                    <div className="p-2 rounded-lg mr-3 transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50 group-hover:scale-110">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Back</span>
                </button>
            </div>

            <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">👑</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Admin</div>
                    <div className="text-sm text-gray-600">Super User</div>
                </div>
            </div>

        </nav>
    );
}