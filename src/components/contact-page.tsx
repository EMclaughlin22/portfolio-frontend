import { useEffect, useState, type ReactNode } from "react"
import { ArrowLeftIcon, GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "lucide-react"

import { QrCodeCard } from "@/components/qr-code-card"
import { Button } from "@/components/ui/button"

type ContactPageProps = {
  onBack: () => void
}

type QrCodeItem = {
  label: string
  href: string
  imgSrc: string
  imgAlt: string
}

const CONTACT = {
  firstName: "Enrique",
  lastName: "McLaughlin",
  fullName: "Enrique McLaughlin",
  email: "enrique.mclaughlin.careers@gmail.com",
  phone: "347.779.5385",
  linkedin: "https://www.linkedin.com/in/enrique-mclaughlin",
  github: "https://github.com/enrique-mclaughlin",
  title: "Investment Banking Analyst",
  company: "Citi, M&A Group",
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [expandedQr, setExpandedQr] = useState<QrCodeItem | null>(null)
  const qrPayload = buildQrContactPayload()
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&margin=0&data=${encodeURIComponent(qrPayload)}`
  const currentPageUrl =
    typeof window === "undefined" ? "" : window.location.href
  const emailQrSrc = buildQrCodeSrc(`mailto:${CONTACT.email}`)
  const linkedinQrSrc = buildQrCodeSrc(CONTACT.linkedin)
  const githubQrSrc = buildQrCodeSrc(CONTACT.github)
  const pageQrSrc = buildQrCodeSrc(currentPageUrl)
  const qrItems: QrCodeItem[] = [
    {
      label: "Contact Card",
      href: currentPageUrl || "#",
      imgSrc: qrCodeSrc,
      imgAlt: "QR code with phone, email, and LinkedIn details",
    },
    {
      label: "Email",
      href: `mailto:${CONTACT.email}`,
      imgSrc: emailQrSrc,
      imgAlt: "QR code for email address",
    },
    {
      label: "LinkedIn",
      href: CONTACT.linkedin,
      imgSrc: linkedinQrSrc,
      imgAlt: "QR code for LinkedIn profile",
    },
    {
      label: "GitHub",
      href: CONTACT.github,
      imgSrc: githubQrSrc,
      imgAlt: "QR code for GitHub profile",
    },
    {
      label: "This Page",
      href: currentPageUrl || "#",
      imgSrc: pageQrSrc,
      imgAlt: "QR code for this contact page",
    },
  ]

  async function handleSaveContact() {
    const vcf = buildVCard()
    const fileName = "enrique-mclaughlin-contact.vcf"
    const vcfBlob = new Blob([vcf], { type: "text/vcard;charset=utf-8" })

    try {
      const canUseNativeShare =
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        typeof File !== "undefined" &&
        navigator.canShare({
          files: [new File([vcfBlob], fileName, { type: vcfBlob.type })],
        })

      if (canUseNativeShare) {
        await navigator.share({
          title: CONTACT.fullName,
          text: "Save contact",
          files: [new File([vcfBlob], fileName, { type: vcfBlob.type })],
        })
        return
      }
    } catch {
      // Fall through to download when native share is unsupported or blocked.
    }

    downloadVCard(vcfBlob, fileName)
  }

  useEffect(() => {
    if (!expandedQr) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedQr(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [expandedQr])

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeftIcon data-icon="inline-start" />
            Back
          </Button>
          <p className="text-sm font-medium">Contact</p>
        </div>

        <section className="border-border/70 bg-card rounded-xl border overflow-hidden">
          <div
            className="h-40 w-full bg-[linear-gradient(120deg,oklch(0.72_0.11_239),oklch(0.86_0.03_240),oklch(0.66_0.12_236))]"
            aria-label="Profile banner placeholder"
          />

          <div className="p-5 sm:p-6">
            <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <img
                src="/contact-photo.jpg"
                alt="Enrique McLaughlin portrait"
                className="border-background h-28 w-28 rounded-full border-4 object-cover object-[50%_30%]"
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {CONTACT.fullName}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {CONTACT.title}
                </p>
                <p className="text-muted-foreground text-sm">{CONTACT.company}</p>
              </div>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <ContactItem icon={<MailIcon className="size-4" />} label="Email">
                {CONTACT.email}
              </ContactItem>
              <ContactItem icon={<PhoneIcon className="size-4" />} label="Phone">
                {CONTACT.phone}
              </ContactItem>
              <ContactItem
                icon={<LinkedinIcon className="size-4" />}
                label="LinkedIn"
                href={CONTACT.linkedin}
              >
                linkedin.com/in/enrique-mclaughlin
              </ContactItem>
              <ContactItem
                icon={<GithubIcon className="size-4" />}
                label="GitHub"
                href={CONTACT.github}
              >
                github.com/enrique-mclaughlin
              </ContactItem>
            </div>

            <div className="mt-6 space-y-4">
              <div className="border-border/70 flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="mb-1 text-sm font-medium">Save Contact</p>
                  <p className="text-muted-foreground text-xs">
                    Share natively on supported devices or download a contact file.
                  </p>
                </div>
                <Button variant="outline" onClick={handleSaveContact}>
                  Save to Contacts
                </Button>
              </div>

              <div>
                <p className="text-muted-foreground mb-3 text-xs tracking-[0.16em] uppercase">
                  QR Codes
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                  {qrItems.map((qrItem) => (
                    <QrCodeCard
                      key={qrItem.label}
                      label={qrItem.label}
                      href={qrItem.href}
                      imgSrc={qrItem.imgSrc}
                      imgAlt={qrItem.imgAlt}
                      onExpand={setExpandedQr}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {expandedQr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          onClick={() => setExpandedQr(null)}
        >
          <img
            src={expandedQr.imgSrc}
            alt={expandedQr.imgAlt}
            className="h-80 w-80 max-w-[90vw] rounded-xl border bg-white p-2 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}

type ContactItemProps = {
  icon: ReactNode
  label: string
  href?: string
  children: ReactNode
}

function ContactItem({ icon, label, href, children }: ContactItemProps) {
  return (
    <div className="border-border/70 rounded-lg border p-3">
      <p className="text-muted-foreground mb-1 text-xs uppercase">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary inline-flex items-center gap-2 text-sm"
        >
          {icon}
          {children}
        </a>
      ) : (
        <p className="inline-flex items-center gap-2 text-sm">
          {icon}
          {children}
        </p>
      )}
    </div>
  )
}

function buildVCard() {
  const phone = CONTACT.phone.replace(/[^\d+]/g, "")

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
    `FN:${CONTACT.fullName}`,
    `TITLE:${CONTACT.title}`,
    `ORG:${CONTACT.company}`,
    `TEL;TYPE=CELL:${phone}`,
    `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
    `URL;TYPE=LinkedIn:${CONTACT.linkedin}`,
    `URL;TYPE=GitHub:${CONTACT.github}`,
    "END:VCARD",
  ].join("\n")
}

function downloadVCard(vcfBlob: Blob, fileName: string) {
  const url = URL.createObjectURL(vcfBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.rel = "noopener"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Delay revoke so Safari/desktop browsers complete the download first.
  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1500)
}

function buildQrContactPayload() {
  const normalizedPhone = CONTACT.phone.replace(/[^\d+]/g, "")

  return [
    "MECARD:",
    `N:${CONTACT.lastName},${CONTACT.firstName};`,
    `TEL:${normalizedPhone};`,
    `EMAIL:${CONTACT.email};`,
    `URL:${CONTACT.linkedin};`,
    ";",
  ].join("")
}

function buildQrCodeSrc(value: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&margin=0&data=${encodeURIComponent(value)}`
}
