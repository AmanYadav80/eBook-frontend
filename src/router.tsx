import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";

const router =  createBrowserRouter([
    {
        path : 'dashboard',
        element : <DashboardLayout/>,
        children : [
            {
                path : 'home',
                element : <HomePage/>
            },
            {
                path : 'books',
                element : <BooksPage/>
            }
        ]
    }, 
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/register',
        element : <Register/>
    }
]);

export default router;