// This is a placeholder file. Since there was no existing code, I am creating a basic structure for app/features/page.tsx and incorporating the updates.

import Link from "next/link"

const FeaturesPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Features</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Feature 1</h2>
        <p className="text-gray-700 mb-4">
          Description of Feature 1. This section will include a "See It in Action" button.
        </p>
        <Link
          href="#demo"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
        >
          See It in Action
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Feature 2</h2>
        <p className="text-gray-700 mb-4">
          Description of Feature 2. This section will also include a "See It in Action" button.
        </p>
        <Link
          href="#demo"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
        >
          See It in Action
        </Link>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-gray-700 mb-8">Contact us for a demo.</p>
        <Link
          href="/request-demo"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
        >
          GET DEMO
        </Link>
      </section>
    </div>
  )
}

export default FeaturesPage
