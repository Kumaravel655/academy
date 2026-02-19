"""
Wishlist router – add / remove / list.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import WishlistItem, Course, User
from schemas import WishlistOut, CourseListItem
from auth import get_current_user
from routers.courses import _course_to_list_item

router = APIRouter(prefix="/api/wishlist", tags=["Wishlist"])


@router.get("", response_model=list[CourseListItem])
def get_wishlist(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    items = db.query(WishlistItem).filter(WishlistItem.user_id == user.id).all()
    courses = []
    for item in items:
        course = db.query(Course).filter(Course.id == item.course_id).first()
        if course:
            courses.append(_course_to_list_item(course))
    return courses


@router.post("/{course_id}", response_model=WishlistOut, status_code=status.HTTP_201_CREATED)
def add_to_wishlist(course_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = (
        db.query(WishlistItem)
        .filter(WishlistItem.user_id == user.id, WishlistItem.course_id == course_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already in wishlist")

    item = WishlistItem(user_id=user.id, course_id=course_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_from_wishlist(course_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = (
        db.query(WishlistItem)
        .filter(WishlistItem.user_id == user.id, WishlistItem.course_id == course_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    db.delete(item)
    db.commit()
