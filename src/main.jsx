import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import App from './pages/App.jsx'
import Sobre from './pages/Sobre.jsx';
import Contato from './pages/Contato.jsx';

import VinhosIndex from './pages/vinhos/VinhosIndex.jsx';
import VinhosCreate from './pages/vinhos/VinhosCreate.jsx';
import VinhosShow from './pages/vinhos/VinhosShow.jsx';
import VinhosEdit from './pages/vinhos/VinhosEdit.jsx';

import UsuariosLogin from './pages/usuarios/UsuariosLogin.jsx';
import UsuariosRegister from './pages/usuarios/UsuariosRegister.jsx';
import { AuthProvider } from './auth/AuthContext.jsx'

const router = createBrowserRouter(
    [
        { path: "/", element: <App /> },
        { path: "/sobre", element: <Sobre /> },
        { path: "/contato", element: <Contato /> },

        { path: "/vinho", element: <VinhosIndex /> },
        { path: "/vinho/create", element: <VinhosCreate /> },
        { path: "/vinho/:id", element: <VinhosShow /> },
        { path: "/vinho/:id/edit", element: <VinhosEdit /> },

        { path: "/usuario/login", element: <UsuariosLogin /> },
        { path: "/usuario", element: <UsuariosRegister /> },
    ]
);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
