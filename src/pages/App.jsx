import { Link } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import { useAuth } from "../auth/useAuth";


// src/App.jsx
const App = () => {
    const { user, authLoading } = useAuth();

    // Enquanto ainda está carregando o estado de auth, não decide redirecionar
    if (authLoading) {
        return <p>Carregando usuário...</p>; // ou um spinner bonitinho
    }

    return (
        <div>
            <Navbar />
            <div className="d-flex flex-wrap gap-2 mx-2 mt-2">
                {!user && <Link to="/usuarios/login" className="btn btn-primary d-inline">Entrar com Usuário</Link>}
                {!user && <Link to="/usuarios/register" className="btn btn-primary d-inline">Registrar Usuário</Link>}
                {user && <Link to="/vinhos" className="btn btn-primary d-inline">Vinhos</Link>}
                {user && <Link to="/vinhos/create" className="btn btn-primary d-inline">Criar Vinho</Link>}
            </div>

            <div className="container my-5 d-flex justify-content-center">
                <img src={`${import.meta.env.BASE_URL}3100.jpg`} alt="Banner Cellar" className="img-fluid rounded" style={{ maxHeight: 620 }} />
            </div>
        </div>
    )
}
export default App