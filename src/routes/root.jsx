import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faWarehouse, faShoppingCart, faTruck, faFileAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";

export default function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Retrieve user role from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      console.log(user.role);
      setUserRole(user.role);
      setUserData(user);
    }
  }, []);

  return (
    <>
      <div className={`flex h-screen ${sidebarOpen ? "overflow-hidden" : ""}`}>
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? "" : "hidden"}`}>
          <div className="fixed inset-0 bg-green-600 bg-opacity-75" aria-hidden="true"></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-green-600"
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
              >
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-semibold text-gray-900">{userData?.name ? userData.name : "No Name"}</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <Link to="/dashboard" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-3 h-5 w-5 text-gray-900" />
                  Dashboard
                </Link>
                {(userRole === "manufacturer" || userRole === "admin") && (
                  <Link to="/products" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faWarehouse} className="mr-3 h-5 w-5 text-gray-900" />
                    Products
                  </Link>
                )}
                
                  <Link to="/orders" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-3 h-5 w-5 text-gray-900" />
                    Orders
                  </Link>
                
                {(userRole === "manufacturer" || userRole === "admin") && (
                  <Link to="/assets" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faTruck} className="mr-3 h-5 w-5 text-gray-900" />
                    Assets
                  </Link>
                )}
                {(userRole === "admin") && (
                  <Link to="/reports" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-3 h-5 w-5 text-gray-900" />
                    Reports
                  </Link>
                )}
                {(userRole === "admin") && (
                  <Link to="/settings" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faCog} className="mr-3 h-5 w-5 text-gray-900" />
                    Settings
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1">
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-green-100">
                <h1 className="text-xl font-semibold text-gray-900">{userData?.name ? userData.name : "No Name"}</h1>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-green-50 space-y-1">
                <Link to="/dashboard" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-3 h-5 w-5 text-gray-900" />
                  Dashboard
                </Link>
                {(userRole === "manufacturer" || userRole === "admin") && (
                  <Link to="/products" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faWarehouse} className="mr-3 h-5 w-5 text-gray-900" />
                    Products
                  </Link>
                )}
                
                  <Link to="/orders" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-3 h-5 w-5 text-gray-900" />
                    Orders
                  </Link>
                
                {(userRole === "manufacturer" || userRole === "admin") && (
                  <Link to="/assets" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faTruck} className="mr-3 h-5 w-5 text-gray-900" />
                    Assets
                  </Link>
                )}
                {(userRole === "admin") && (
                  <Link to="/reports" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-3 h-5 w-5 text-gray-900" />
                    Reports
                  </Link>
                )}
                {(userRole === "admin") && (
                  <Link to="/settings" className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                    <FontAwesomeIcon icon={faCog} className="mr-3 h-5 w-5 text-gray-900" />
                    Settings
                  </Link>
                )}
                <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
                className="group flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-green-100">
                  Logout
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
            <button
              className="px-4 border-r border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-900 md:hidden"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <input
                    id="search-field"
                    className="block w-full pl-10 pr-3 py-2 border border-transparent text-gray-900 placeholder-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </form>
              </div>
            </div>
          </div>
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
