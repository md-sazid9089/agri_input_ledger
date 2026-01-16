import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ItemCard from '@/components/ItemCard';

// Fetch featured items on server
async function getFeaturedItems() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    
    const items = await res.json();
    return items.slice(0, 6); // Return first 6 items
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

export default async function Home() {
  const featuredItems = await getFeaturedItems();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-emerald-600 to-teal-700">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
          
          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block glass-dark px-4 py-2 rounded-full text-emerald-300 text-sm font-semibold mb-6 animate-pulse">
                  🌾 Supporting SDG 2: Zero Hunger
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                  Verified Agricultural Inputs for Better Yields
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-emerald-50 leading-relaxed">
                  Access a public catalog of certified seeds, fertilizers, and pesticides. 
                  Reduce crop loss, improve productivity, and contribute to Zero Hunger.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/items" className="glass text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-white/20 border-2 border-white/30">
                    Browse Inputs
                  </Link>
                  <Link href="/login" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 hover:scale-110 shadow-2xl border border-white/40">
                    Admin Login
                  </Link>
                </div>
              </div>
              <div className="relative h-96 lg:h-[500px] hidden lg:block">
                <div className="absolute inset-0 glass rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800"
                    alt="Agricultural inputs"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Problem Section */}
        <section className="relative">
          <div className="section-container">
            <h2 className="section-title text-center">The Challenge We Address</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Farmers face critical obstacles that threaten food security and livelihoods
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-modern border-l-4 border-red-500 hover:border-red-600">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Counterfeit Inputs</h3>
                </div>
                <p className="text-gray-700">
                  Up to 30% of agricultural inputs in Bangladesh are counterfeit or substandard, 
                  leading to crop failures and financial losses for farmers.
                </p>
              </div>

              <div className="card-modern border-l-4 border-orange-500 hover:border-orange-600">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">Wrong Dosage</h3>
                </div>
                <p className="text-gray-700">
                  Lack of proper information leads to over-application or under-application, 
                  causing environmental damage, health risks, and reduced effectiveness.
                </p>
              </div>

              <div className="card-modern border-l-4 border-yellow-500 hover:border-yellow-600">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">Price Manipulation</h3>
                </div>
                <p className="text-gray-700">
                  Opaque pricing and lack of market information allow middlemen to exploit farmers 
                  through inflated prices and unfair practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How Verification Works Section */}
        <section className="bg-gray-50">
          <div className="section-container">
            <h2 className="section-title text-center">How Verification Works</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              A transparent process ensuring quality and authenticity
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line connector */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-300 hidden md:block"></div>
                
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                      1
                    </div>
                    <div className="ml-6 bg-white p-6 rounded-lg shadow-md flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Product Information</h3>
                      <p className="text-gray-700">
                        Manufacturers or distributors submit detailed product information including 
                        composition, dosage, safety data, and quality certifications.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                      2
                    </div>
                    <div className="ml-6 bg-white p-6 rounded-lg shadow-md flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Verification by Authorities</h3>
                      <p className="text-gray-700">
                        Government agencies, NGOs, or certified bodies review and verify product claims, 
                        test samples, and validate certifications against standards.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                      3
                    </div>
                    <div className="ml-6 bg-white p-6 rounded-lg shadow-md flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Publish to Public Catalog</h3>
                      <p className="text-gray-700">
                        Once verified, products are added to the public catalog with complete information, 
                        badges, and verification status accessible to all farmers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Featured Inputs Section */}
        <section className="relative">
          <div className="section-container">
            <h2 className="section-title text-center">Featured Verified Inputs</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Browse our catalog of certified agricultural products
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/items" className="btn-primary inline-block">
                View All Inputs
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Dosage & Safety First Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50">
          <div className="section-container">
            <h2 className="section-title text-center">Dosage & Safety First</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Proper usage is critical for safety, effectiveness, and environmental protection
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* PPE Requirements */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-red-500 p-3 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900">Personal Protective Equipment</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Always wear gloves when handling fertilizers and pesticides</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Use respiratory masks when spraying pesticides</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Wear long-sleeved protective clothing and boots</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Protect eyes with safety goggles or face shields</span>
                  </li>
                </ul>
              </div>

              {/* Storage & Warnings */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 p-3 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900">Storage & Warnings</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Store in cool, dry place away from food and animal feed</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Keep out of reach of children and pets at all times</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Never use food containers for storing chemicals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Dispose of empty containers properly, never burn them</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-red-100 border-l-4 border-red-500 p-6 max-w-4xl mx-auto rounded-lg">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-red-800 mb-2">CRITICAL: Always Follow Label Instructions</h4>
                  <p className="text-red-700">
                    Using incorrect dosages can harm crops, contaminate soil and water, endanger health, 
                    and waste money. Always read and follow the manufacturer&apos;s instructions carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Browse by Crop Section */}
        <section className="bg-white">
          <div className="section-container">
            <h2 className="section-title text-center">Browse by Crop Type</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Find the right inputs for your specific crops
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="/items?crop=rice" className="group">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-lg p-8 text-center transition-all duration-300 shadow-md hover:shadow-xl">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Rice / Paddy</h3>
                  <p className="text-sm text-gray-600 mt-2">Seeds, Fertilizers & Protection</p>
                </div>
              </Link>

              <Link href="/items?crop=wheat" className="group">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg p-8 text-center transition-all duration-300 shadow-md hover:shadow-xl">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Wheat</h3>
                  <p className="text-sm text-gray-600 mt-2">High-Yield Varieties</p>
                </div>
              </Link>

              <Link href="/items?crop=maize" className="group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-lg p-8 text-center transition-all duration-300 shadow-md hover:shadow-xl">
                  <div className="text-6xl mb-4">🌽</div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Maize / Corn</h3>
                  <p className="text-sm text-gray-600 mt-2">Hybrid Seeds & Nutrition</p>
                </div>
              </Link>

              <Link href="/items?crop=vegetables" className="group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg p-8 text-center transition-all duration-300 shadow-md hover:shadow-xl">
                  <div className="text-6xl mb-4">🥬</div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Vegetables</h3>
                  <p className="text-sm text-gray-600 mt-2">Tomato, Cabbage & More</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. SDG 2 Impact Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 text-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  UN SDG 2: ZERO HUNGER
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Supporting Global Food Security
                </h2>
                <p className="text-xl text-primary-50 mb-6">
                  The AgriInput Ledger directly contributes to achieving Sustainable Development Goal 2 
                  by ensuring farmers have access to verified, quality agricultural inputs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Increase Crop Yields</h4>
                      <p className="text-primary-100">Verified seeds and fertilizers help farmers achieve 20-40% higher productivity</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Reduce Crop Losses</h4>
                      <p className="text-primary-100">Quality pesticides and proper dosage information prevent post-harvest losses</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Empower Smallholder Farmers</h4>
                      <p className="text-primary-100">Transparent pricing and verified products protect against exploitation</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Promote Sustainable Agriculture</h4>
                      <p className="text-primary-100">Safety information and organic options encourage environmentally-friendly practices</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Impact by Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">12+</div>
                    <div className="text-gray-600">Verified Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                    <div className="text-gray-600">Transparency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">3</div>
                    <div className="text-gray-600">Certification Types</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
                    <div className="text-gray-600">Public Access</div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-700 text-center italic">
                    &quot;This platform helps us choose the right products and avoid fake inputs. 
                    Our yields have improved significantly.&quot;
                  </p>
                  <p className="text-gray-600 text-center mt-2">— Farmer Testimonial</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-50">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Explore Verified Inputs?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Browse our complete catalog of certified agricultural products and make informed decisions for your farm.
            </p>
            <Link href="/items" className="btn-primary inline-block text-lg">
              Browse All Inputs →
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
