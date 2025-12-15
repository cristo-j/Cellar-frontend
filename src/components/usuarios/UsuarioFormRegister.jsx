import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast';
import { Card } from "react-bootstrap";


const UsuarioFormRegister = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dadosParaEnviar = {
            nome,
            email,
            senha
        }
        try {
            const res = await fetch("http://localhost:3000/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosParaEnviar),
                credentials: "include",
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(`Algo deu errado. ${data.message}`);
            }
            else
                navigate("/");
        } catch (error) {
            setError(error.message);
        }

    }

    return (
        <div className='m-2'>
            {error && <Toast error={error} setError={setError} />}
            <div className="d-flex justify-content-center align-items-center vh-100">

                <Card style={{ width: '20rem' }}>

                    <Card.Body>
                        <Card.Title className="text-center">Registro</Card.Title>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="id-input-nome" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    id="id-input-nome"
                                    className="form-control"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="id-input-email" className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    id="id-input-email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="id-input-senha" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    id="id-input-senha"
                                    className="form-control"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='text-center'>
                                <button type="submit" className='btn btn-primary'>Registrar</button>
                            </div>
                        </form>

                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default UsuarioFormRegister