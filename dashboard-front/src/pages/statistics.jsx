import React, { useEffect, useRef } from 'react';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import { FaUsers, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale, BarElement, Filler } from 'chart.js';


// Mendaftarkan komponen Chart.js yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  BarElement,
  Filler
);

const Statistics = () => {

  // Data untuk Grafik Garis (Line Chart)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'], 
    datasets: [
      {
        label: 'Penjualan Bulanan', 
        data: [5000, 8000, 7500, 10000, 12000, 15000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Data untuk Grafik Batang (Bar Chart)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'], 
    datasets: [
      {
        label: 'Pendapatan Bulanan', 
        data: [4000, 5000, 7000, 9000, 10000, 12000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Data untuk Grafik Pie (Pie Chart)
  const pieChartData = {
    labels: ['Pengguna Aktif', 'Pengguna Tidak Aktif', 'Pengguna Ditangguhkan'],
    datasets: [
      {
        label: 'Distribusi Pengguna',
        data: [800, 300, 150],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        hoverOffset: 4,
      },
    ],
  };

  // Data untuk Grafik Radar (Radar Chart)
  const radarChartData = {
    labels: ['Kinerja A', 'Kinerja B', 'Kinerja C', 'Kinerja D'], 
    datasets: [
      {
        label: 'Evaluasi',
        data: [8, 6, 7, 5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // Opsi untuk Grafik Garis (Line Chart)
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: true,
        text: 'Perkembangan Penjualan', 
      },
    },
  };

  // Opsi untuk Grafik Batang (Bar Chart)
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: true,
        text: 'Pendapatan Bulanan', 
      },
    },
  };

  // Opsi untuk Grafik Radar (Radar Chart)
  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: true,
        text: 'Evaluasi Kinerja', 
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 10, 
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    }
  };


  const chartRef = useRef(null); 

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">

      {/* Bagian Kartu Ringkasan (Summary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mb-8"> 
        
        {/* Kartu: Total Pengguna */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4"> 
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FaUsers className="text-2xl sm:text-3xl" /> 
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Total Pengguna</h2> 
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
            <p className="text-gray-600 mt-1 sm:mt-2">Rp48.300.000</p> 
          </div>
        </div>

        {/* Kartu: Total Pesanan */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaClipboardList className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Total Pesanan</h2>
            <p className="text-gray-600 mt-1 sm:mt-2">1.750</p>
          </div>
        </div>
      </div>

      {/* Bagian Grafik (Charts Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-8"> 
        
        {/* Kartu Grafik Garis: Penjualan Bulanan */}
        <div className="bg-white p-5 rounded-lg shadow-md h-80 sm:h-96"> 
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Penjualan Bulanan</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Kartu Grafik Batang: Pendapatan Bulanan */}
        <div className="bg-white p-5 rounded-lg shadow-md h-80 sm:h-96">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Pendapatan Bulanan</h2> 
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {/* Kartu Grafik Pie: Distribusi Pengguna */}
        <div className="bg-white p-5 rounded-lg shadow-md h-80 sm:h-96 flex flex-col justify-center items-center"> 
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Distribusi Pengguna</h2> 
          <div className="w-full max-w-xs h-full flex items-center justify-center"> 
             <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Kartu Grafik Radar: Evaluasi Kinerja */}
        <div className="bg-white p-5 rounded-lg shadow-md h-80 sm:h-96"> 
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Evaluasi Kinerja</h2> 
          <Radar data={radarChartData} options={radarChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;