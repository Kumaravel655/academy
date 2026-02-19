# Sunshine Academy – FastAPI Backend

A REST API backend for the Sunshine Academy learning platform, built with **FastAPI** and **SQLite3**.

## Quick Start

```bash
cd backend

# Create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Seed the database with courses, instructors & demo users
python seed.py

# Start the server (port 8000)
uvicorn main:app --reload
```

The interactive API docs are at **http://localhost:8000/docs**.

## Demo Accounts

| Email               | Password  | Role  |
|---------------------|-----------|-------|
| admin@velandev.com  | admin123  | Admin |
| demo@velandev.com   | demo123   | User  |

## API Endpoints

### Auth
| Method | Path               | Description      | Auth |
|--------|--------------------|------------------|------|
| POST   | /api/auth/signup   | Register         | —    |
| POST   | /api/auth/login    | Login (get JWT)  | —    |
| GET    | /api/auth/me       | Current user     | JWT  |

### Courses
| Method | Path                    | Description           | Auth   |
|--------|-------------------------|-----------------------|--------|
| GET    | /api/courses            | List / filter courses | —      |
| GET    | /api/courses/categories | Distinct categories   | —      |
| GET    | /api/courses/{slug}     | Course detail         | —      |
| POST   | /api/courses            | Create course         | Admin  |
| PUT    | /api/courses/{id}       | Update course         | Admin  |
| DELETE | /api/courses/{id}       | Delete course         | Admin  |

**Query params** for `GET /api/courses`: `category`, `level`, `search`

### Enrollments
| Method | Path                                  | Description      | Auth |
|--------|---------------------------------------|------------------|------|
| GET    | /api/enrollments                      | My enrollments   | JWT  |
| POST   | /api/enrollments/{course_id}          | Enroll           | JWT  |
| PATCH  | /api/enrollments/{course_id}/progress | Update progress  | JWT  |
| DELETE | /api/enrollments/{course_id}          | Unenroll         | JWT  |

### Wishlist
| Method | Path                        | Description      | Auth |
|--------|-----------------------------|------------------|------|
| GET    | /api/wishlist               | My wishlist      | JWT  |
| POST   | /api/wishlist/{course_id}   | Add to wishlist  | JWT  |
| DELETE | /api/wishlist/{course_id}   | Remove           | JWT  |

### Contact
| Method | Path          | Description          | Auth  |
|--------|---------------|----------------------|-------|
| POST   | /api/contact  | Submit message       | —     |
| GET    | /api/contact  | List all messages    | Admin |

### Admin
| Method | Path                  | Description      | Auth  |
|--------|-----------------------|------------------|-------|
| GET    | /api/admin/stats      | Dashboard stats  | Admin |
| GET    | /api/admin/instructors| List instructors | —     |

## Project Structure

```
backend/
├── main.py              # FastAPI app entry point
├── database.py          # SQLAlchemy engine & session
├── models.py            # ORM models
├── schemas.py           # Pydantic request/response schemas
├── auth.py              # JWT & password helpers
├── seed.py              # Seed database with course data
├── requirements.txt     # Python dependencies
├── README.md
└── routers/
    ├── auth.py          # /api/auth/*
    ├── courses.py       # /api/courses/*
    ├── enrollments.py   # /api/enrollments/*
    ├── wishlist.py      # /api/wishlist/*
    ├── contact.py       # /api/contact/*
    └── admin.py         # /api/admin/*
```

## Tech Stack

- **FastAPI** – async Python web framework
- **SQLite3** – lightweight file-based database (via SQLAlchemy ORM)
- **SQLAlchemy 2.0** – ORM & query builder
- **Pydantic v2** – data validation
- **python-jose** – JWT token handling
- **passlib + bcrypt** – password hashing
