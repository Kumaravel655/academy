export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorBio: string;
  instructorImage: string;
  category: string;
  level: CourseLevel;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  image: string;
  curriculum: Module[];
  outcomes: string[];
  testimonials: Testimonial[];
  faq: FAQ[];
  tags: string[];
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  image: string;
  expertise: string[];
  students: number;
  courses: number;
}
