'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';
import { api } from './api';

export interface Enrollment {
  courseId: string;
  enrolledAt: string;
  progress: number; // 0-100
  completed: boolean;
}

interface UserDataContextType {
  enrollments: Enrollment[];
  wishlist: string[];
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  toggleWishlist: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  isWishlisted: (courseId: string) => boolean;
  updateProgress: (courseId: string, progress: number) => void;
  getProgress: (courseId: string) => number;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load user data from API
  useEffect(() => {
    if (!user) {
      setEnrollments([]);
      setWishlist([]);
      return;
    }

    api.enrollments.list()
      .then((data: any[]) => {
        setEnrollments(data.map((e: any) => ({
          courseId: e.courseId,
          enrolledAt: e.enrolledAt,
          progress: e.progress,
          completed: e.completed,
        })));
      })
      .catch(console.error);

    api.wishlist.list()
      .then((courses: any[]) => {
        setWishlist(courses.map((c: any) => c.id));
      })
      .catch(console.error);
  }, [user]);

  const enrollCourse = (courseId: string) => {
    if (!isEnrolled(courseId)) {
      setEnrollments((prev) => [
        ...prev,
        {
          courseId,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completed: false,
        },
      ]);
      api.enrollments.enroll(courseId).catch((err) => {
        setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
        console.error('Enroll failed:', err);
      });
    }
  };

  const unenrollCourse = (courseId: string) => {
    const prev = enrollments;
    setEnrollments(enrollments.filter((e) => e.courseId !== courseId));
    api.enrollments.unenroll(courseId).catch((err) => {
      setEnrollments(prev);
      console.error('Unenroll failed:', err);
    });
  };

  const toggleWishlist = (courseId: string) => {
    if (wishlist.includes(courseId)) {
      setWishlist(wishlist.filter((id) => id !== courseId));
      api.wishlist.remove(courseId).catch((err) => {
        setWishlist((prev) => [...prev, courseId]);
        console.error('Wishlist remove failed:', err);
      });
    } else {
      setWishlist([...wishlist, courseId]);
      api.wishlist.add(courseId).catch((err) => {
        setWishlist((prev) => prev.filter((id) => id !== courseId));
        console.error('Wishlist add failed:', err);
      });
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.courseId === courseId);
  };

  const isWishlisted = (courseId: string) => {
    return wishlist.includes(courseId);
  };

  const updateProgress = (courseId: string, progress: number) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));
    setEnrollments(
      enrollments.map((e) =>
        e.courseId === courseId
          ? { ...e, progress: clampedProgress, completed: clampedProgress >= 100 }
          : e
      )
    );
    api.enrollments.updateProgress(courseId, clampedProgress).catch(console.error);
  };

  const getProgress = (courseId: string) => {
    return enrollments.find((e) => e.courseId === courseId)?.progress || 0;
  };

  const value: UserDataContextType = {
    enrollments,
    wishlist,
    enrollCourse,
    unenrollCourse,
    toggleWishlist,
    isEnrolled,
    isWishlisted,
    updateProgress,
    getProgress,
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within UserDataProvider');
  }
  return context;
}
