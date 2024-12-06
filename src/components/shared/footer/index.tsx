import React from 'react';

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between background-light-white_dark-black ">
      <span className=" text-center px-6 py-3 text-sm text-light-white_dark-black">
        © {new Date().getFullYear()} Techechelons Information Pvt. Ltd. All
        rights reserved.
      </span>
    </div>
  );
};

export default Footer;
