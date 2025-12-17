// src/components/chamados/ChamadosListFilter.jsx

const VinhosListFilter = ({ value, onChange }) => {
    const handleFilterChange = (e) => {
        onChange(e.target.value); // "a", "f" ou ""
    };

    return (
        <div className="mx-2 my-2">
            <select
                id="id-select-tipo"
                className="form-select"
                onChange={handleFilterChange}
                value={value}
            >
    <option value="branco">Branco</option>
    <option value="tinto">Tinto</option>
    <option value="rose">Rosé</option>
    <option value="espumante_branco">Espumante Branco</option>
    <option value="espumante_rose">Espumante Rosé</option>
    <option value="frisante">Frisante</option>
    <option value="fortificado">Fortificado</option>

            </select>
        </div>
    );
};

export default VinhosListFilter;
