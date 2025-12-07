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
        className="peer w-full rounded-lg border border-gray-300 px-4 pt-5 pb-2 text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-primary-dark peer-focus:text-sm cursor-text select-none"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;

