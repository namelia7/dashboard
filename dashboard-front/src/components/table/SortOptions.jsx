import React from 'react';

const SortOptions = ({ value, onChange }) => (
  <select
    className="p-2 border border-gray-300 rounded-lg w-full text-gray-700 text-sm md:text-base focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out" // Penyesuaian padding, ukuran teks responsif, focus ring
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Urutkan Berdasarkan</option>
    <option value="terbaru">Terbaru</option> 
    <option value="terlama">Terlama</option> 
    <option value="abjad">Abjad</option> 
  </select>
);

export default SortOptions;