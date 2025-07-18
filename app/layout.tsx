import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Lincognito',
    default: 'LinkedIn Ghostwriter | Professional LinkedIn Content Writing Services - Lincognito'
  },
  description: 'Top-rated LinkedIn ghostwriter platform. Professional LinkedIn content writing, ghostwriting services, and social media management. Boost your LinkedIn presence with expert ghostwriters.',
  keywords: 'linkedin ghostwriter, professional linkedin ghostwriter, linkedin content writer, linkedin ghostwriting services, linkedin post writer, social media ghostwriter, linkedin content creation, executive linkedin ghostwriter, b2b linkedin ghostwriter, linkedin thought leadership writer',
  authors: [{ name: 'Lincognito Team' }],
  creator: 'Lincognito',
  publisher: 'Lincognito',
  robots: 'index, follow',
  openGraph: {
    title: 'LinkedIn Ghostwriter | Professional LinkedIn Content Writing Services - Lincognito',
    description: 'Top-rated LinkedIn ghostwriter platform. Professional LinkedIn content writing, ghostwriting services, and social media management. Boost your LinkedIn presence with expert ghostwriters.',
    url: 'https://lincognito.com',
    siteName: 'Lincognito',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Lincognito Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Ghostwriter | Professional LinkedIn Content Writing Services',
    description: 'Top-rated LinkedIn ghostwriter platform. Professional LinkedIn content writing and ghostwriting services.',
    images: ['https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["SoftwareApplication", "ProfessionalService"],
              "name": "Lincognito",
              "alternateName": "LinkedIn Ghostwriter Platform",
              "applicationCategory": "BusinessApplication",
              "serviceType": "LinkedIn Ghostwriting Services",
              "operatingSystem": "Web",
              "description": "Professional LinkedIn ghostwriter platform offering expert LinkedIn content writing, ghostwriting services, and social media management for executives and businesses.",
              "url": "https://lincognito.com",
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "LinkedIn Ghostwriting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Professional LinkedIn Ghostwriting",
                      "description": "Expert LinkedIn content creation and ghostwriting services"
                    }
                  }
                ]
              },
              "author": {
                "@type": "Organization",
                "name": "Lincognito Team",
                "url": "https://lincognito.com"
              },
              "offers": {
                "@type": "Offer",
                "price": "10.00",
                "priceCurrency": "EUR",
                "description": "LinkedIn Ghostwriter Platform Subscription"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1200",
                "bestRating": "5"
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}