'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';

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

  // Load user data from localStorage
  useEffect(() => {
    if (!user) {
      setEnrollments([]);
      setWishlist([]);
      return;
    }

    const userDataKey = `userdata_${user.id}`;
    const savedData = localStorage.getItem(userDataKey);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setEnrollments(data.enrollments || []);
        setWishlist(data.wishlist || []);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, [user]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (!user) return;

    const userDataKey = `userdata_${user.id}`;
    localStorage.setItem(
      userDataKey,
      JSON.stringify({
        enrollments,
        wishlist,
      })
    );
  }, [enrollments, wishlist, user]);

  const enrollCourse = (courseId: string) => {
    if (!isEnrolled(courseId)) {
      setEnrollments([
        ...enrollments,
        {
          courseId,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completed: false,
        },
      ]);
    }
  };

  const unenrollCourse = (courseId: string) => {
    setEnrollments(enrollments.filter((e) => e.courseId !== courseId));
  };

  const toggleWishlist = (courseId: string) => {
    if (wishlist.includes(courseId)) {
      setWishlist(wishlist.filter((id) => id !== courseId));
    } else {
      setWishlist([...wishlist, courseId]);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.courseId === courseId);
  };

  const isWishlisted = (courseId: string) => {
    return wishlist.includes(courseId);
  };

  const updateProgress = (courseId: string, progress: number) => {
    setEnrollments(
      enrollments.map((e) =>
        e.courseId === courseId
          ? { ...e, progress: Math.min(100, Math.max(0, progress)), completed: progress >= 100 }
          : e
      )
    );
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
