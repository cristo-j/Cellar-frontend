import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import Toast from '../shared/Toast';


// Pega a API_BASE_URL da variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VinhoEditForm = ({ vinho }) => {
    const [nome, setNome] = useState(vinho.nome);
    const [produtor, setProdutor] = useState(vinho.produtor);
    const [pais_origem, setPaisOrigem] = useState(vinho.pais_origem);
    const [tipo, setTipo] = useState(vinho.tipo);
    const [uva_casta, setUvaCasta] = useState(vinho.uva_casta);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // controla ciclo de envio/patch

    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const submitForm = async (e) => {
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
            const response = await authFetch(`${API_BASE_URL}/vinho/${vinho.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message
                    ;
                throw new Error(errorMessage);
            }

            navigate("/vinhos");
        } catch (error) {
            if (error?.name !== 'AbortError') setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <form onSubmit={submitForm} className='m-2'>
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
                    <option value="Rosé">Rosé</option>
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

export default VinhoEditForm
