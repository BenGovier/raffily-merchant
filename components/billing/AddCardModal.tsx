"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { SimplePaymentForm } from "./SimplePaymentForm"

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AddCardModal({ isOpen, onClose, onSuccess }: AddCardModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    }
    onClose()
    router.refresh()
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            A payment method is required to create raffles. You will only be charged based on your usage.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert className="bg-red-50 border border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <SimplePaymentForm userId="demo-user" onSuccess={handleSuccess} onError={setError} />

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

