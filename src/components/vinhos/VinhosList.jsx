// src/components/VinhosList.jsx

import { useState, useEffect } from "react";
import Vinho from "./Vinhos";
import { useAuthFetch } from "../../auth/useAuthFetch";
import Toast from "../shared/Toast";
import VinhosListFilter from "./VinhosListFilter";

// Pega a API_BASE_URL da variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function filtrarPorTipo(lista, tipo) {
    if (!tipo) return lista; // "" = todos
    return lista.filter((ch) => ch.tipo === tipo);
}

const VinhosList = () => {
    // Lê cache do localStorage (se existir)
    let vinhosCache = null;
    try {
        vinhosCache = JSON.parse(localStorage.getItem("vinhosCache"));
    } catch {
        vinhosCache = null;
    }

    // filtro salvo em localStorage como string simples ("", "a", "f")
    let tipoSelecionadoCache = localStorage.getItem(
        "vinhosTipoSelecionadoCache"
    );
    if (tipoSelecionadoCache === null) {
        tipoSelecionadoCache = "a"; // padrão = "Abertos"
    }

    // Fonte de verdade: lista completa
    const [allVinhos, setAllVinhos] = useState(vinhosCache ?? []);

    // Filtro selecionado pelo usuário
    const [tipoFilter, setTipoFilter] = useState(tipoSelecionadoCache); // "", "a", "f"

    const [loading, setLoading] = useState(vinhosCache ? false : true);
    const [error, setError] = useState(null);

    const authFetch = useAuthFetch();

    // 1) Efeito para BUSCAR os vinhos da API periodicamente
    useEffect(() => {
        const abortController = new AbortController();

        const fetchVinhos = async () => {
            try {
                const res = await authFetch(`${API_BASE_URL}/vinho`, {
                    method: "GET",
                    signal: abortController.signal,
                });
                if (!res.ok) {
                    const body = await res.json().catch(() => null); // se não for JSON, ignora
                    throw new Error(`Erro HTTP: ${res.status}. ${body?.erro ?? ``}`);
                }
                if (res.status === 304) return;

                const data = await res.json();

                // Atualiza a fonte de verdade e o cache bruto
                setAllVinhos(data);
                localStorage.setItem("vinhosCache", JSON.stringify(data));
            } catch (error) {
                if (error?.name === "AbortError") return;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVinhos();
        const interval5secs = setInterval(fetchVinhos, 5000);

        return () => {
            abortController.abort();
            clearInterval(interval5secs);
        };
    }, [authFetch]);

    // Lista exibida em tela é DERIVADA (não é tipo próprio)
    const vinhosVisiveis = filtrarPorTipo(allVinhos, tipoFilter);

    // Quando o usuário troca o filtro no <VinhosListFilter>
    const handleFilterChange = (novoTipo) => {
        setTipoFilter(novoTipo);
        // salva o valor cru, sem JSON.stringify
        localStorage.setItem("vinhosTipoSelecionadoCache", novoTipo);
    };

    // Vinho alterado (ex.: mudou tipo de "a" para "f")
    const onVinhoTipoChange = (vinhoAlterado) => {
        setAllVinhos((prev) => {
            const novaLista = prev.map((ch) => {
                // Insere o nome que o patch não devolve
                if( ch.id === vinhoAlterado.id )
                {
                    vinhoAlterado.nome = ch.nome
                    return vinhoAlterado 
                }
                return ch
            }
            );
            localStorage.setItem("vinhosCache", JSON.stringify(novaLista));
            return novaLista;
        });
    };

    // Vinho deletado
    const onVinhoDelete = (vinhoDeletadoId) => {
        setAllVinhos((prev) => {
            const novaLista = prev.filter((ch) => ch.id !== vinhoDeletadoId);
            localStorage.setItem("vinhosCache", JSON.stringify(novaLista));
            return novaLista;
        });
    };

    if (loading) {
        return <p>Carregando vinhos...</p>;
    }

    return (
        <div>
            {error && <Toast error={error} setError={setError} />}

            <VinhosListFilter value={tipoFilter} onChange={handleFilterChange} />

            {vinhosVisiveis.length === 0 && (
                <p className="mx-2">Nenhum vinho encontrado.</p>
            )}

            {vinhosVisiveis.map((vinho) => (
                <Vinho
                    key={vinho.id}
                    vinho={vinho}
                    setError={setError}
                    onVinhoTipoChange={onVinhoTipoChange}
                    onVinhoDelete={onVinhoDelete}
                />
            ))}
        </div>
    );
};

export default VinhosList;
