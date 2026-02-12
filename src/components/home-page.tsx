import { ArrowUpRightIcon, BriefcaseIcon, MailIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

type HomePageProps = {
  onOpenResume: () => void
  onOpenContact: () => void
}

export function HomePage({ onOpenResume, onOpenContact }: HomePageProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar side="left" collapsible="offcanvas">
        <SidebarHeader className="gap-3 p-4">
          <p className="text-base font-semibold">Portfolio</p>
          <p className="text-sidebar-foreground/70 text-sm">
            Navigation and quick actions
          </p>
        </SidebarHeader>
        <SidebarSeparator className="mx-0 w-full" />
        <SidebarContent>
          <SidebarGroup className="px-3 py-3">
            <SidebarGroupLabel className="h-auto px-2 pb-2 text-sm font-medium">
              Sections
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                <SidebarMenuItem>
                  <SidebarMenuButton isActive className="h-10 text-sm">
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-10 text-sm">
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 text-sm"
                    onClick={onOpenContact}
                  >
                    <span>Contact</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 text-sm"
                    onClick={onOpenResume}
                  >
                    <span>Resume</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 pt-2">
          <Button variant="outline" className="h-10 w-full text-sm" asChild>
            <a
              href="/Mclaughlin_Enrique_Resume_V3.pdf"
              download="Mclaughlin_Enrique_Resume_V3.pdf"
            >
              Download Resume
            </a>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <LeftSidebarSeparator />

      <SidebarInset>
        <main className="bg-background text-foreground min-h-screen">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
            <SidebarTrigger />
            <p className="text-foreground text-lg tracking-[0.18em] uppercase">
              Enrique Mclaughlin
            </p>
          </div>

          <section className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl grid-cols-1 px-6 py-8 md:grid-cols-[1fr_auto_1fr] md:px-12 md:py-12">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,oklch(0.9_0.05_240/.45),transparent_45%),radial-gradient(circle_at_80%_90%,oklch(0.92_0.03_210/.6),transparent_35%)]" />

            <div className="flex flex-col justify-between gap-10 md:pe-10">
              <div className="space-y-5">
                <Badge variant="secondary" className="w-fit">
                  New York City
                </Badge>
                <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                  Finance and strategy focused portfolio.
                </h1>
                <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                  Building a clean record of projects, research, and execution
                  across investment banking, analysis, and operating work.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button>
                  View Work
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
                <Button variant="outline" onClick={onOpenContact}>
                  Contact
                  <MailIcon data-icon="inline-end" />
                </Button>
              </div>
            </div>

            <Separator
              orientation="vertical"
              className="mx-8 hidden h-full bg-border/70 md:block"
            />
            <Separator orientation="horizontal" className="my-10 md:hidden" />

            <div className="flex flex-col justify-center gap-7 md:ps-10">
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs tracking-[0.24em] uppercase">
                  Snapshot
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Metric
                    label="Current Focus"
                    value="M&A Prep + Deal Thinking"
                  />
                  <Metric label="Core Domain" value="Investment Banking" />
                  <Metric label="Strength" value="Structured Analysis" />
                  <Metric label="Location" value="New York, NY" />
                </div>
              </div>

              <div className="border-border/70 bg-card/70 rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <BriefcaseIcon className="size-4" />
                  Current FT Role
                </div>
                <p className="text-muted-foreground text-sm">
                  Citi Investment Banking, Mergers and Acquisitions Group.
                </p>
              </div>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function LeftSidebarSeparator() {
  const { open, isMobile } = useSidebar()

  if (!open || isMobile) {
    return null
  }

  return <Separator orientation="vertical" className="hidden h-screen bg-border/70 md:block" />
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border/70 rounded-lg border p-3">
      <p className="text-muted-foreground mb-1 text-xs uppercase">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}
