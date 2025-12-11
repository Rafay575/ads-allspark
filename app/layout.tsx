import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import GlobalPreloader from "@/components/GlobalPreloader";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",     // expose as CSS var
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
        url: "https://buildyourwebsite.allsparktechnologies.com/og-image.jpg", // optional
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Rajdhani Font CDN */}
           <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} antialiased !w-[100vw] !overflow-x-hidden `}
      >
        
        <div>
        {children}
        <ScrollToTopButton/>
        </div>
        <GlobalPreloader />
      </body>
       <script
            type="text/javascript"
            src="https://assets.calendly.com/assets/external/widget.js"
            async
          ></script>
    </html>
  );
}

// app/layout.tsx (or app/(whatever)/layout.tsx)
// import { Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css";

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-sans",     // expose as CSS var
//   display: "swap",
// });



// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${plusJakarta.variable} font-sans antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }
