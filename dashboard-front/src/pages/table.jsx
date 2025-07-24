import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/index';
import SearchBar from '../components/table/SearchBar';
import SortOptions from '../components/table/SortOptions';
import ProductTable from '../components/table/ProductTable';
import Pagination from '../components/table/Pagination';
import EditModal from '../components/table/EditModal';
import AddModal from '../components/table/AddModal';
import { FaPlus } from 'react-icons/fa';

const Table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // 'terbaru', 'terlama', 'abjad'
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        // Pastikan products adalah array sebelum mengatur state
        setData(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error('Gagal mengambil produk:', error); // Diterjemahkan
      }
    };

    fetchProducts();
  }, []); // Dependensi kosong agar hanya dijalankan sekali saat komponen di-mount

  const rowsPerPage = 10;

  // Filter data berdasarkan searchTerm
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        Object.values(item)
          .join(' ') // Menggabungkan semua nilai properti menjadi string
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  // Urutkan data berdasarkan sortOrder
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'terbaru') { // Diterjemahkan dari 'nouveau'
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === 'terlama') { // Diterjemahkan dari 'ancien'
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === 'abjad') { // Diterjemahkan dari 'alphabetique'
      return a.productName.localeCompare(b.productName);
    }
    return 0; // Tidak ada pengurutan default jika sortOrder tidak cocok
  });

  // Logika Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  // Handler untuk menghapus produk
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) { // Diterjemahkan
      try {
        await deleteProduct(id);
        setData(data.filter((item) => item.id !== id)); // Hapus item dari state
      } catch (error) {
        console.error('Gagal menghapus produk:', error); // Diterjemahkan
      }
    }
  };

  // Handler untuk menambah produk baru
  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      setData((prevData) => [...prevData, addedProduct]); // Tambahkan produk baru ke state
      setIsAddModalOpen(false); // Tutup modal setelah berhasil
    } catch (error) {
      console.error('Gagal menambahkan produk:', error); // Diterjemahkan
    }
  };

  // Handler untuk memperbarui produk yang sudah ada
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const updatedItem = await updateProduct(updatedProduct.id, updatedProduct);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      ); // Perbarui item di state
      setIsEditModalOpen(false); // Tutup modal setelah berhasil
    } catch (error) {
      console.error('Gagal memperbarui produk:', error); // Diterjemahkan
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen"> {/* Penyesuaian padding dan background */}
      {/* Bagian Kontrol (Search, Sort, Add Button) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-3 md:space-y-0"> {/* Penyesuaian layout dan spasi */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full"> {/* Penyesuaian layout */}
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <SortOptions value={sortOrder} onChange={setSortOrder} />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto text-sm sm:text-base" 
        >
          <FaPlus className="inline mr-2 text-sm sm:text-base" /> {/* Ukuran ikon responsif */}
          Tambah Produk
        </button>
      </div>

      {/* Tabel Produk */}
      <ProductTable
        data={currentRows}
        onEdit={setEditData}
        onDelete={handleDelete}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      {isEditModalOpen && (
        <EditModal
          data={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateProduct}
        />
      )}

      {isAddModalOpen && (
        <AddModal
          data={{ productName: '', color: '', category: '', price: '' }} // Data awal untuk form tambah
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Table;