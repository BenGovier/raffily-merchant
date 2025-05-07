import Image from "next/image"

export default function Leadership() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#0A1F44] mb-12">Our Leadership</h2>

        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/allex%20mollart-G9v2kDkBF3OppuIqbgfuGMuF8bF2OA.jpeg"
                alt="Alex Mollart"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-[#0A1F44] mb-2">Alex Mollart</h3>
              <p className="text-[#00B8A9] font-semibold mb-4">Chief Executive Officer</p>
              <p className="text-gray-600">
                Alex brings over 15 years of experience in customer engagement and digital marketing to Raffily. His
                vision has been instrumental in developing innovative raffle solutions that help businesses boost
                engagement, reduce churn, and capture valuable customer insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
