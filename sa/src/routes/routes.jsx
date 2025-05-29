import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import PaginaReview from '../pages/PaginaReview';
import CadastroPlataforma from '../pages/CadastroPlataforma';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import Home from '../pages/Home';

const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/registro", element: <Registro /> },
    { path: "/paginareview", element: <PaginaReview /> },
    { path: "/cadastroplataforma", element: <CadastroPlataforma /> },
    { path: "/login", element: <Login /> },
    { path: "/perfil", element: <Profile /> },
    { path: "/Home", element: <Home />},
]);

export default router;