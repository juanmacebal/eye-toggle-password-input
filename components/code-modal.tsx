"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  code: string
}

export function CodeModal({ isOpen, onClose, title, description, code }: CodeModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="relative">
          <pre className="max-h-[60vh] overflow-auto rounded-md bg-gray-100 dark:bg-gray-900 p-4 text-sm font-mono">
            <code>{code}</code>
          </pre>
          <Button variant="outline" size="sm" className="absolute top-2 right-2 gap-1" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
