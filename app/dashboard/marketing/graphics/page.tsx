export default function GraphicsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Graphics Generator</h1>
        <a href="/dashboard/marketing" className="ml-auto text-sm text-[#00B8A9] hover:underline">
          ← Back to Marketing Hub
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
        <div className="w-24 h-24 bg-[#00B8A9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#00B8A9]"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 15L16 10L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4">Graphics Generation Tools Coming Soon!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          We're building powerful tools to help you create eye-catching graphics for your raffle campaigns. From social
          media posts to email banners, our platform will make design effortless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Social Media Graphics</h3>
            <p className="text-sm text-gray-500">Create graphics optimized for different social platforms</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Email Banners</h3>
            <p className="text-sm text-gray-500">Design eye-catching email headers and banners</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Promotional Materials</h3>
            <p className="text-sm text-gray-500">Generate graphics for various promotional needs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
