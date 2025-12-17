import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import GlobalPreloader from "@/components/GlobalPreloader";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Build Your Website | AllSpark Technologies",
  description:
    "Launch your business online with AllSpark Technologies’ website-building platform. Fast, professional, and tailored to help you grow with modern web tools.",
  keywords:
    "website builder, web development, build your website, AllSpark Technologies, business website, custom website, launch website",
  openGraph: {
    title: "Build Your Website | AllSpark Technologies",
    description:
      "Build your dream website with AllSpark Technologies — modern, responsive, and optimized for your business growth.",
    url: "https://buildyourwebsite.allsparktechnologies.com",
    siteName: "AllSpark Technologies",
    images: [
      {
        url: "https://buildyourwebsite.allsparktechnologies.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Build Your Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />

        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="NgOeMSHB2lVnom-ZkpqjyYv10Zlng_e2Cvpqovf6BIM"
        />

        {/* Rajdhani Font CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager (must be as high in <head> as possible) */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WC4JXXKN');`}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PGRX0PX1Q2"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-PGRX0PX1Q2');`}
        </Script>
      </head>

      <body
        className={`${plusJakarta.variable} antialiased !w-[100vw] !overflow-x-hidden`}
      >
        {/* Google Tag Manager (noscript) - immediately after opening <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WC4JXXKN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <div>
          {children}
          <ScrollToTopButton />
        </div>

        <GlobalPreloader />

        {/* Calendly widget script (moved inside body properly) */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
