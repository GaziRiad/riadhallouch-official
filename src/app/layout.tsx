import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { getSiteSettings } from "@/sanity/queries";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const OG_IMAGE = "/opengraph-image";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(settings.url),
    title: {
      default: `${settings.name} — ${settings.role}`,
      template: `%s — ${settings.name}`,
    },
    description: settings.description,
    keywords: settings.keywords,
    authors: [{ name: settings.name, url: settings.url }],
    creator: settings.name,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: settings.url,
      title: `${settings.name} — ${settings.role}`,
      description: settings.description,
      siteName: settings.name,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${settings.name} — ${settings.role}`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${settings.name} — ${settings.role}`,
      description: settings.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f4",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="bg-bg text-ink flex min-h-full flex-col font-light antialiased">
        <JsonLd />
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Both no-op unless enabled for the project in Vercel, and both
            load after the page is interactive rather than blocking it. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
