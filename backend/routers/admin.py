"""
Admin router – dashboard stats, instructor management.
"""

import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Course, User, Enrollment, ContactMessage, Instructor
from schemas import AdminStats, InstructorOut
from auth import require_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats", response_model=AdminStats)
def get_stats(db: Session = Depends(get_db), _=Depends(require_admin)):
    courses = db.query(Course).all()
    total_courses = len(courses)
    total_students = sum(c.students for c in courses) if courses else 0
    avg_rating = (sum(c.rating for c in courses) / total_courses) if total_courses else 0
    total_revenue = sum(c.price * c.students for c in courses) if courses else 0
    total_enrollments = db.query(Enrollment).count()
    total_users = db.query(User).count()
    total_messages = db.query(ContactMessage).count()

    return AdminStats(
        total_courses=total_courses,
        total_students=total_students,
        average_rating=round(avg_rating, 2),
        total_revenue=total_revenue,
        total_enrollments=total_enrollments,
        total_users=total_users,
        total_messages=total_messages,
    )


@router.get("/instructors", response_model=list[InstructorOut])
def list_instructors(db: Session = Depends(get_db)):
    instructors = db.query(Instructor).all()
    result = []
    for i in instructors:
        result.append(InstructorOut(
            id=i.id,
            name=i.name,
            bio=i.bio,
            image=i.image,
            expertise=json.loads(i.expertise_json or "[]"),
            students=i.students,
            courses_count=i.courses_count,
        ))
    return result
