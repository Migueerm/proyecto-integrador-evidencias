import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExportButton = ({ products, darkMode }) => {
  // Si no hay productos, mostramos un mensaje
  if (!products || products.length === 0) {
    return (
      <div className={`p-4 rounded-lg shadow-md mb-6 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Exportar Datos
        </h3>
        <p className="text-center text-gray-500">No hay productos disponibles para exportar</p>
      </div>
    );
  }

  // Exportar a JSON
  const exportToJSON = () => {
    const contenido = JSON.stringify(products, null, 2); // Formato legible
    const blob = new Blob([contenido], { type: 'application/json' });
    saveAs(blob, 'productos.json');
  };

  // Exportar a CSV (texto separado por comas)
  const exportToCSV = () => {
    const headers = Object.keys(products[0]); // Primeras columnas
    const filas = products.map(producto =>
      headers.map(campo => JSON.stringify(producto[campo] ?? '')).join(',')
    );
    const contenido = [headers.join(','), ...filas].join('\n'); // Unimos todo
    const blob = new Blob([contenido], { type: 'text/csv' });
    saveAs(blob, 'productos.csv');
  };

  // Exportar a Excel con XLSX
  const exportToExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(products); // Crea hoja desde objetos
    const libro = XLSX.utils.book_new(); // Crea un libro nuevo
    XLSX.utils.book_append_sheet(libro, hoja, 'Productos'); // Agrega la hoja
    XLSX.writeFile(libro, 'productos.xlsx'); // Guarda archivo
  };

  return (
    <div className={`p-4 rounded-lg shadow-md mb-6 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Exportar Datos
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportToJSON}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          JSON
        </button>
        <button
          onClick={exportToCSV}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          CSV
        </button>
        <button
          onClick={exportToExcel}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
        >
          Excel
        </button>
      </div>
    </div>
  );
};

export default ExportButton;
