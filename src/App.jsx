import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import StatsPanel from './components/StatsPanel';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState('10'); // paso como string
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch productos
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setProducts(res.data.products))
      .catch(err => {
        console.error("Error en la petición:", err);
        setError('❌ Ocurrió un error al cargar los productos.');
      })
      .finally(() => setLoading(false));
  }, []);

  // filtrado y limite de productos visibles
  const limit = itemsPerPage === 'all' ? products.length : Number(itemsPerPage);

  const filteredProducts = Array.isArray(products)
    ? products
        .filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, limit)
    : [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* busqueda y seleccion de cantidad */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-lg flex-grow focus:outline-blue-500"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          className="p-3 border rounded-lg bg-white"
        >
          <option value="10">Mostrar 10</option>
          <option value="15">Mostrar 15</option>
          <option value="20">Mostrar 20</option>
          <option value="all">🔄 Ver todos</option>
        </select>
      </div>

      {/* estado de carga / error */}
      {loading && <p className="text-center">⏳ Cargando productos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* resultados */}
      {!loading && filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">🛒 No se encontraron productos.</p>
      ) : (
        <>
          <StatsPanel products={filteredProducts} />
          <ProductList products={filteredProducts} />
        </>
      )}
    </div>
  );
}

export default App;
