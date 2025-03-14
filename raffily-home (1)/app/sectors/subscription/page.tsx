import Link from "next/link"

const SubscriptionPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Subscription Management</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Effortlessly Manage Your Subscriptions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Simplify subscription billing, automate recurring payments, and gain insights into customer behavior.
          </p>
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
                      d="M21 12a9 9 0 01-9 9m-9-9a9 9 0 019-9m-3 3v6m6-3h-6"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automated Billing</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Set up recurring billing cycles and automate payment processing to save time and reduce manual effort.
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
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M3 6V4m0 2L5 8m-3 6l3-1m0 0l-3-9a5.002 5.002 0 006.002 0m3 16V16m0 0l-3.437-5.153a5.002 5.002 0 00-1.565-3.847m13 7v-3m0 0l6-3M6 16v-3m0 0l6-3"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Analytics</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Track key subscription metrics, such as churn rate, customer lifetime value, and revenue growth, with
                comprehensive analytics dashboards.
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
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Flexible Plans</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Create customizable subscription plans with different pricing tiers, features, and billing frequencies
                to meet the diverse needs of your customers.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Heroicon name: outline/annotation */}
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
                      d="M7 8h10M7 12h4m14-4l-4.645 4.646a5.002 5.002 0 01-7.07 0L1.935 8.936m12.128-1.285l4.586-4.586a10.002 10.002 0 00-14.14 0L1.935 8.936m12.128-1.285l-4.586-4.586a10.002 10.002 0 00-14.14 0L15.065 19.064m-1.414-1.414l4.586-4.586a10.002 10.002 0 00-14.14 0L16.479 20.478m-1.414-1.414l-4.586-4.586a10.002 10.002 0 00-14.14 0L17.893 21.892"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customer Portal</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Empower customers to manage their subscriptions, update payment information, and access invoices through
                a self-service portal.
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 lg:mt-16 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Ready to Transform Your Subscription Management?
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Streamline your subscription processes and unlock new revenue opportunities with our powerful platform.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <Link
              href="#demo"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
            >
              See It in Action
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/request-demo"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage

