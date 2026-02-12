type QrCodeCardProps = {
  label: string
  href: string
  imgSrc: string
  imgAlt: string
  onExpand?: (card: {
    label: string
    href: string
    imgSrc: string
    imgAlt: string
  }) => void
}

export function QrCodeCard({
  label,
  href,
  imgSrc,
  imgAlt,
  onExpand,
}: QrCodeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onExpand?.({ label, href, imgSrc, imgAlt })}
      className="bg-background/90 border-border/70 block w-full overflow-hidden rounded-lg border text-left"
    >
      <p className="px-1 py-1.5 text-center text-[11px] font-medium tracking-wide uppercase">
        {label}
      </p>
      <div className="p-[4px]">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="border-border/60 block aspect-square w-full rounded-md border bg-white"
        />
      </div>
    </button>
  )
}
