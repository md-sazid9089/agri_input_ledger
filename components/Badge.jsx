export default function Badge({ type, variant = 'category' }) {
  const getStyles = () => {
    if (variant === 'category') {
      switch (type) {
        case 'Seed':
          return 'bg-amber-100 text-amber-800';
        case 'Fertilizer':
          return 'bg-blue-100 text-blue-800';
        case 'Pesticide':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    } else if (variant === 'certification') {
      switch (type) {
        case 'Govt Approved':
          return 'bg-green-100 text-green-800';
        case 'NGO Verified':
          return 'bg-purple-100 text-purple-800';
        case 'Company Certified':
          return 'bg-indigo-100 text-indigo-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStyles()}`}>
      {type}
    </span>
  );
}
