import Navbar from "../components/shared/Navbar";

const Contato = () => {
    return (
        <div>
            <Navbar />

            <div className="container my-4">
                <h1>Contato</h1>

                <p>Tem alguma dúvida, sugestão ou deseja falar conosco? Utilize os contatos abaixo ou envie um e-mail pelo botão.</p>

                <ul className="list-unstyled">
                    <li><strong>E-mail:</strong> <a href="mailto:cristo.j@aluno.ifsc.edu.br">cristo.j@aluno.ifsc.edu.br</a></li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/cristo-j/">https://github.com/cristo-j/</a></li>

                </ul>

                <a href="mailto: cristo.j@aluno.ifsc.edu.br?subject=Contato%20via%20site" className="btn btn-primary">Enviar e-mail</a>
            </div>
        </div>
    );
};

export default Contato;