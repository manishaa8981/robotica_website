const FloatingTextarea = ({ label, name, value, onChange, required }) => (
  <div className="relative">
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={5}
      placeholder=" "
      className="peer w-full resize-none rounded-lg bg-white border border-gray-300 px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
    />
    <label
      htmlFor={name}
      className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-black peer-focus:text-sm cursor-text select-none"
    >
      {label}
    </label>
  </div>
);

export default FloatingTextarea;
