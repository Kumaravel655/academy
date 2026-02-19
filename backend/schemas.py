"""
Pydantic schemas for request / response validation.
"""

from __future__ import annotations
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ────────────────────── Auth ──────────────────────


class UserSignup(BaseModel):
    email: str
    password: str = Field(min_length=6)
    name: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    name: str
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ────────────────────── Course ──────────────────────


class LessonSchema(BaseModel):
    id: str
    title: str
    duration: str


class ModuleSchema(BaseModel):
    id: str
    title: str
    lessons: list[LessonSchema]


class TestimonialSchema(BaseModel):
    id: str
    name: str
    role: str
    text: str
    rating: float
    image: str


class FAQSchema(BaseModel):
    id: str
    question: str
    answer: str


class CourseOut(BaseModel):
    id: int
    slug: str
    title: str
    description: str
    long_description: str
    instructor: str
    instructor_bio: str
    instructor_image: str
    category: str
    level: str
    price: float
    original_price: Optional[float] = None
    rating: float
    students: int
    duration: str
    lessons: int
    image: str
    curriculum: list[ModuleSchema]
    outcomes: list[str]
    testimonials: list[TestimonialSchema]
    faq: list[FAQSchema]
    tags: list[str]

    class Config:
        from_attributes = True


class CourseListItem(BaseModel):
    """Lightweight course for listing pages."""
    id: int
    slug: str
    title: str
    description: str
    instructor: str
    category: str
    level: str
    price: float
    original_price: Optional[float] = None
    rating: float
    students: int
    duration: str
    lessons: int
    image: str
    tags: list[str]

    class Config:
        from_attributes = True


class CourseCreate(BaseModel):
    slug: str
    title: str
    description: str
    long_description: str
    instructor: str
    instructor_bio: str
    instructor_image: str = ""
    category: str
    level: str
    price: float
    original_price: Optional[float] = None
    rating: float = 0.0
    students: int = 0
    duration: str
    lessons: int = 0
    image: str = ""
    curriculum: list[ModuleSchema] = []
    outcomes: list[str] = []
    testimonials: list[TestimonialSchema] = []
    faq: list[FAQSchema] = []
    tags: list[str] = []


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    long_description: Optional[str] = None
    instructor: Optional[str] = None
    instructor_bio: Optional[str] = None
    instructor_image: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    rating: Optional[float] = None
    students: Optional[int] = None
    duration: Optional[str] = None
    lessons: Optional[int] = None
    image: Optional[str] = None
    curriculum: Optional[list[ModuleSchema]] = None
    outcomes: Optional[list[str]] = None
    testimonials: Optional[list[TestimonialSchema]] = None
    faq: Optional[list[FAQSchema]] = None
    tags: Optional[list[str]] = None


# ────────────────────── Enrollment ──────────────────────


class EnrollmentOut(BaseModel):
    id: int
    course_id: int
    enrolled_at: datetime
    progress: float
    completed: bool

    class Config:
        from_attributes = True


class EnrollmentWithCourse(EnrollmentOut):
    course: CourseListItem


class ProgressUpdate(BaseModel):
    progress: float = Field(ge=0, le=100)


# ────────────────────── Wishlist ──────────────────────


class WishlistOut(BaseModel):
    id: int
    course_id: int
    added_at: datetime

    class Config:
        from_attributes = True


# ────────────────────── Contact ──────────────────────


class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    user_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ────────────────────── Instructor ──────────────────────


class InstructorOut(BaseModel):
    id: int
    name: str
    bio: str
    image: str
    expertise: list[str]
    students: int
    courses_count: int

    class Config:
        from_attributes = True


# ────────────────────── Admin stats ──────────────────────


class AdminStats(BaseModel):
    total_courses: int
    total_students: int
    average_rating: float
    total_revenue: float
    total_enrollments: int
    total_users: int
    total_messages: int
