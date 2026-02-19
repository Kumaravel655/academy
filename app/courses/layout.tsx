import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Courses',
  description:
    'Browse 50+ expert-led online courses in Python, Java, Web Development, Data Science, React, Flutter and more. Best coding courses from Sunshine Academy, Arakkonam, Tamil Nadu.',
  keywords: [
    'online courses',
    'Python course',
    'Java course',
    'web development course Tamil Nadu',
    'data science course',
    'React course India',
    'full stack course Arakkonam',
    'programming courses Tamil Nadu',
    'best IT courses 2025',
  ],
  openGraph: {
    title: 'Courses — Sunshine Academy | Python, Java, Web Dev & More',
    description:
      'Explore 50+ in-demand tech courses. Lifetime access, certificate included. Enroll at Sunshine Academy — Arakkonam, Tamil Nadu.',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
