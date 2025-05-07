import Image from "next/image"

interface AuthorProps {
  author:
    | {
        name: string
        role?: string
        image?: string
        bio?: string
      }
    | string
}

export default function BlogAuthor({ author }: AuthorProps) {
  // Handle string author
  if (typeof author === "string") {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image src="/placeholder.svg?height=100&width=100" alt={author} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{author}</h3>
            <p className="text-white/70">Contributor</p>
          </div>
        </div>
      </div>
    )
  }

  // Handle object author
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <Image
            src={author.image || "/placeholder.svg?height=100&width=100"}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{author.name}</h3>
          <p className="text-white/70">{author.role || "Contributor"}</p>
        </div>
      </div>
      {author.bio && <p className="mt-4 text-white/80">{author.bio}</p>}
    </div>
  )
}
