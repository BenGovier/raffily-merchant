import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SimpleCTA({ children, href, className = "" }) {
  return (
    <Button
      asChild
      className={`bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-6 rounded-xl ${className}`}
      variant="default"
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

