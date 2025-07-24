import { useState, useEffect } from 'react';

const EditModal = ({ data, onClose, onSave }) => {
  // Menginisialisasi state dengan nilai dari prop data
  const [productName, setProductName] = useState(data.productName);
  const [color, setColor] = useState(data.color);
  const [category, setCategory] = useState(data.category);
  const [price, setPrice] = useState(data.price);
  const [error, setError] = useState('');

  // Validasi input form
  const validateFields = () => {
    if (!productName || !color || !category || !price) {
      return 'Semua kolom harus diisi.'; 
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      return 'Harga harus berupa angka yang valid dan lebih besar dari nol.'; 
    }
    return ''; // Mengembalikan string kosong jika validasi berhasil
  };

  // Handler saat tombol 'Simpan' diklik
  const handleSave = () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError); 
      return;
    }

    // Membuat objek item yang diperbarui
    const updatedItem = {
      ...data, 
      productName,
      color,
      category,
      price: parseFloat(price) 
    };
    onSave(updatedItem); n
    setError(''); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4"> {/* Menambahkan padding responsif */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 scale-95 sm:scale-100"> {/* Menambahkan padding responsif, max-width, dan efek transisi */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Edit Produk</h2> {/* Diterjemahkan dari 'Modifier le produit', ukuran font responsif, warna teks */}
        
        {/* Menampilkan pesan error jika ada */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>} 

        {/* Form input */}
        <div className="space-y-4"> 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productName">
              Nama Produk
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" // Menambahkan focus ring
              placeholder="Masukkan nama produk"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="color">
              Warna
            </label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukkan warna produk"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
              Kategori
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukkan kategori produk"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
              Harga (Rp)
            </label>
            <input
              type="number" 
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukkan harga produk"
              step="0.01" 
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out text-sm font-medium" // Menambahkan transisi, ukuran teks, font-medium
          >
            Batal 
          </button>
          
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out text-sm font-medium" // Penyesuaian warna biru, transisi, ukuran teks, font-medium
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;