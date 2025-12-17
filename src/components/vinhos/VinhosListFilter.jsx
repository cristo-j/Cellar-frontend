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
                <option value="">Todos</option>
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
    );
};

export default VinhosListFilter;
