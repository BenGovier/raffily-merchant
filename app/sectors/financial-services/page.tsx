import Link from "next/link"

const FinancialServicesPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Financial Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Empowering Financial Institutions with Raffily
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Raffily helps financial services companies streamline operations, enhance customer experiences, and drive
            growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
            >
              See It in Action
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/globe-alt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m-9-9a9 9 0 019-9m-9 9h18"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Global Reach</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Expand your financial services globally with our secure and compliant platform.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/scale */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M3 6V4m0 2l5-1m5 1l3-3m-3 3v5M6 4l5 1m5-1l3 3"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Scalable Solutions</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our platform scales with your business, ensuring you can handle increasing transaction volumes and
                customer demands.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/lightning-bolt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Faster Transactions</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Process transactions faster and more efficiently, reducing wait times and improving customer
                satisfaction.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/shield-check */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure and Compliant</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Ensure the security of your financial data and comply with industry regulations with our robust security
                measures.
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 lg:text-center">
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Ready to transform your financial services operations?
          </p>
          <div className="mt-6 lg:flex lg:justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialServicesPage

