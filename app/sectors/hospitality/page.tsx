import Link from "next/link"

export default function HospitalityPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Hospitality Sector</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Elevate Guest Experiences with Raffily
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Streamline operations, personalize guest interactions, and boost satisfaction with our tailored solutions
            for the hospitality industry.
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Personalized Guest Experiences</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Craft unique and memorable experiences for each guest, from tailored recommendations to personalized
                offers.
              </dd>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
              >
                See It in Action
              </Link>
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
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M3 6V4m0 2L5 8m-3 6l3-1m0 0l-3-9a5.002 5.002 0 006.002 0m3 16V16m0 2L10 14m-3 6l3-1m0 0l-3-9a5.002 5.002 0 006.002 0M9 6V4m0 2L11 8m-3 6l3-1m0 0l-3-9a5.002 5.002 0 006.002 0M15 16V16m0 2L17 14m-3 6l3-1m0 0l-3-9a5.002 5.002 0 006.002 0M21 6V4m0 2L19 8m-3 6l3-1m0 0l-3-9a5.002 5.002 0 006.002 0"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Efficient Operations</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Automate tasks, optimize resource allocation, and streamline workflows to improve efficiency and reduce
                costs.
              </dd>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
              >
                See It in Action
              </Link>
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
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Data-Driven Insights</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Gain valuable insights into guest behavior, preferences, and trends to make informed decisions and
                improve your offerings.
              </dd>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
              >
                See It in Action
              </Link>
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
                      d="M7 8h10M7 12h4m14-4l-4.645 4.646a5.5 5.5 0 01-7.778 7.778l-4.646-4.645a5.5 5.5 0 017.778-7.778L21 4z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Seamless Integration</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Integrate with your existing systems and platforms for a smooth and hassle-free implementation.
              </dd>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
              >
                See It in Action
              </Link>
            </div>
          </dl>
        </div>

        <div className="mt-12 lg:text-center">
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Ready to transform your hospitality business?
          </p>
          <div className="mt-6">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

