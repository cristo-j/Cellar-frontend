// src/components/VinhoFormCreate.jsx
//
// OBJETIVO DO ARQUIVO
// -----------------------------------------------------------------------------
// Este componente exibe um formulário para CRIAR um novo “vinho”.
// Ele guarda os valores digitados em tipos locais (useState),
// envia os dados para o backend (POST /api/vinhos) e, se der certo,
// redireciona o usuário para a lista de vinhos ("/vinhos").
//
// -----------------------------------------------------------------------------
// 1) useState: cria “variáveis reativas” para controlar os campos do formulário.
// 2) FormData: usado para enviar texto + arquivo (multipart/form-data).
//    IMPORTANTE: quando usamos FormData, NÃO definimos manualmente o header
//    "Content-Type"; o navegador monta isso automaticamente com o boundary.
// 3) useAuthFetch: é um helper que funciona como o fetch, mas já adiciona
//    o Authorization: Bearer <access_token> (se existir) e tenta RENOVAR
//    o token (via /api/usuarios/refresh) quando recebe 401.
// 4) useNavigate: permite redirecionar o usuário após o envio bem-sucedido.
//
// Fluxo do submit:
//  - Previne o recarregamento da página (e.preventDefault()).
//  - Monta um FormData com os campos e o arquivo (se houver).
//  - Faz POST com authFetch.
//  - Se falhar, mostra um toast de erro; se der certo, navega para "/vinhos".

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import Toast from '../shared/Toast';


// Pega a API_BASE_URL da variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Componente de formulário para criar um novo vinho.
 * Ele gerencia o tipo do formulário, a submissão e a navegação.
 */
const VinhoFormCreate = () => {
    // Tipos controlando os inputs do formulário.
    const [nome, setNome] = useState("");
    const [produtor, setProdutor] = useState("");
    const [pais_origem, setPaisOrigem] = useState("");
    const [tipo, setTipo] = useState("");
    const [uva_casta, setUvaCasta] = useState("");


    // Tipo para armazenar mensagens de erro e exibir no toast.
    const [error, setError] = useState(null);

    // Token do reCAPTCHA (preenchido pelo componente ReCaptcha).
    const [captchaToken, setCaptchaToken] = useState(null);

    // Indica se há uma requisição em andamento (para UX e pro ReCaptcha resetar no fim)
    const [loading, setLoading] = useState(false);

    // Hook para redirecionar a rota após sucesso.
    const navigate = useNavigate();

    // Nosso “fetch autenticado” (cuida do Bearer e do refresh automático).
    const authFetch = useAuthFetch(); // <<< usa o hook

    // Handler do submit do formulário.
    // Aqui montamos o FormData e enviamos para a API.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const payload = {
            nome,
            produtor,
            pais_origem,
            tipo,
            uva_casta
        };

        setLoading(true);
        try {
            const response = await authFetch(`${API_BASE_URL}/vinho`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.erro
                    ? `Erro HTTP: STATUS ${response.status}. ${errorData?.erro} ${response.statusText}`
                    : `Erro HTTP: STATUS ${response.status}. ${response.statusText}`;
                throw new Error(errorMessage);
            }

            navigate("/vinhos");
        } catch (error) {
            if (error?.name !== 'AbortError') setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    // Renderização do formulário.
    return (
        <form onSubmit={handleSubmit} className='m-2' encType="multipart/form-data">

            {/* Toast de erro simples. Fica visível quando "error" tem conteúdo. */}
            {error && <Toast error={error} setError={setError} />}

            <div className='my-2'>
                <label className='form-label' htmlFor="id-input-texto">Nome</label>
                <input
                    className='form-control'
                    type="text"
                    id="id-input-nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder='Nome do vinho'
                />
            </div>
            <div className='my-2'>
                <label className='form-label' htmlFor="id-input-texto">Produtor</label>
                <input
                    className='form-control'
                    type="text"
                    id="id-input-produtor"
                    value={produtor}
                    onChange={(e) => setProdutor(e.target.value)}
                    placeholder='Nome do produtor'
                />
            </div>
            <div className='my-2'>
                <label className='form-label' htmlFor="id-input-texto">País de origem</label>
                <input
                    className='form-control'
                    type="text"
                    id="id-input-pais_origem"
                    value={pais_origem}
                    onChange={(e) => setPaisOrigem(e.target.value)}
                    placeholder='Nome do país de origem'
                />
            </div>
            {/* Select simples para o tipo do vinho */}
            <div className='my-2'>
                <label className='form-label' htmlFor="id-select-tipo">Tipo</label>
                <select
                    id='id-select-tipo'
                    className='form-select'
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="Branco">Branco</option>
                    <option value="Tinto">Tinto</option>
                    <option value="Rose">Rosé</option>
                    <option value="Laranja">Laranja</option>
                    <option value="Espumante_branco">Espumante Branco</option>
                    <option value="Espumante_rose">Espumante Rosé</option>
                    <option value="Frisante">Frisante</option>
                    <option value="Fortificado">Fortificado</option>
                </select>
            </div>
            <div className='my-2'>
                <label className='form-label' htmlFor="id-input-texto">Casta da uva</label>
                <input
                    className='form-control'
                    type="text"
                    id="id-input-uva_casta"
                    value={uva_casta}
                    onChange={(e) => setUvaCasta(e.target.value)}
                    placeholder='Nome da casta da uva'
                />
            </div>


            {/* Botão de envio do formulário.
                Desabilita enquanto o reCAPTCHA não estiver marcado ou enquanto estiver carregando. */}
            <div className='my-2'>
                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={loading}
                >
                    {loading ? 'Enviando…' : 'Enviar'}
                </button>
            </div>
        </form>
    )
}

export default VinhoFormCreate
