"""
Contact form router.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from models import ContactMessage, User
from schemas import ContactCreate, ContactOut
from auth import get_current_user_optional, require_admin

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def submit_contact(
    body: ContactCreate,
    db: Session = Depends(get_db),
    user: User | None = Depends(get_current_user_optional),
):
    msg = ContactMessage(
        name=body.name,
        email=body.email,
        subject=body.subject,
        message=body.message,
        user_id=user.id if user else None,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@router.get("", response_model=list[ContactOut])
def list_messages(db: Session = Depends(get_db), _=Depends(require_admin)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
