import React, { useEffect, useState } from 'react'
import { useAuthFetch } from '../../auth/useAuthFetch';
import { useAuth } from '../../auth/useAuth';
import { Link, Navigate } from 'react-router-dom';

const VinhosIndex = () => {
    const [vinhos, setVinhos] = useState([]);
    const authFetch = useAuthFetch();
    const auth = useAuth();

    useEffect(() => {
        // cria uma função
        const vinhosFetch = async () => {
            try {
                // Requisição para rota protegida 
                const res = await authFetch("http://localhost:3000/vinho");
                if (!res.ok)
                    throw new Error("Algo errado aconteceu");
                console.log("deu tudo certo");
                const data = await res.json();
                setVinhos(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        vinhosFetch(); // chama a função a primeira vez
    }, []);

    // Enquanto ainda está carregando o estado de auth, não decide redirecionar
    if (auth.authLoading) {
        return <p>Carregando usuário...</p>; // ou um spinner bonitinho
    }

    // Se não tiver usuário logado, redireciona declarativamente
    if (!auth.user) {
        return <Navigate to="/usuario/login" replace />;
    }

    return (
        <div>
            <Link to="/vinhos/create" className="btn btn-primary">Criar Vinho</Link>
            {
                vinhos.map(
                    vinho =>
                        <div key={vinho.id}>
                            {vinho.id} - {vinho.nome} - {vinho.produtor}
                        </div>
                )
            }
        </div>
    )
}

export default VinhosIndex