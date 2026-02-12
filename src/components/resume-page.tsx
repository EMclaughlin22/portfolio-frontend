import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type ResumePageProps = {
  onBack: () => void
}

export function ResumePage({ onBack }: ResumePageProps) {
  return (
    <main className="bg-background text-foreground relative h-svh w-full overflow-hidden">
      <div className="absolute top-3 left-3 z-10 sm:top-4 sm:left-4">
        <Button variant="outline" size="sm" onClick={onBack} className="bg-background/95 backdrop-blur">
          <ArrowLeftIcon data-icon="inline-start" />
          Back
        </Button>
      </div>
      <iframe
        src="/Mclaughlin_Enrique_Resume_V3.pdf"
        title="Mclaughlin Enrique Resume"
        className="h-full w-full"
      />
    </main>
  )
}
