import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const ChartsPanel = ({ products, darkMode }) => {
  // 📊 BarChart: cantidad de productos por categoría
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count
  }));

  // 📈 LineChart: evolución simulada de precios
  const lineData = products.slice(0, 10).map(product => ({
  name: product.title,
  price: product.price + Math.floor(Math.random() * 20 - 10)
}));

  // 🥧 PieChart: distribución según stock
  const stockData = [
    {
      name: 'Stock bajo (≤ 20)',
      value: products.filter(p => p.stock <= 20).length
    },
    {
      name: 'Stock medio (21–50)',
      value: products.filter(p => p.stock > 20 && p.stock <= 50).length
    },
    {
      name: 'Stock alto (> 50)',
      value: products.filter(p => p.stock > 50).length
    }
  ];

  const colors = ['#ef4444', '#facc15', '#22c55e']; // rojo, amarillo, verde

  return (
    <div className="space-y-10 mb-10">
      {/* 📊 Productos por categoría */}
      <section>
        <h3 className="text-xl font-semibold mb-4">📊 Productos por Categoría</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="category" stroke={darkMode ? '#fff' : '#000'} />
            <YAxis stroke={darkMode ? '#fff' : '#000'} />
            <Tooltip />
            <Bar dataKey="count" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 📈 Evolución de Precios (simulada) */}
      <section>
        <h3 className="text-xl font-semibold mb-4">📈 Evolución Simulada de Precios</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#000'} />
            <YAxis stroke={darkMode ? '#fff' : '#000'} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#34d399" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* 🥧 Distribución por Stock */}
      <section>
        <h3 className="text-xl font-semibold mb-4">🥧 Distribución por Stock</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stockData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default ChartsPanel;