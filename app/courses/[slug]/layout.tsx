import type { Metadata } from 'next';

interface CourseSlugLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  // Convert slug like "python-beginners" → "Python Beginners"
  const courseName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const SITE_URL = 'https://sunshineacademy.in';

  return {
    title: `${courseName} Course`,
    description: `Enroll in the ${courseName} course at Sunshine Academy, Arakkonam, Tamil Nadu. Expert instructors, hands-on projects, and certification.`,
    keywords: [
      courseName,
      `${courseName} course`,
      `${courseName} online course`,
      `${courseName} Arakkonam`,
      'Sunshine Academy',
      'online learning Tamil Nadu',
      'certification course',
      'e-learning India',
    ],
    openGraph: {
      title: `${courseName} | Sunshine Academy`,
      description: `Join the ${courseName} course at Sunshine Academy — expert-led, project-based learning from Arakkonam, Tamil Nadu.`,
      url: `${SITE_URL}/courses/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${courseName} | Sunshine Academy`,
      description: `Join the ${courseName} course at Sunshine Academy.`,
    },
    alternates: {
      canonical: `${SITE_URL}/courses/${slug}`,
    },
  };
}

export default function CourseSlugLayout({ children }: CourseSlugLayoutProps) {
  return children;
}
