const ContactInfoCard = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="p-3 bg-[#e1fbec] rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-beige font-semibold text-base lg:text-lg">{label}</p>
      <p className="text-gray-300 text-sm lg:text-base">{value}</p>
    </div>
  </div>
);

export default ContactInfoCard;

// const ContactInfoCard = ({ icon, label, value }) => (
//   <div className="flex items-center gap-4">
//     <div className="p-3 rounded-2xl bg-[#050b25] border border-[#1d2b5a] shadow-[0_0_18px_rgba(96,165,250,0.25)] flex items-center justify-center">
//       {icon}
//     </div>
//     <div>
//       <p className="text-[#E5F0FF] font-semibold text-base lg:text-lg">
//         {label}
//       </p>
//       <p className="text-[#9CA3AF] text-sm lg:text-base">{value}</p>
//     </div>
//   </div>
// );

// export default ContactInfoCard;
