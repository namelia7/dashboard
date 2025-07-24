import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';


const ProductTable = ({ data, onEdit, onDelete, setIsEditModalOpen }) => {
  const [loading, setLoading] = useState(true);

  // Efek untuk mengelola status loading berdasarkan data yang diterima
  useEffect(() => {
    // Menetapkan loading ke false jika data sudah ada atau array kosong (menunjukkan fetch selesai)
    if (data !== undefined) { // Periksa jika data bukan 'undefined'
      setLoading(false);
    }
    // Jika Anda mengharapkan data selalu array kosong jika tidak ada data,
    // maka `if (data && data.length > 0)` bisa menjadi `if (data)`
  }, [data]);

  // Tampilkan indikator loading jika data masih dimuat
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] h-full"> {/* Menambahkan min-h dan h-full untuk posisi spinner yang lebih baik */}
        <FaSpinner className="text-blue-500 animate-spin text-4xl" />
        <span className="ml-3 text-lg text-gray-700">Memuat data...</span> {/* Menambahkan teks loading */}
      </div>
    );
  }

  // Tampilkan pesan jika tidak ada data
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600 text-lg">
        Tidak ada data produk yang tersedia.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200"> 
      <table className="min-w-full divide-y divide-gray-200"> 
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">ID</th> 
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Nama Produk</th> 
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Warna</th> 
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Kategori</th> 
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Harga</th> 
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Aksi</th> 
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150"> 
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.color}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                Rp{new Intl.NumberFormat('id-ID').format(item.price)} 
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm"> 
                <button
                  onClick={() => {
                    onEdit(item);
                    setIsEditModalOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-colors duration-150" 
                  title="Edit"
                >
                  <FaEdit className="text-base" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full transition-colors duration-150" 
                  title="Hapus"
                >
                  <FaTrash className="text-base" /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;