import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig/fireauth";
import { signOut } from "firebase/auth";

function AdminNav() {
  return (
    <nav
      className="w-2/12 d-md-block text-white bg-gray-900  relative"
      style={{ minHeight: "100vh" }}
    >
      <div className="position-sticky pt-6">
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold text-gray-100">管理後台</h2>
          <p className="text-xs text-gray-400">Content Management System</p>
        </div>

        <ul className="nav flex-column space-y-1 px-3">
          <li className="nav-item">
            <Link
              to="/admin/work"
              className="nav-link py-3 px-3 rounded-md flex items-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              管理作品資料列表
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/category"
              className="nav-link py-3 px-3 rounded-md flex items-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              管理分類項目
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/lab"
              className="nav-link py-3 px-3 rounded-md flex items-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              管理LAB頁
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/managerheader"
              className="nav-link py-3 px-3 rounded-md flex items-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              管理Header
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <button
            onClick={() => signOut(auth)}
            className="w-full flex items-center justify-center py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            登出系統
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
