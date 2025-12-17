import Navbar from "../components/shared/Navbar";

const Sobre = () => {
    return (
        <div>
            <Navbar />

            <div className="container my-4">
                <h1>Sobre o Cellar</h1>

                <p>
                    Cellar-frontend é uma aplicação single-page (SPA) construída com React e Vite
                    para consumo da API do projeto Cellar. A interface usa componentes reaproveitáveis
                    e React Router para navegação, com estilização baseada em Bootstrap.
                </p>

                <h5>Finalidade</h5>
                <p>
                    Proporcionar ao usuário o controle de sua adega pessoal, inserindo os vinhos e suas características e as garrafas que possui ou venha a adquirir, permitindo a baixa e avaliação de cada garrafa.
                </p>




                <h5>Contribuição</h5>
                <p>
                    Para contribuir, abra uma issue ou PR no repositório correspondente. Ao modificar
                    a autenticação ou endpoints, verifique `src/auth/useAuthFetch.jsx` e mantenha
                    compatibilidade com os pontos onde `VITE_API_BASE_URL` é usado.
                </p>
            </div>
        </div>
    );
};

export default Sobre;