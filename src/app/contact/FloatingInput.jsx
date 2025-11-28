import React from "react";

const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) => {
  const handleKeyDown = (e) => {
    if (
      name === "mobileNumber" &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key) &&
      !/^\d$/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        required={required}
        placeholder=" "
        maxLength={name === "mobileNumber" ? 10 : undefined}
        inputMode={name === "mobileNumber" ? "numeric" : undefined}
        className="peer w-full rounded-lg border border-gray-300 px-4 pt-5 pb-2 text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#186f3e] focus:border-[#186f3e]"
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[#186f3e] peer-focus:text-sm cursor-text select-none"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
// import React from "react";

// const FloatingInput = ({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   required,
// }) => {
//   const handleKeyDown = (e) => {
//     if (
//       name === "mobileNumber" &&
//       !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key) &&
//       !/^\d$/.test(e.key)
//     ) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="relative">
//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         onKeyDown={handleKeyDown}
//         required={required}
//         placeholder=" "
//         maxLength={name === "mobileNumber" ? 10 : undefined}
//         inputMode={name === "mobileNumber" ? "numeric" : undefined}
//         className="
//           peer w-full rounded-xl border bg-[#020617] border-[#1F2937]
//           px-4 pt-5 pb-2 text-sm md:text-base text-slate-100
//           placeholder-transparent
//           focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400
//           transition
//         "
//       />
//       <label
//         htmlFor={name}
//         className="
//           absolute left-4 top-2 text-slate-400 text-xs md:text-sm
//           transition-all
//           peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500
//           peer-focus:top-1 peer-focus:text-emerald-300 peer-focus:text-xs
//           cursor-text select-none
//         "
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// export default FloatingInput;

