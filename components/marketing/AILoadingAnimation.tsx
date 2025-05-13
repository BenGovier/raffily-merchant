export function AILoadingAnimation() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-1">
        <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
      </div>
    </div>
  )
}

