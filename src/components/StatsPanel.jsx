const StatsPanel = ({ products, darkMode }) => {
  if (!products || products.length === 0) {
    return (
      <div className={`p-4 mb-6 rounded-lg shadow ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
        <p className="text-center text-gray-500">📊 No hay productos para mostrar estadísticas</p>
      </div>
    );
  }

  // 🧮 Generales
  const totalProducts = products.length;
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
  const avgPrice = (totalPrice / totalProducts).toFixed(2);
  const avgRating = (totalRating / totalProducts).toFixed(1);

  // 🧾 Filtros especiales
  const stockOver50 = products.filter(p => p.stock > 50).length;
  const ratingOver45 = products.filter(p => p.rating > 4.5).length;

  // 🏆 Destacados globales
  const mostExpensive = products.reduce((a, b) => a.price > b.price ? a : b);
  const cheapest = products.reduce((a, b) => a.price < b.price ? a : b);
  const bestRated = products.reduce((a, b) => a.rating > b.rating ? a : b);

  // 📂 Estadísticas por categoría extendidas
  const groupedByCategory = {};
  for (let p of products) {
    if (!groupedByCategory[p.category]) {
      groupedByCategory[p.category] = {
        count: 0,
        totalPrice: 0,
        totalRating: 0,
        highest: p,
        lowest: p
      };
    }

    const group = groupedByCategory[p.category];
    group.count++;
    group.totalPrice += p.price;
    group.totalRating += p.rating;

    if (p.price > group.highest.price) group.highest = p;
    if (p.price < group.lowest.price) group.lowest = p;
  }

  const formattedCategoryStats = Object.entries(groupedByCategory).map(([cat, data]) => ({
    category: cat,
    count: data.count,
    avgPrice: (data.totalPrice / data.count).toFixed(2),
    avgRating: (data.totalRating / data.count).toFixed(1),
    highest: `${data.highest.title} ($${data.highest.price.toFixed(2)})`,
    lowest: `${data.lowest.title} ($${data.lowest.price.toFixed(2)})`
  }));

  return (
    <div className={`p-6 rounded-lg shadow-md mb-6 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4">📊 Estadísticas Detalladas de Productos</h2>

      {/* 📦 Resumen General simple y claro */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2">Resumen General</h3>
        <div className="space-y-2 text-sm leading-relaxed px-2">
          <p>📦 <strong>Total de productos:</strong> {totalProducts}</p>
          <p>💰 <strong>Precio promedio sin descuento:</strong> ${avgPrice}</p>
          <p>⭐ <strong>Puntuación promedio:</strong> {avgRating} ★</p>
          <p>📈 <strong>Productos con stock mayor a 50:</strong> {stockOver50}</p>
          <p>🔥 <strong>Productos con puntuación  mayor a 4.5:</strong> {ratingOver45}</p>
        </div>
      </div>

      {/* 🏅 Productos Destacados */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2">Productos Destacados Sin Descuento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Más Caro" value={` ${mostExpensive.title} ($${mostExpensive.price.toFixed(2)})`} icon="💎" darkMode={darkMode} />
          <StatCard title="Más Barato" value={` ${cheapest.title} ($${cheapest.price.toFixed(2)})`} icon="🛒" darkMode={darkMode} />
          <StatCard title="Mejor Valorado" value={` ${bestRated.title} (${bestRated.rating.toFixed(1)} ★)`} icon="🌟" darkMode={darkMode} />
        </div>
      </div>

      {/* 📂 Estadísticas por Categoría */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2">Estadísticas por Categoría</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                <th className="p-3 text-left">Categoría</th>
                <th className="p-3 text-right">Cantidad</th>
                <th className="p-3 text-right">Precio Prom.</th>
                <th className="p-3 text-right">Puntuación Prom.</th>
                <th className="p-3 text-right">Más Caro</th>
                <th className="p-3 text-right">Más Barato</th>
              </tr>
            </thead>
            <tbody>
              {formattedCategoryStats.map((stat, index) => (
                <tr
                  key={stat.category}
                  className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} ${index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : ''}`}
                >
                  <td className="p-3">{stat.category}</td>
                  <td className="p-3 text-right">{stat.count}</td>
                  <td className="p-3 text-right">${stat.avgPrice}</td>
                  <td className="p-3 text-right">{stat.avgRating} ★</td>
                  <td className="p-3 text-right">{stat.highest}</td>
                  <td className="p-3 text-right">{stat.lowest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 📋 Tarjeta de estadística
const StatCard = ({ title, value, icon, darkMode }) => (
  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
    <p className="text-base font-medium flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <span>{title}:</span>
      <span className="font-semibold">{value}</span>
    </p>
  </div>
);

export default StatsPanel;