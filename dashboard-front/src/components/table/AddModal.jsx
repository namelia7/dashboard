import { useState, useEffect } from 'react';

const AddModal = ({ data, onClose, onSave }) => {
  // Menginisialisasi state dengan nilai default dari prop data atau string kosong
  const [productName, setProductName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  // Efek samping untuk mengisi form jika prop data berubah (misalnya, untuk mode edit, meskipun ini modal tambah)
  // Untuk modal tambah, `data` biasanya adalah objek kosong atau default,
  // sehingga useEffect ini memastikan input diatur ulang atau diinisialisasi.
  useEffect(() => {
    if (data) {
      setProductName(data.productName || '');
      setColor(data.color || '');
      setCategory(data.category || '');
      setPrice(data.price || '');
    }
  }, [data]);

  // Fungsi untuk memvalidasi input form
  const validateFields = () => {
    if (!productName || !color || !category || !price) {
      return 'Semua kolom harus diisi.'; // Diterjemahkan dari 'Tous les champs doivent être remplis.'
    }
    // Memastikan harga adalah angka yang valid dan lebih besar dari nol
    if (isNaN(price) || parseFloat(price) <= 0) {
      return 'Harga harus berupa angka yang valid dan lebih besar dari nol.'; // Diterjemahkan dari 'Le prix doit être un nombre valide et supérieur à zéro.'
    }
    return ''; // Mengembalikan string kosong jika validasi berhasil
  };

  // Handler saat tombol 'Simpan' atau 'Tambahkan' diklik
  const handleSave = () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError); // Menampilkan pesan error jika validasi gagal
      return;
    }

    // Membuat objek item baru dengan ID sementara (timestamp) dan tanggal saat ini
    const newItem = {
      id: Date.now(), // Menggunakan timestamp sebagai ID sementara
      productName,
      color,
      category,
      price: parseFloat(price), // Pastikan harga disimpan sebagai float
      date: new Date().toISOString().split('T')[0] // Format tanggal YYYY-MM-DD
    };
    onSave(newItem); // Memanggil fungsi onSave dari parent komponen
    setError(''); // Mengatur ulang pesan error
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 scale-95 sm:scale-100"> 
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Tambah Produk Baru</h2> 
        
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
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition duration-150 ease-in-out text-sm font-medium" // Penyesuaian gradien warna, transisi, ukuran teks, font-medium
          >
            Tambah 
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;