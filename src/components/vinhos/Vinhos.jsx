// src/components/Vinho.jsx
//
// OBJETIVO
// -----------------------------------------------------------------------------
// Este componente é responsável por renderizar UM cartão de vinho e permitir
// que o usuário alterne o seu estado (ativo/inativo) diretamente no backend,
// usando o helper de requisições autenticadas (useAuthFetch).
//
// VISÃO GERAL
// -----------------------------------------------------------------------------
// - useAuthFetch: devolve uma função de busca autenticada (authFetch) que:
//     * Anexa Authorization: Bearer <access_token> (se existir em sessionStorage);
//     * Envia cookies (para o refresh_token HttpOnly);
//     * Tenta renovar o access token automaticamente quando a API responder 401;
//     * Refaz a requisição original uma única vez após o refresh.
// - Props:
//     * vinho: objeto com dados do vinho (id, texto, estado, url_imagem, etc.);
//     * setError: função vinda do componente pai para exibir mensagens de erro (ex.: toast);
//     * onVinhoEstadoChange: callback que o pai usa para atualizar a lista
//       local quando o backend devolve o vinho atualizado.
// - Interação principal:
//     * O botão "Ativo/Inativo" dispara um PATCH /api/vinhos/:id trocando o
//       campo "estado" entre 'a' (ativo) e 'f' (fechado) e, em caso de sucesso,
//       notifica o pai via onVinhoEstadoChange(...).
//
// -----------------------------------------------------------------------------
// Abaixo está a implementação do componente, com comentários linha a linha.

import { Link } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import { useAuth } from '../../auth/useAuth';
import React, { useState } from 'react';


// Pega a API_BASE_URL da variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


import fallbackImg from './assets/imagemErro404.png';

// Componente responsável por renderizar UM vinho da lista.
// Props:
// - vinho: objeto com dados do vinho (id, texto, estado, url_imagem, etc.).
// - setError: função recebida do pai para exibir mensagens de erro (ex.: toast).
// - onVinhoEstadoChange: callback disparado quando o PATCH no backend
//   retorna o vinho atualizado; o pai usa isso para substituir o item na lista.
const Vinho = ({ vinho, setError, onVinhoEstadoChange, onVinhoDelete }) => {
    // Obtém a função authFetch (um "fetch" com autenticação + refresh automático).
    const authFetch = useAuthFetch();
    const { user, authLoading } = useAuth(); // agora vem do contexto
    const currentUserId = user?.sub;
    const currentUserIsAdmin = user?.papel == 1;
    const [showConfirm, setShowConfirm] = useState(false);

    // Handler do botão que alterna o estado do vinho (a <-> f).
    // a  = ativo/aberto
    // f  = fechado/inativo
    // const handleEstadoChange = async () => {
    //     // Monta a URL do recurso que será atualizado (PATCH /api/vinhos/:id).
    //     const url = `${API_BASE_URL}/api/vinhos/${vinho.id}`;

    //     // Prepara o corpo da requisição. Aqui enviamos apenas o campo "estado"
    //     // trocando 'a' por 'f' e vice-versa. O backend fará a atualização parcial (PATCH).
    //     const payload = JSON.stringify({
    //         estado: vinho.estado === 'a' ? 'f' : 'a',
    //     });

    //     try {
    //         // Faz a chamada usando o helper autenticado.
    //         // Importante: adicionamos Content-Type: application/json porque o body é JSON.
    //         // O authFetch cuida de:
    //         //   - anexar Authorization: Bearer <token> (se existir);
    //         //   - credentials: 'include' (envio de cookies);
    //         //   - tentar /refresh em caso de 401 e refazer a requisição 1x.
    //         const res = await authFetch(url, {
    //             method: 'PATCH',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: payload,
    //         });

    //         // Se a resposta NÃO for ok (status 2xx), tentamos ler um JSON de erro do backend
    //         // e lançamos uma exceção com uma mensagem amigável.
    //         if (!res.ok) {
    //             const body = await res.json().catch(() => null); // se não for JSON, ignora
    //             throw new Error(`Erro HTTP: ${res.status}. ${body?.erro ?? ``}`);
    //         }

    //         // Quando o backend responde 200/204 (ou similar) com o registro atualizado,
    //         // lemos o JSON e avisamos o componente pai para atualizar a lista local.
    //         const data = await res.json();
    //         onVinhoEstadoChange(data);
    //     } catch (error) {
    //         // Qualquer erro (rede, backend, parse de JSON, etc.) cai aqui.
    //         // Encaminhamos a mensagem para o pai mostrar (ex.: toast).
    //         setError(error.message);
    //     }
    // };

    const handleVinhoDelete = async () => {
        const url = `${API_BASE_URL}/vinho/${vinho.id}`;

        try {
            const res = await authFetch(url, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null); // se não for JSON, ignora
                throw new Error(`Erro HTTP: ${res.status}. ${body?.erro ?? ``}`);
            }

            onVinhoDelete(vinho.id);
        } catch (error) {
            setError(error.message);
        }
    };

    // Enquanto ainda está carregando o estado de auth, não decide redirecionar
    if (authLoading) {
        return null;
    }

    // Abaixo está apenas a renderização do cartão do vinho (UI).
    return (
        <div>
            <div className="card m-2">
                <div className="card-header">
                    <div className='d-flex justify-content-between'>
                        <span>Nome: {' '} <strong>{vinho.nome}</strong></span>
                        <span>Vinho <strong>#{vinho.id}</strong> </span>

                    </div>
                </div>
                <div className="card-body">
                    <Link to={`/vinhos/${vinho.id}`} className='text-body text-decoration-none'>
                        <div className='d-flex justify-content-between'>
                            <span>Produtor: {' '} {vinho.produtor}</span>
                            <span>Pais de origem: {' '} {vinho.pais_origem}</span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>Tipo: {' '} {vinho.tipo}</span>
                            <span>Casta da uva: {' '} {vinho.uva_casta}</span>
                        </div>

                    </Link>
                </div>
                <div className="card-footer text-body-secondary">
                    {/* Botão que alterna o estado do vinho.
              Ao clicar, dispara handleEstadoChange (PATCH). */}
                    {/* {vinho.estado === 'a' && (
                        <button
                            className="btn btn-success me-2"
                            onClick={handleEstadoChange}
                            disabled={!currentUserIsAdmin && currentUserId != vinho.Usuarios_id}
                        >
                            Aberto
                        </button>
                    )}
                    {vinho.estado === 'f' && (
                        <button
                            className="btn btn-secondary me-2"
                            onClick={handleEstadoChange}
                            disabled={!currentUserIsAdmin && currentUserId != vinho.Usuarios_id}
                        >
                            Fechado
                        </button>
                    )} */}

                    {/* Botões "Editar" e "Remover" estão presentes para futuras ações. */}
                    {(currentUserId == vinho.Usuarios_id || currentUserIsAdmin) && <Link to={`/vinhos/${vinho.id}/edit`} className="btn btn-info me-2 text-white">Editar</Link>}
                    {/* Remoção somente para ADMIN */}
                    {(currentUserId == vinho.Usuarios_id || currentUserIsAdmin) && <button
                        className="btn btn-danger me-2"
                        onClick={() => setShowConfirm(true)}
                    >
                        Remover
                    </button>}
                    {showConfirm && (
                        <>
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Confirmar exclusão</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowConfirm(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Tem certeza que deseja remover o vinho <strong>{vinho.nome}</strong>?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setShowConfirm(false)}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    setShowConfirm(false);
                                                    handleVinhoDelete();
                                                }}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Backdrop para escurecer o fundo */}
                            <div className="modal-backdrop fade show"></div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Vinho;

