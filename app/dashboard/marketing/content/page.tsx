export default function ContentCreationPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Content Creation</h1>
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
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4">Content Creation Tools Coming Soon!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          We're developing powerful AI-driven content creation tools to help you craft compelling copy for your raffle
          campaigns. From promotional descriptions to winner announcements, our platform will make content creation
          effortless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Raffle Descriptions</h3>
            <p className="text-sm text-gray-500">Generate compelling descriptions for your raffles</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Winner Announcements</h3>
            <p className="text-sm text-gray-500">Create exciting winner announcement content</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Promotional Copy</h3>
            <p className="text-sm text-gray-500">Generate promotional copy for various channels</p>
          </div>
        </div>
      </div>
    </div>
  )
}
