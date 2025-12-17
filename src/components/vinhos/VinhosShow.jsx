const VinhoShow = ({ vinho }) => {
    const nome = vinho.nome;
    const produtor = vinho.produtor;
    const pais_origem = vinho.pais_origem;
    const tipo = vinho.tipo;
    const uva_casta = vinho.uva_casta;
    return (
        <div className='m-2'>
            <div className='my-2'>
                <label htmlFor="id-input-nome" className='form-label'>Nome</label>
                <input className="form-control" type="text" id="id-input-nome" value={nome} readOnly />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-produtor" className='form-label'>Produtor</label>
                <input className="form-control" type="text" id="id-input-produtor" value={produtor} readOnly />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-pais_origem" className='form-label'>Pais de origem</label>
                <input className="form-control" type="text" id="id-input-pais_origem" value={pais_origem} readOnly />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-tipo" className='form-label'>Tipo</label>
                <input className="form-control" type="text" id="id-input-tipo" value={tipo} readOnly />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-uva_casta" className='form-label'>Uva/casta</label>
                <input className="form-control" type="text" id="id-input-uva_casta" value={uva_casta} readOnly />
            </div>

        </div>
    )
}

export default VinhoShow