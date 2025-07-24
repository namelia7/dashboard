import React, { useEffect } from 'react';
import { FaUsers, FaChartLine, FaCogs, FaShoppingCart, FaRegBell, FaDollarSign } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Mendaftarkan komponen Chart.js yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  // Data untuk Grafik Garis (Line Chart)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'], // Diterjemahkan dari Fév, Avr, Mai, Jun
    datasets: [
      {
        label: 'Penjualan Bulanan', // Diterjemahkan dari 'Ventes Mensuelles'
        data: [5000, 8000, 7500, 10000, 12000, 15000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Opsi untuk Grafik Garis (Line Chart)
  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Perkembangan Penjualan', // Diterjemahkan dari 'Évolution des Ventes'
      },
    },
    // Menambahkan pengaturan rasio aspek untuk responsivitas yang lebih baik
    maintainAspectRatio: false, 
  };

  // Data untuk Grafik Pie (Pie Chart)
  const pieChartData = {
    labels: ['Pengguna Aktif', 'Pengguna Tidak Aktif', 'Pengguna Ditangguhkan'], // Diterjemahkan
    datasets: [
      {
        label: 'Distribusi Pengguna', // Diterjemahkan
        data: [800, 300, 150],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6"> {/* Menggunakan min-h-screen dan padding responsif */}
      
      {/* Bagian Kartu Ringkasan (Summary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mb-8"> {/* Penyesuaian gap dan grid */}
        
        {/* Kartu: Total Pengguna */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4"> {/* Padding sedikit disesuaikan */}
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FaUsers className="text-2xl sm:text-3xl" /> {/* Ukuran ikon responsif */}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Total Pengguna</h2> {/* Ukuran teks responsif */}
            <p className="text-gray-600 mt-1 sm:mt-2">1.250</p>
          </div>
        </div>
        
        {/* Kartu: Total Penjualan */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaDollarSign className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Total Penjualan</h2>
            <p className="text-gray-600 mt-1 sm:mt-2">Rp48.300.000</p> {/* Format mata uang Indonesia */}
          </div>
        </div>
        
        {/* Kartu: Pendapatan Bulan Ini */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaShoppingCart className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Pendapatan Bulan Ini</h2>
            <p className="text-gray-600 mt-1 sm:mt-2">Rp12.500.000</p> {/* Format mata uang Indonesia */}
          </div>
        </div>

        {/* Kartu: Tingkat Pertumbuhan */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-purple-500 text-white p-3 rounded-full">
            <FaChartLine className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Tingkat Pertumbuhan</h2>
            <p className="text-gray-600 mt-1 sm:mt-2">+15,8%</p>
          </div>
        </div>

        {/* Kartu: Notifikasi */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-red-500 text-white p-3 rounded-full">
            <FaRegBell className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Notifikasi</h2>
            <p className="text-gray-600 mt-1 sm:mt-2">3 peringatan baru</p> {/* Diterjemahkan */}
          </div>
        </div>

        {/* Kartu: Pengaturan Sistem */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-gray-500 text-white p-3 rounded-full">
            <FaCogs className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Pengaturan Sistem</h2>
            <p className="text-gray-600 mt-1 sm:mt-2">Kelola pengaturan Anda</p> {/* Diterjemahkan */}
          </div>
        </div>
      </div>

      {/* Bagian Grafik (Charts Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-8"> {/* Penyesuaian gap dan margin-top */}
        
        {/* Kartu Grafik Garis: Penjualan Bulanan */}
        <div className="bg-white p-5 rounded-lg shadow-md h-96"> {/* Menambahkan tinggi tetap untuk grafik */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Penjualan Bulanan</h2> {/* Diterjemahkan */}
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Kartu Grafik Pie: Distribusi Pengguna */}
        <div className="bg-white p-5 rounded-lg shadow-md h-96"> {/* Menambahkan tinggi tetap untuk grafik */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Distribusi Pengguna</h2> {/* Diterjemahkan */}
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;