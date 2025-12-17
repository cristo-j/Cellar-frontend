import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";

import App from './pages/App.jsx'
import Sobre from './pages/Sobre.jsx'
import Contato from './pages/Contato.jsx';

import VinhosIndex from './pages/vinhos/VinhosIndex.jsx';
import VinhosCreate from './pages/vinhos/VinhosCreate.jsx';
import VinhosShow from './pages/vinhos/VinhosShow.jsx';
//import VinhosEdit from './pages/vinhos/VinhosEdit.jsx';

import UsuariosLogin from './pages/usuarios/UsuariosLogin.jsx';
import UsuariosRegister from './pages/usuarios/UsuariosRegister.jsx';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const router = createHashRouter([
    { path: "/", element: <App /> },
    { path: "/sobre", element: <Sobre /> },
    { path: "/contato", element: <Contato /> },
    
    { path: "/vinhos", element: <VinhosIndex /> },
    { path: "/vinhos/create", element: <VinhosCreate /> },
    { path: "/vinhos/:id", element: <VinhosShow /> },
//    { path: "/vinhos/:id/edit", element: <VinhosEdit /> },

    { path: "/usuarios/login", element: <UsuariosLogin /> },
    { path: "/usuarios/register", element: <UsuariosRegister /> },
]);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)