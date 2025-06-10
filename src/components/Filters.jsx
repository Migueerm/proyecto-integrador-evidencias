const Filters = ({ categories, setCategoryFilter, setSortBy, darkMode }) => {
  // Función para limpiar ambos filtros
  const limpiarFiltros = () => {
    setCategoryFilter("");
    setSortBy("");
  };

  return (
    <div className={`p-4 mb-6 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Filtros
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Menú desplegable para elegir categoría */}
        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas las categorías</option>
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))
          ) : (
            <option disabled>No hay categorías disponibles</option>
          )}
        </select>

        {/* Menú desplegable para ordenar productos */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Orden normal</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      {/* Botón para reiniciar los filtros a estado original */}
      <button
        onClick={limpiarFiltros}
        className="mt-4 px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filters;
