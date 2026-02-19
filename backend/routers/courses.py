"""
Courses router – list, detail, CRUD (admin).
"""

import json
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from database import get_db
from models import Course, Tag
from schemas import CourseOut, CourseListItem, CourseCreate, CourseUpdate
from auth import require_admin

router = APIRouter(prefix="/api/courses", tags=["Courses"])


# ── helpers ──

def _course_to_list_item(c: Course) -> dict:
    return {
        "id": c.id,
        "slug": c.slug,
        "title": c.title,
        "description": c.description,
        "instructor": c.instructor,
        "category": c.category,
        "level": c.level,
        "price": c.price,
        "original_price": c.original_price,
        "rating": c.rating,
        "students": c.students,
        "duration": c.duration,
        "lessons": c.lessons,
        "image": c.image,
        "tags": [t.name for t in c.tags],
    }


def _course_to_full(c: Course) -> dict:
    return {
        **_course_to_list_item(c),
        "long_description": c.long_description,
        "instructor_bio": c.instructor_bio,
        "instructor_image": c.instructor_image,
        "curriculum": json.loads(c.curriculum_json or "[]"),
        "outcomes": json.loads(c.outcomes_json or "[]"),
        "testimonials": json.loads(c.testimonials_json or "[]"),
        "faq": json.loads(c.faq_json or "[]"),
    }


def _sync_tags(db: Session, course: Course, tag_names: list[str]):
    """Set course tags, creating new Tag rows as needed."""
    tags = []
    for name in tag_names:
        tag = db.query(Tag).filter(Tag.name == name).first()
        if not tag:
            tag = Tag(name=name)
            db.add(tag)
            db.flush()
        tags.append(tag)
    course.tags = tags


# ── endpoints ──


@router.get("", response_model=list[CourseListItem])
def list_courses(
    category: Optional[str] = Query(None),
    level: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Course)
    if category:
        q = q.filter(Course.category == category)
    if level:
        q = q.filter(Course.level == level)
    if search:
        q = q.filter(Course.title.ilike(f"%{search}%"))
    courses = q.all()
    return [_course_to_list_item(c) for c in courses]


@router.get("/categories", response_model=list[str])
def list_categories(db: Session = Depends(get_db)):
    rows = db.query(Course.category).distinct().all()
    return [r[0] for r in rows]


@router.get("/{slug}", response_model=CourseOut)
def get_course(slug: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.slug == slug).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return _course_to_full(course)


@router.post("", response_model=CourseOut, status_code=status.HTTP_201_CREATED)
def create_course(body: CourseCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Course).filter(Course.slug == body.slug).first():
        raise HTTPException(status_code=400, detail="Slug already exists")

    course = Course(
        slug=body.slug,
        title=body.title,
        description=body.description,
        long_description=body.long_description,
        instructor=body.instructor,
        instructor_bio=body.instructor_bio,
        instructor_image=body.instructor_image,
        category=body.category,
        level=body.level,
        price=body.price,
        original_price=body.original_price,
        rating=body.rating,
        students=body.students,
        duration=body.duration,
        lessons=body.lessons,
        image=body.image,
        curriculum_json=json.dumps([m.model_dump() for m in body.curriculum]),
        outcomes_json=json.dumps(body.outcomes),
        testimonials_json=json.dumps([t.model_dump() for t in body.testimonials]),
        faq_json=json.dumps([f.model_dump() for f in body.faq]),
    )
    db.add(course)
    db.flush()
    _sync_tags(db, course, body.tags)
    db.commit()
    db.refresh(course)
    return _course_to_full(course)


@router.put("/{course_id}", response_model=CourseOut)
def update_course(
    course_id: int,
    body: CourseUpdate,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    data = body.model_dump(exclude_unset=True)

    # Handle JSON fields specially
    json_fields = {
        "curriculum": "curriculum_json",
        "outcomes": "outcomes_json",
        "testimonials": "testimonials_json",
        "faq": "faq_json",
    }
    for field, col in json_fields.items():
        if field in data:
            val = data.pop(field)
            if val is not None:
                if field in ("curriculum", "testimonials", "faq"):
                    setattr(course, col, json.dumps([v.model_dump() if hasattr(v, "model_dump") else v for v in val]))
                else:
                    setattr(course, col, json.dumps(val))

    if "tags" in data:
        _sync_tags(db, course, data.pop("tags"))

    for key, value in data.items():
        setattr(course, key, value)

    db.commit()
    db.refresh(course)
    return _course_to_full(course)


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
