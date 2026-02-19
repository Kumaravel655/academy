"""
SQLAlchemy ORM models for the Sunshine Academy backend.
"""

from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
    Table,
)
from sqlalchemy.orm import relationship
from database import Base

# ---------- association tables ----------

course_tags = Table(
    "course_tags",
    Base.metadata,
    Column("course_id", Integer, ForeignKey("courses.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)


# ---------- models ----------


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    enrollments = relationship("Enrollment", back_populates="user", cascade="all, delete-orphan")
    wishlist_items = relationship("WishlistItem", back_populates="user", cascade="all, delete-orphan")
    contact_messages = relationship("ContactMessage", back_populates="user")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=False)
    instructor = Column(String, nullable=False)
    instructor_bio = Column(Text, nullable=False)
    instructor_image = Column(String, default="")
    category = Column(String, nullable=False, index=True)
    level = Column(String, nullable=False)  # Beginner | Intermediate | Advanced
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)
    rating = Column(Float, default=0.0)
    students = Column(Integer, default=0)
    duration = Column(String, nullable=False)
    lessons = Column(Integer, default=0)
    image = Column(String, default="")

    # JSON-serialised rich fields stored as TEXT (simple approach for SQLite)
    curriculum_json = Column(Text, default="[]")
    outcomes_json = Column(Text, default="[]")
    testimonials_json = Column(Text, default="[]")
    faq_json = Column(Text, default="[]")

    tags = relationship("Tag", secondary=course_tags, back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    wishlist_items = relationship("WishlistItem", back_populates="course", cascade="all, delete-orphan")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    courses = relationship("Course", secondary=course_tags, back_populates="tags")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    progress = Column(Float, default=0.0)  # 0-100
    completed = Column(Boolean, default=False)

    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    added_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="wishlist_items")
    course = relationship("Course", back_populates="wishlist_items")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="contact_messages")


class Instructor(Base):
    __tablename__ = "instructors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    image = Column(String, default="")
    expertise_json = Column(Text, default="[]")
    students = Column(Integer, default=0)
    courses_count = Column(Integer, default=0)
