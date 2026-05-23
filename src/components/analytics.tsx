import Script from "next/script";

/**
 * Umami analytics. Renders nothing unless both env vars are set, so local
 * development (where they're typically unset) is never tracked. Configure via
 * NEXT_PUBLIC_UMAMI_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID — see .env.example.
 */
export function Analytics() {
  const url = process.env.NEXT_PUBLIC_UMAMI_URL;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!url || !websiteId) {
    return null;
  }

  return (
    <Script
      src={url}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
