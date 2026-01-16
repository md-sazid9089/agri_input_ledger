import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Badge from '@/components/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Fetch single item from API
async function getItem(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

export default async function ItemDetailsPage({ params }) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm glass inline-block px-4 py-2 rounded-full">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/items" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">Items</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-semibold">{item.name}</span>
          </nav>

          <div className="glass rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative h-96 lg:h-auto bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge type={item.category} />
                  <Badge type={item.certification} variant="certification" />
                </div>

                {/* Name */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {item.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">৳{item.price}</span>
                  <span className="ml-3 text-gray-600 font-semibold">per unit</span>
                </div>

                {/* Vendor */}
                {item.vendor && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-600">Vendor</p>
                    <p className="text-lg font-semibold text-gray-900">{item.vendor}</p>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                {/* Crop Tags */}
                {item.cropTags && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Suitable for Crops</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.cropTags.split(',').map((crop, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {crop.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="border-t border-white/20 p-8 bg-gradient-to-br from-gray-50/50 to-emerald-50/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dosage Information */}
                {item.dosage && (
                  <div className="glass border-l-4 border-blue-500 p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl mr-4 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Dosage & Application</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.dosage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Notes */}
                {item.safetyNotes && (
                  <div className="glass border-l-4 border-red-500 p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-2xl mr-4 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Safety Notes</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.safetyNotes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Warning Banner */}
              <div className="mt-8 glass border-l-4 border-yellow-500 p-6 rounded-2xl">
                <div className="flex items-start">
                  <svg className="w-7 h-7 text-yellow-600 mr-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Important</h4>
                    <p className="text-gray-700 text-sm">
                      Always read and follow the manufacturer&apos;s instructions on the product label. 
                      Use appropriate protective equipment and dispose of containers safely.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 glass border-t border-white/20">
              <Link href="/items" className="btn-secondary inline-block">
                ← Back to All Items
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
