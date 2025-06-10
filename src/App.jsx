import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Componentes
import ProductList from './components/ProductList';
import StatsPanel from './components/StatsPanel';
import Filters from './components/Filters';
import ChartsPanel from './components/ChartsPanel';
import ExportButton from './components/ExportButton';

function App() {
  // 🌐 Estados principales
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 10;

  // 🎛️ Aplicar modo oscuro en el documento y guardar en localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // 🌐 Cargar todos los productos
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=100');
        setAllProducts(response.data.products);
        setAllCategories([...new Set(response.data.products.map(p => p.category))]);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar productos. Intenta recargar la página.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // 🔁 Reiniciar página al cambiar búsqueda/filtros/sort
  useEffect(() => {
    setPage(0);
  }, [searchTerm, categoryFilter, sortBy]);

  // 🔍 Filtrar + ordenar sobre allProducts
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesTitle && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [allProducts, searchTerm, categoryFilter, sortBy]);

  // ⏳ Paginación visual
  const paginatedProducts = useMemo(() => {
    const start = page * limit;
    return filteredProducts.slice(start, start + limit);
  }, [filteredProducts, page]);

  // 🧹 Función para limpiar filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setSortBy('');
    setPage(0);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="container mx-auto p-4">

        {/* Título y controles */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Explorador de Productos
          </h1>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowStats(!showStats)} className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white text-sm`}>
              {showStats ? '📊 Ocultar Estadística' : '📊 Mostrar Estadística'}
            </button>
            <button onClick={() => setShowCharts(!showCharts)} className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white text-sm`}>
              {showCharts ? '🥷 Ocultar Gráficos' : '📈 Mostrar Gráficos'}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            >
              {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
            </button>
          </div>
        </header>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'} focus:outline-none focus:ring-2`}
          />
        </div>

        {/* Filtros */}
        <Filters
          categories={allCategories}
          setCategoryFilter={setCategoryFilter}
          setSortBy={setSortBy}
          darkMode={darkMode}
          handleClearFilters={handleClearFilters}
        />

        {/* Paneles y resultados */}
        {!loading && !error && (
          <>
            {showStats && filteredProducts.length > 0 && <StatsPanel products={filteredProducts} darkMode={darkMode} />}
            {showCharts && filteredProducts.length > 0 && <ChartsPanel products={filteredProducts} darkMode={darkMode} />}
            <ExportButton products={filteredProducts} darkMode={darkMode} />
            <ProductList products={paginatedProducts} darkMode={darkMode} />

            {/* Paginación restaurada */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded ${page === 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                ⬅️ Anterior
              </button>
              <button
                disabled={(page + 1) * limit >= filteredProducts.length}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded ${((page + 1) * limit >= filteredProducts.length) ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Siguiente ➡️
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;