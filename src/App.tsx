import { useState } from "react"

import { ContactPage } from "@/components/contact-page"
import { HomePage } from "@/components/home-page"
import { ResumePage } from "@/components/resume-page"

type Page = "home" | "resume" | "contact"

function getInitialPage(): Page {
  if (typeof window === "undefined") {
    return "home"
  }

  const page = new URLSearchParams(window.location.search).get("page")
  if (page === "resume" || page === "contact" || page === "home") {
    return page
  }

  return "home"
}

export function App() {
  const [page, setPage] = useState<Page>(getInitialPage)

  function navigateTo(nextPage: Page) {
    setPage(nextPage)

    if (typeof window === "undefined") {
      return
    }

    const url = new URL(window.location.href)
    if (nextPage === "home") {
      url.searchParams.delete("page")
    } else {
      url.searchParams.set("page", nextPage)
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)
  }

  if (page === "resume") {
    return <ResumePage onBack={() => navigateTo("home")} />
  }

  if (page === "contact") {
    return <ContactPage onBack={() => navigateTo("home")} />
  }

  return (
    <HomePage
      onOpenResume={() => navigateTo("resume")}
      onOpenContact={() => navigateTo("contact")}
    />
  )
}

export default App
