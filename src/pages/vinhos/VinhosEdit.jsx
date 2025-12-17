import { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import VinhoEditForm from '../../components/vinhos/VinhoEditForm';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import { useAuth } from '../../auth/useAuth';

// Pega a API_BASE_URL da variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VinhosEdit = () => {
    // Pega o 'id' da URL, como você já fez.
    const { id } = useParams();

    // Estados para controlar os dados, o carregamento e possíveis erros.
    const [vinhoData, setVinhoData] = useState(null); // Armazena os dados do vinho
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, authLoading } = useAuth();
    const authFetch = useAuthFetch();

    // useEffect para buscar os dados da API quando o componente for montado ou o 'id' mudar.
    useEffect(() => {
        // Função async para realizar a busca
        const Vinho = async () => {
            // Reinicia os estados antes de uma nova busca
            setLoading(true);
            setError(null);

            try {
                const response = await authFetch(`${API_BASE_URL}vinho/${id}`);

                if (!response.ok) {
                    throw new Error('Não foi possível carregar os dados do vinho.');
                }

                const data = await response.json();
                setVinhoData(data); // Salva os dados no estado

            } catch (err) {
                setError(err.message); // Salva a mensagem de erro no estado

            } finally {
                setLoading(false); // Finaliza o carregamento, com sucesso ou erro
            }
        };

        Vinho();
    }, [id, authFetch]); // O array de dependências [id] garante que a busca será refeita se o id mudar

    // Enquanto ainda está carregando o estado de auth, não decide redirecionar
    if (authLoading) {
        return <p>Carregando usuário...</p>; // ou um spinner bonitinho
    }

    // Se não tiver usuário logado, redireciona declarativamente
    if (!user) {
        return <Navigate to="/usuarios/login" replace />;
    }

    if (loading) {
        return <p>Carregando formulário...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Erro: {error}</p>;
    }

    return (
        <div>
            <Navbar />
            <Link to="/vinhos" className="btn btn-primary mx-2 mt-2">Voltar</Link>
            <VinhoEditForm vinho={vinhoData} />
        </div>
    );
};

export default VinhosEdit;