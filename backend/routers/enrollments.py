"""
Enrollments router – enroll / unenroll / progress.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import Enrollment, Course, User
from schemas import EnrollmentOut, EnrollmentWithCourse, ProgressUpdate
from auth import get_current_user
from routers.courses import _course_to_list_item

router = APIRouter(prefix="/api/enrollments", tags=["Enrollments"])


@router.get("", response_model=list[EnrollmentWithCourse])
def get_my_enrollments(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    enrollments = (
        db.query(Enrollment)
        .filter(Enrollment.user_id == user.id)
        .all()
    )
    result = []
    for e in enrollments:
        course = db.query(Course).filter(Course.id == e.course_id).first()
        if course:
            result.append({
                "id": e.id,
                "course_id": e.course_id,
                "enrolled_at": e.enrolled_at,
                "progress": e.progress,
                "completed": e.completed,
                "course": _course_to_list_item(course),
            })
    return result


@router.post("/{course_id}", response_model=EnrollmentOut, status_code=status.HTTP_201_CREATED)
def enroll(course_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = (
        db.query(Enrollment)
        .filter(Enrollment.user_id == user.id, Enrollment.course_id == course_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")

    enrollment = Enrollment(user_id=user.id, course_id=course_id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment


@router.patch("/{course_id}/progress", response_model=EnrollmentOut)
def update_progress(
    course_id: int,
    body: ProgressUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    enrollment = (
        db.query(Enrollment)
        .filter(Enrollment.user_id == user.id, Enrollment.course_id == course_id)
        .first()
    )
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    enrollment.progress = body.progress
    enrollment.completed = body.progress >= 100
    db.commit()
    db.refresh(enrollment)
    return enrollment


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def unenroll(course_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    enrollment = (
        db.query(Enrollment)
        .filter(Enrollment.user_id == user.id, Enrollment.course_id == course_id)
        .first()
    )
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    db.delete(enrollment)
    db.commit()
