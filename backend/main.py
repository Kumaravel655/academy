"""
Sunshine Academy – FastAPI Backend
===================================
Entry point. Run with:  uvicorn main:app --reload --port 4566
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import auth, courses, enrollments, wishlist, contact, admin

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sunshine Academy API",
    description="Backend API for the Sunshine Academy learning platform",
    version="1.0.0",
)

# ── CORS (allow the Next.js frontend) ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(enrollments.router)
app.include_router(wishlist.router)
app.include_router(contact.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"message": "Sunshine Academy API is running", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=4566, reload=True)
