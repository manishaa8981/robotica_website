"use client";

import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({
  totalPages = 1,
  currentPage = 1,
  onPageChange,
}) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      forcePage={currentPage - 1}
      containerClassName="flex items-center justify-center gap-1 mt-5"
      // Pages
      pageClassName="px-3 py-1 border border-[#141718] rounded cursor-pointer hover:bg-gray-200"
      activeClassName="bg-[#0275BD] text-white hover:bg-blue-700"
      // Previous / Next
      previousClassName="px-3 py-1 border border-[#141718] rounded cursor-pointer hover:bg-[#0275BD] hover:border-[#0275BD] hover:text-white"
      nextClassName="px-3 py-1 border border-[#141718] rounded cursor-pointer hover:bg-[#0275BD] hover:border-[#0275BD] hover:text-white"
      // Ellipsis
      breakClassName="px-3 py-1 border border-[#141718] rounded"
      // Disabled
      disabledClassName="opacity-50 cursor-not-allowed"
      previousLabel="Previous"
      nextLabel="Next"
    />
  );
}
