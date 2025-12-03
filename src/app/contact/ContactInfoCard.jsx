const ContactInfoCard = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="p-3 bg-beige rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-beige font-semibold text-base lg:text-lg">{label}</p>
      <p className="text-gray-300 text-sm lg:text-base">{value}</p>
    </div>
  </div>
);

export default ContactInfoCard;


