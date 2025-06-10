const ProductList = ({ products, darkMode }) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        🔍 No se encontraron productos
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) => {
        const discountedPrice = (
          product.price * (1 - product.discountPercentage / 100)
        ).toFixed(2);

        return (
          <div
            key={product.id}
            className={`p-4 rounded-lg border transition-shadow shadow-md hover:shadow-lg
              ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-100'}`}
          >
            {/* Imagen */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Título */}
            <h3 className="text-lg font-bold mb-2">
              📌 <strong>{product.title}</strong>
            </h3>

            {/* Precios */}
            <div className="space-y-1 mb-3">
              <div className="text-sm text-gray-400 line-through">
                🏷️ <strong>Precio original:</strong> ${product.price.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <p className="text-green-500 font-semibold">
                  ✅ <strong>Precio final:</strong> ${discountedPrice}
                </p>
                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-semibold">
                  📉 {product.discountPercentage}% OFF
                </span>
              </div>
            </div>

            {/* Rating con solo una estrella y el puntaje numérico */}
            {/* Salto de línea antes de la estrella */}
            <br />
            <div className="mt-3 flex items-center gap-1 text-sm text-yellow-500 font-medium">
              <span>⭐</span>
              <span>{product.rating.toFixed(1)}</span>
            </div>

            {/* Descripción */}
            <p className="mt-3 text-sm line-clamp-2">
              📄 <strong>Descripción:</strong> {product.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;