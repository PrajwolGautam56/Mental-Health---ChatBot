// Header.js

import React from 'react';

const Header = () => {
  // Replace 'headerImageURL' with the actual URL of the image you want to use for the header
  const headerImageURL = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDvlb3x5nK3MesvcsPMaDx_fjFvaHb2ssyEbXKVGxRJw&s`; 

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={headerImageURL} alt="Botai" className="w-12 h-12 rounded-full mr-4" />
        <h1 className="text-white text-xl font-bold">Botai</h1>
      </div>
    </div>
  );
};

export default Header;
