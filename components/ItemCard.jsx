import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';

export default function ItemCard({ item }) {
  return (
    <div className="card-modern overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-5">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="px-1">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge type={item.category} />
          <Badge type={item.certification} variant="certification" />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
            ৳{item.price}
          </div>
          <div className="text-xs text-gray-500">
            per unit
          </div>
        </div>

        {/* Vendor */}
        {item.vendor && (
          <p className="text-xs text-gray-500 mb-4">
            by {item.vendor}
          </p>
        )}

        {/* View Details Button */}
        <Link
          href={`/items/${item.id}`}
          className="block w-full text-center bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
