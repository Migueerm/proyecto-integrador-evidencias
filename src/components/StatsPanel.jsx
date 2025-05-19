const StatsPanel = ({ products }) => {
  // estadisticas
  const totalProducts = products.length;
  
  const mostExpensive = products.reduce((max, curr) => 
    curr.price > max.price ? curr : max, 
    { price: 0, title: 'N/A' }
  );
  
  const cheapest = products.reduce((min, curr) => 
    curr.price < min.price ? curr : min, 
    { price: Infinity, title: 'N/A' }
  );
  
  
  const totalPrice = products.reduce((sum, curr) => sum + curr.price, 0);
  const avgDiscount = products.length > 0 
    ? (products.reduce((sum, curr) => sum + curr.discountPercentage, 0) / products.length).toFixed(2)
    : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estadísticas de Productos</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p>📦 <strong>Productos totales:</strong> <span className="font-semibold">{totalProducts}</span></p>
            <p>💸 <strong>Más caro:</strong> <span className="text-green-600">{mostExpensive.title} (${mostExpensive.price.toFixed(2)})</span></p>
            <p>🤑 <strong>Más barato:</strong> <span className="text-red-600">{cheapest.title} (${cheapest.price.toFixed(2)})</span></p>
            <p>💰 <strong>Precio total:</strong> <span className="font-semibold">${totalPrice.toFixed(2)}</span></p>
            <p>🏷️ <strong>Descuento promedio:</strong> <span className="font-semibold">{avgDiscount}%</span></p>
            <p>🎁 <strong>Con descuento:</strong> <span className="font-semibold">{products.filter(p => p.discountPercentage > 0).length}</span></p>
            <p>🚫 <strong>Sin descuento:</strong> <span className="font-semibold">{products.filter(p => p.discountPercentage === 0).length}</span></p>
        </div>
    </div>
  );
};

export default StatsPanel;