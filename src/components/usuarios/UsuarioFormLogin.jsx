import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast';
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UsuarioFormLogin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dadosParaEnviar = {
            email,
            senha
        }
        try {
            const res = await fetch("http://localhost:3000/usuario/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosParaEnviar),
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(`Algo deu errado. ${data.message}`);
            }
            else {
                sessionStorage.setItem("at", data.token);
                navigate("/vinho");
            }
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
                    <Card.Title className="text-center">Login</Card.Title>
                    <form onSubmit={handleSubmit}>
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
                            <button type="submit" className='btn btn-primary '>Entrar</button>
                        </div>
                        <div className='text-center'>
                            <h4 className="my-0 mx-2"><br></br>Se não for usuário<br></br><br></br></h4>
                            <Link to="/usuario" className="mx-2 btn btn-secondary">Fazer Registro</Link>

                        </div>
                    </form>

                </Card.Body>
            </Card>
            </div>
            );

        </div>
    )
}

export default UsuarioFormLogin