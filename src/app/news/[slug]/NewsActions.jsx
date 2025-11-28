"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { LinkIcon } from "lucide-react";
import Swal from "sweetalert2";

export default function NewsActions({ slug }) {
  const url = `${process.env.NEXT_PUBLIC_APP_API_URL}news/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      Swal.fire({
        icon: "success",
        title: "Link copied!",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      });
    });
  };

  return (
    <div className="flex items-center gap-1 lg:gap-3 mt-0">
      <FacebookShareButton url={url}>
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:opacity-80">
          <FaFacebookF size={18} />
        </div>
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:opacity-80">
          <FaLinkedinIn size={18} />
        </div>
      </LinkedinShareButton>

      <WhatsappShareButton url={url}>
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-green-600 text-white hover:opacity-80">
          <FaWhatsapp size={18} />
        </div>
      </WhatsappShareButton>

      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-gray-400 text-white hover:opacity-80 cursor-pointer"
      >
        <LinkIcon size={18} />
      </button>
    </div>
  );
}
