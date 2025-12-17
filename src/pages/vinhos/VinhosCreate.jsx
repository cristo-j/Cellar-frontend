import { useAuth } from '../../auth/useAuth';
import Navbar from '../../components/shared/Navbar'
import VInhoFormCreate from '../../components/vinhos/VinhoFormCreate'
import { Link, Navigate } from 'react-router-dom';

const VInhosCreate = () => {
    const { user, authLoading } = useAuth();

    // Enquanto ainda está carregando o estado de auth, não decide redirecionar
    if (authLoading) {
        return <p>Carregando usuário...</p>; // ou um spinner bonitinho
    }

    // Se não tiver usuário logado, redireciona declarativamente
    if (!user) {
        return <Navigate to="/usuarios/login" replace />;
    }

    return (
        <div>
            <Navbar />
            <Link to="/vinhos" className='btn btn-primary mx-2 mt-2'>Voltar</Link>
            <VInhoFormCreate />
        </div>
    )
}

export default VInhosCreate