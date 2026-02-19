import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { UserDataProvider } from '@/lib/user-data-context'
import { ThemeProvider } from '@/components/theme-provider'
import DemoInit from '@/components/demo-init'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

const SITE_URL = 'https://sunshineacademy.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sunshine Academy — Best Online Courses in Arakkonam, Tamil Nadu',
    template: '%s | Sunshine Academy',
  },
  description:
    'Sunshine Academy in Arakkonam, Tamil Nadu offers expert-led online courses in Python, Java, Web Development, Data Science, and more. Join 2,500+ students. Enroll today!',
  keywords: [
    'Sunshine Academy',
    'Sunshine Academy Arakkonam',
    'online courses Arakkonam',
    'online courses Tamil Nadu',
    'Python course Arakkonam',
    'Java course Tamil Nadu',
    'web development course',
    'data science course India',
    'programming courses Tamil Nadu',
    'best online learning platform India',
    'full stack development course',
    'coding classes Arakkonam',
    'IT training Tamil Nadu',
    'software courses near me',
    'learn programming online India',
  ],
  authors: [{ name: 'Sunshine Academy', url: SITE_URL }],
  creator: 'Sunshine Academy',
  publisher: 'Sunshine Academy',
  category: 'Education',
  applicationName: 'Sunshine Academy',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Sunshine Academy',
    title: 'Sunshine Academy — Best Online Courses in Arakkonam, Tamil Nadu',
    description:
      'Expert-led online courses in Python, Java, Web Development & Data Science. Based in Arakkonam, Tamil Nadu. 2,500+ students. Lifetime access. Certificate included.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sunshine Academy – Online Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunshine Academy — Online Courses | Arakkonam, Tamil Nadu',
    description:
      'Top-rated online courses in Python, Java, Web Development & more. Join Sunshine Academy today!',
    images: [`${SITE_URL}/og-image.jpg`],
    creator: '@sunshineacademy',
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Arakkonam, Tamil Nadu, India',
    'geo.position': '13.0827;79.6825',
    'ICBM': '13.0827, 79.6825',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Sunshine Academy',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        'Sunshine Academy offers expert-led online courses in programming, web development, data science, and more. Based in Arakkonam, Tamil Nadu, India.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Arakkonam',
        addressLocality: 'Arakkonam',
        addressRegion: 'Tamil Nadu',
        postalCode: '631001',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9500347142',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
      sameAs: [
        'https://www.facebook.com/sunshineacademy',
        'https://www.linkedin.com/company/sunshineacademy',
        'https://twitter.com/sunshineacademy',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Online Courses',
        itemListElement: [
          { '@type': 'Course', name: 'Python for Beginners', provider: { '@type': 'Organization', name: 'Sunshine Academy' } },
          { '@type': 'Course', name: 'Full Stack Web Development', provider: { '@type': 'Organization', name: 'Sunshine Academy' } },
          { '@type': 'Course', name: 'Data Science with Python', provider: { '@type': 'Organization', name: 'Sunshine Academy' } },
          { '@type': 'Course', name: 'Java Advanced', provider: { '@type': 'Organization', name: 'Sunshine Academy' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Sunshine Academy',
      description: 'Best online courses from Arakkonam, Tamil Nadu',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/courses?search={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="font-sans antialiased relative bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DemoInit />
          <AuthProvider>
            <UserDataProvider>
              {children}
            </UserDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
