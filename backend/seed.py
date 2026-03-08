"""
Seed the database with the course data from the frontend.
Run:  python seed.py
"""

import json
import sys
from database import engine, SessionLocal, Base
from models import Course, Tag, Instructor, User
from auth import hash_password


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Skip if already seeded
    if db.query(Course).count() > 0:
        print("Database already seeded – skipping.")
        db.close()
        return

    # ── Tags ──
    tag_names = [
        "Python", "Beginner", "Programming", "Web Development",
        "Java", "Advanced", "Spring Boot", "Microservices",
        "Full Stack", "React", "Node.js",
        "Data Science", "Machine Learning", "Analytics",
        "Next.js", "Frontend", "Performance",
        "Flutter", "Mobile", "Dart", "Cross-Platform",
        "Intermediate",
    ]
    tags = {}
    for name in tag_names:
        t = Tag(name=name)
        db.add(t)
        db.flush()
        tags[name] = t

    # ── Courses ──

    courses_data = [
        {
            "slug": "python-beginners",
            "title": "Python for Beginners - Brighten Your Coding Skills",
            "description": "Learn Python programming from scratch and illuminate your tech career",
            "long_description": "Shine in the tech world with Python! This comprehensive course covers all the fundamentals including variables, functions, loops, and object-oriented programming. Designed at Sunshine Academy to help you build a bright future in programming.",
            "instructor": "Rajesh Kumar",
            "instructor_bio": "Rajesh is a senior software engineer with 10+ years of experience helping students succeed. A proud Sunshine Academy instructor dedicated to brightening minds.",
            "instructor_image": "/instructors/rajesh.jpg",
            "category": "Python",
            "level": "Beginner",
            "price": 4999,
            "original_price": 9999,
            "rating": 4.8,
            "students": 2450,
            "duration": "8 weeks",
            "lessons": 32,
            "image": "/courses/python-beginners.jpg",
            "curriculum": [
                {
                    "id": "module-1",
                    "title": "Python Basics & Setup",
                    "lessons": [
                        {"id": "l1", "title": "Introduction to Python", "duration": "25 min"},
                        {"id": "l2", "title": "Installing Python & IDE Setup", "duration": "15 min"},
                        {"id": "l3", "title": "Your First Program", "duration": "20 min"},
                    ],
                },
                {
                    "id": "module-2",
                    "title": "Variables & Data Types",
                    "lessons": [
                        {"id": "l4", "title": "Variables & Assignment", "duration": "30 min"},
                        {"id": "l5", "title": "Strings, Numbers & Booleans", "duration": "35 min"},
                        {"id": "l6", "title": "Working with Lists & Dictionaries", "duration": "40 min"},
                    ],
                },
                {
                    "id": "module-3",
                    "title": "Control Flow",
                    "lessons": [
                        {"id": "l7", "title": "If-Else Statements", "duration": "30 min"},
                        {"id": "l8", "title": "Loops & Iterations", "duration": "35 min"},
                        {"id": "l9", "title": "Practice Exercises", "duration": "45 min"},
                    ],
                },
            ],
            "outcomes": [
                "Understand Python fundamentals and syntax",
                "Write and debug Python programs",
                "Work with data structures effectively",
                "Build real-world projects",
                "Prepare for intermediate Python concepts",
            ],
            "testimonials": [
                {"id": "t1", "name": "Priya Sharma", "role": "Software Developer", "text": "This course made learning Python incredibly easy. The instructor explains concepts so clearly!", "rating": 5, "image": "/testimonials/priya.jpg"},
                {"id": "t2", "name": "Amit Verma", "role": "Data Analyst", "text": "Best Python course I have taken. Highly recommended for beginners.", "rating": 4.5, "image": "/testimonials/amit.jpg"},
            ],
            "faq": [
                {"id": "faq1", "question": "Do I need any programming experience?", "answer": "No, this course is designed for complete beginners. We start from the basics."},
                {"id": "faq2", "question": "What software do I need?", "answer": "You just need Python (free) and a code editor. We recommend VS Code (also free)."},
                {"id": "faq3", "question": "Is there a certificate?", "answer": "Yes, you get a completion certificate after finishing all modules and projects."},
            ],
            "tags": ["Python", "Beginner", "Programming", "Web Development"],
        },
        {
            "slug": "java-advanced",
            "title": "Advanced Java Programming",
            "description": "Master enterprise Java development with Spring Boot and microservices",
            "long_description": "Take your Java skills to the next level. Learn advanced concepts, design patterns, and build scalable applications. This course covers Spring Boot, microservices architecture, and best practices used in real-world enterprise applications.",
            "instructor": "Deepak Sinha",
            "instructor_bio": "Deepak is a Java architect with 15+ years of experience building enterprise applications at leading tech companies.",
            "instructor_image": "/instructors/deepak.jpg",
            "category": "Java",
            "level": "Advanced",
            "price": 6999,
            "original_price": 12999,
            "rating": 4.9,
            "students": 1820,
            "duration": "10 weeks",
            "lessons": 48,
            "image": "/courses/java-advanced.jpg",
            "curriculum": [
                {"id": "module-1", "title": "Advanced OOP Concepts", "lessons": [
                    {"id": "l1", "title": "Design Patterns", "duration": "45 min"},
                    {"id": "l2", "title": "SOLID Principles", "duration": "50 min"},
                    {"id": "l3", "title": "Advanced Inheritance", "duration": "40 min"},
                ]},
                {"id": "module-2", "title": "Spring Boot Framework", "lessons": [
                    {"id": "l4", "title": "Spring Boot Setup", "duration": "30 min"},
                    {"id": "l5", "title": "Building REST APIs", "duration": "60 min"},
                    {"id": "l6", "title": "Database Integration", "duration": "50 min"},
                ]},
                {"id": "module-3", "title": "Microservices & Deployment", "lessons": [
                    {"id": "l7", "title": "Microservices Architecture", "duration": "55 min"},
                    {"id": "l8", "title": "Docker & Containerization", "duration": "45 min"},
                    {"id": "l9", "title": "Cloud Deployment", "duration": "50 min"},
                ]},
            ],
            "outcomes": [
                "Master advanced Java concepts and patterns",
                "Build enterprise-grade applications",
                "Implement microservices architecture",
                "Deploy applications to cloud",
                "Write production-ready code",
            ],
            "testimonials": [
                {"id": "t1", "name": "Vikram Patel", "role": "Senior Developer", "text": "This course elevated my Java skills to enterprise level. Deepak is an amazing instructor.", "rating": 5, "image": "/testimonials/vikram.jpg"},
                {"id": "t2", "name": "Sneha Gupta", "role": "Tech Lead", "text": "Comprehensive coverage of Spring Boot and microservices. Very practical and up-to-date.", "rating": 4.8, "image": "/testimonials/sneha.jpg"},
            ],
            "faq": [
                {"id": "faq1", "question": "What are the prerequisites?", "answer": "You should have solid understanding of Java basics and OOP concepts. Intermediate level Java knowledge is required."},
                {"id": "faq2", "question": "Will I learn Docker?", "answer": "Yes, we cover Docker for containerizing your applications and deploying to cloud platforms."},
                {"id": "faq3", "question": "Are there real-world projects?", "answer": "Absolutely! You will build 3 production-level projects during the course."},
            ],
            "tags": ["Java", "Advanced", "Spring Boot", "Microservices"],
        },
        {
            "slug": "fullstack-web-dev",
            "title": "Full Stack Web Development",
            "description": "Become a full stack developer: Frontend, Backend, and Database",
            "long_description": "Learn everything you need to become a full-stack web developer. Master React for frontend, Node.js for backend, and databases. Build complete web applications from concept to deployment.",
            "instructor": "Sarah Johnson",
            "instructor_bio": "Sarah is a full-stack developer and startup founder with 8+ years of web development experience.",
            "instructor_image": "/instructors/sarah.jpg",
            "category": "Web Development",
            "level": "Intermediate",
            "price": 5999,
            "original_price": 11999,
            "rating": 4.7,
            "students": 3200,
            "duration": "12 weeks",
            "lessons": 56,
            "image": "/courses/fullstack.jpg",
            "curriculum": [
                {"id": "module-1", "title": "Frontend Fundamentals", "lessons": [
                    {"id": "l1", "title": "HTML & CSS Mastery", "duration": "50 min"},
                    {"id": "l2", "title": "JavaScript Basics", "duration": "60 min"},
                    {"id": "l3", "title": "DOM Manipulation", "duration": "45 min"},
                ]},
                {"id": "module-2", "title": "React Framework", "lessons": [
                    {"id": "l4", "title": "React Components", "duration": "55 min"},
                    {"id": "l5", "title": "State Management", "duration": "50 min"},
                    {"id": "l6", "title": "React Hooks", "duration": "45 min"},
                ]},
                {"id": "module-3", "title": "Backend with Node.js", "lessons": [
                    {"id": "l7", "title": "Node.js & Express Setup", "duration": "40 min"},
                    {"id": "l8", "title": "RESTful APIs", "duration": "55 min"},
                    {"id": "l9", "title": "Database Design", "duration": "50 min"},
                ]},
                {"id": "module-4", "title": "Deployment & DevOps", "lessons": [
                    {"id": "l10", "title": "Version Control (Git)", "duration": "35 min"},
                    {"id": "l11", "title": "Deployment Strategies", "duration": "45 min"},
                    {"id": "l12", "title": "Production Best Practices", "duration": "40 min"},
                ]},
            ],
            "outcomes": [
                "Build complete web applications",
                "Master React and modern frontend",
                "Create robust backend APIs",
                "Design and manage databases",
                "Deploy applications to production",
            ],
            "testimonials": [
                {"id": "t1", "name": "Rahul Desai", "role": "Junior Developer", "text": "This full-stack course gave me everything I needed to land my first dev job!", "rating": 5, "image": "/testimonials/rahul.jpg"},
                {"id": "t2", "name": "Emma Wilson", "role": "Frontend Developer", "text": "Great progression from frontend to backend. Sarah explains everything perfectly.", "rating": 4.6, "image": "/testimonials/emma.jpg"},
            ],
            "faq": [
                {"id": "faq1", "question": "Is this for complete beginners?", "answer": "Basic programming knowledge is helpful but not required. We review fundamentals in the beginning."},
                {"id": "faq2", "question": "What framework do we use?", "answer": "We use React for frontend, Node.js with Express for backend, and MongoDB for databases."},
                {"id": "faq3", "question": "Will I build real projects?", "answer": "Yes, you will build 4-5 full-stack projects including a social media app and e-commerce platform."},
            ],
            "tags": ["Full Stack", "React", "Node.js", "Web Development"],
        },
        {
            "slug": "data-science-python",
            "title": "Data Science with Python",
            "description": "Master data analysis, visualization, and machine learning",
            "long_description": "Learn data science fundamentals using Python. Work with pandas, NumPy, and Scikit-learn. Build machine learning models and create stunning data visualizations.",
            "instructor": "Dr. Arjun Mehta",
            "instructor_bio": "Dr. Mehta holds a PhD in Data Science and has worked at leading tech companies on ML projects.",
            "instructor_image": "/instructors/arjun.jpg",
            "category": "Data Science",
            "level": "Intermediate",
            "price": 7999,
            "original_price": 14999,
            "rating": 4.9,
            "students": 1650,
            "duration": "10 weeks",
            "lessons": 42,
            "image": "/courses/data-science.jpg",
            "curriculum": [
                {"id": "module-1", "title": "Python & Data Manipulation", "lessons": [
                    {"id": "l1", "title": "Pandas Fundamentals", "duration": "45 min"},
                    {"id": "l2", "title": "Data Cleaning", "duration": "50 min"},
                    {"id": "l3", "title": "Data Transformation", "duration": "40 min"},
                ]},
                {"id": "module-2", "title": "Data Visualization", "lessons": [
                    {"id": "l4", "title": "Matplotlib & Seaborn", "duration": "50 min"},
                    {"id": "l5", "title": "Interactive Visualization", "duration": "45 min"},
                    {"id": "l6", "title": "Dashboard Creation", "duration": "55 min"},
                ]},
                {"id": "module-3", "title": "Machine Learning", "lessons": [
                    {"id": "l7", "title": "ML Fundamentals", "duration": "60 min"},
                    {"id": "l8", "title": "Regression & Classification", "duration": "55 min"},
                    {"id": "l9", "title": "Model Evaluation", "duration": "50 min"},
                ]},
            ],
            "outcomes": [
                "Analyze large datasets efficiently",
                "Create professional data visualizations",
                "Build machine learning models",
                "Understand ML algorithms deeply",
                "Deploy ML models to production",
            ],
            "testimonials": [
                {"id": "t1", "name": "Neha Kapoor", "role": "Data Analyst", "text": "Comprehensive data science curriculum. Dr. Mehta makes complex concepts easy to understand.", "rating": 5, "image": "/testimonials/neha.jpg"},
                {"id": "t2", "name": "Rohan Singh", "role": "ML Engineer", "text": "This course helped me transition from analyst to ML engineer. Highly valuable!", "rating": 4.8, "image": "/testimonials/rohan.jpg"},
            ],
            "faq": [
                {"id": "faq1", "question": "Do I need statistics background?", "answer": "Basic statistics knowledge is helpful. We cover necessary concepts during the course."},
                {"id": "faq2", "question": "What datasets do we work with?", "answer": "Real-world datasets from Kaggle and other sources. You work on multiple industry projects."},
                {"id": "faq3", "question": "Can I use this to get a job?", "answer": "Absolutely. You will have projects and certifications that employers look for in data science roles."},
            ],
            "tags": ["Data Science", "Python", "Machine Learning", "Analytics"],
        },
        {
            "slug": "react-nextjs",
            "title": "React & Next.js Mastery",
            "description": "Build modern web applications with React and Next.js",
            "long_description": "Master React and Next.js to build fast, scalable web applications. Learn server-side rendering, static generation, and modern frontend architecture.",
            "instructor": "Alex Thompson",
            "instructor_bio": "Alex is a React specialist and open-source contributor with 9+ years of frontend development experience.",
            "instructor_image": "/instructors/alex.jpg",
            "category": "Web Development",
            "level": "Intermediate",
            "price": 5499,
            "original_price": 10999,
            "rating": 4.8,
            "students": 2800,
            "duration": "9 weeks",
            "lessons": 44,
            "image": "/courses/react-nextjs.jpg",
            "curriculum": [
                {"id": "module-1", "title": "React Deep Dive", "lessons": [
                    {"id": "l1", "title": "Advanced Component Patterns", "duration": "50 min"},
                    {"id": "l2", "title": "Hooks in Depth", "duration": "55 min"},
                    {"id": "l3", "title": "State Management", "duration": "45 min"},
                ]},
                {"id": "module-2", "title": "Next.js Framework", "lessons": [
                    {"id": "l4", "title": "Routing & Navigation", "duration": "45 min"},
                    {"id": "l5", "title": "Server-Side Rendering", "duration": "50 min"},
                    {"id": "l6", "title": "API Routes", "duration": "40 min"},
                ]},
                {"id": "module-3", "title": "Performance & Optimization", "lessons": [
                    {"id": "l7", "title": "Code Splitting", "duration": "35 min"},
                    {"id": "l8", "title": "Image Optimization", "duration": "30 min"},
                    {"id": "l9", "title": "Deployment", "duration": "40 min"},
                ]},
            ],
            "outcomes": [
                "Master React fundamentals and advanced patterns",
                "Build Next.js applications",
                "Implement server-side rendering",
                "Optimize web application performance",
                "Deploy to production",
            ],
            "testimonials": [
                {"id": "t1", "name": "Zara Khan", "role": "Frontend Developer", "text": "Best React course out there. The Next.js section completely changed my approach to web development.", "rating": 5, "image": "/testimonials/zara.jpg"},
                {"id": "t2", "name": "Marcus Lee", "role": "Full Stack Developer", "text": "Clear, concise, and practical. Exactly what I needed to master Next.js.", "rating": 4.7, "image": "/testimonials/marcus.jpg"},
            ],
            "faq": [
                {"id": "faq1", "question": "Do I need React experience first?", "answer": "Yes, you should have intermediate React knowledge before taking this course."},
                {"id": "faq2", "question": "What version of Next.js?", "answer": "We use the latest Next.js 14+ with app router and latest features."},
                {"id": "faq3", "question": "Will we build production apps?", "answer": "Yes, you will build 3 production-level Next.js applications during the course."},
            ],
            "tags": ["React", "Next.js", "Frontend", "Performance"],
        },
        {
            "slug": "mobile-development-flutter",
            "title": "Mobile App Development with Flutter",
            "description": "Build cross-platform mobile apps using Flutter and Dart",
            "long_description": "Create beautiful, fast mobile applications for iOS and Android using Flutter. Learn Dart programming and build real-world apps with a single codebase.",
            "instructor": "Priya Chopra",
            "instructor_bio": "Priya is a mobile developer with 7+ years of experience building apps for startups and enterprises.",
            "instructor_image": "/instructors/priya.jpg",
            "category": "Mobile Development",
            "level": "Beginner",
            "price": 4499,
            "original_price": 8999,
            "rating": 4.6,
            "students": 1420,
            "duration": "8 weeks",
            "lessons": 38,
            "image": "/courses/flutter.jpg",
            "curriculum": [
                {"id": "module-1", "title": "Dart Fundamentals", "lessons": [
                    {"id": "l1", "title": "Dart Basics", "duration": "40 min"},
                    {"id": "l2", "title": "OOP in Dart", "duration": "45 min"},
                    {"id": "l3", "title": "Async Programming", "duration": "35 min"},
                ]},
                {"id": "module-2", "title": "Flutter UI Development", "lessons": [
                    {"id": "l4", "title": "Flutter Widgets", "duration": "50 min"},
                    {"id": "l5", "title": "Layouts & Navigation", "duration": "45 min"},
                    {"id": "l6", "title": "State Management", "duration": "50 min"},
                ]},
                {"id": "module-3", "title": "Building Complete Apps", "lessons": [
                    {"id": "l7", "title": "API Integration", "duration": "40 min"},
                    {"id": "l8", "title": "Database & Storage", "duration": "45 min"},
                    {"id": "l9", "title": "Deployment", "duration": "35 min"},
                ]},
            ],
            "outcomes": [
                "Learn Dart programming language",
                "Build Flutter applications",
                "Create iOS and Android apps",
                "Implement state management",
                "Deploy apps to app stores",
            ],
            "testimonials": [
                {"id": "t1", "name": "Karan Iyer", "role": "Mobile Developer", "text": "Flutter course was excellent. I built my first app in 4 weeks! Priya is a great mentor.", "rating": 4.8, "image": "/testimonials/karan.jpg"},
                {"id": "t2", "name": "Lisa Chen", "role": "App Developer", "text": "Cross-platform development made easy. Highly recommended for anyone learning Flutter.", "rating": 4.4, "image": "/testimonials/lisa.jpg"},
            ],
            "faq": [
                {"id": "faq1", "question": "Do I need mobile development experience?", "answer": "No, this course is beginner-friendly. Any programming background helps but is not required."},
                {"id": "faq2", "question": "Can I deploy to app stores?", "answer": "Yes, we cover the entire process of building and deploying to Google Play Store and Apple App Store."},
                {"id": "faq3", "question": "Is Flutter suitable for startups?", "answer": "Absolutely! Flutter is perfect for startups as it enables faster development and deployment."},
            ],
            "tags": ["Flutter", "Mobile", "Dart", "Cross-Platform"],
        },
    ]

    for cd in courses_data:
        course = Course(
            slug=cd["slug"],
            title=cd["title"],
            description=cd["description"],
            long_description=cd["long_description"],
            instructor=cd["instructor"],
            instructor_bio=cd["instructor_bio"],
            instructor_image=cd["instructor_image"],
            category=cd["category"],
            level=cd["level"],
            price=cd["price"],
            original_price=cd.get("original_price"),
            rating=cd["rating"],
            students=cd["students"],
            duration=cd["duration"],
            lessons=cd["lessons"],
            image=cd["image"],
            curriculum_json=json.dumps(cd["curriculum"]),
            outcomes_json=json.dumps(cd["outcomes"]),
            testimonials_json=json.dumps(cd["testimonials"]),
            faq_json=json.dumps(cd["faq"]),
        )
        # Link tags
        course.tags = [tags[t] for t in cd["tags"] if t in tags]
        db.add(course)

    # ── Instructors ──
    instructors_data = [
        {"name": "Rajesh Kumar", "bio": "Senior Python developer with 10+ years of experience", "image": "/instructors/rajesh.jpg", "expertise": ["Python", "Django", "Data Analysis"], "students": 2450, "courses_count": 3},
        {"name": "Deepak Sinha", "bio": "Java architect with 15+ years in enterprise applications", "image": "/instructors/deepak.jpg", "expertise": ["Java", "Spring Boot", "Microservices"], "students": 1820, "courses_count": 2},
        {"name": "Sarah Johnson", "bio": "Full-stack developer and startup founder", "image": "/instructors/sarah.jpg", "expertise": ["React", "Node.js", "Full Stack"], "students": 3200, "courses_count": 2},
    ]

    for i_data in instructors_data:
        instructor = Instructor(
            name=i_data["name"],
            bio=i_data["bio"],
            image=i_data["image"],
            expertise_json=json.dumps(i_data["expertise"]),
            students=i_data["students"],
            courses_count=i_data["courses_count"],
        )
        db.add(instructor)

    db.commit()
    db.close()
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed()
