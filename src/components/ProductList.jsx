const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountedPrice = (
          product.price * (1 - product.discountPercentage / 100)
        ).toFixed(2);

        return (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            {/* imagen */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* titulo */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              📌 <strong>{product.title}</strong>
            </h3>

            {/* precios */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-1">
               <p className="text-gray-500">
                🏷️ <strong>Precio original:</strong> ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-green-600">
                  ✅ <strong>Precio final:</strong> ${discountedPrice}
                </p>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  📉 <strong>Descuento:</strong> {product.discountPercentage}% OFF
                </span>
              </div>
            </div>

            {/* descripcion */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              📄 <strong>Descripción:</strong> {product.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
