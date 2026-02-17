# Velandev Academy - Setup & Getting Started

## Quick Start

### Prerequisites
- Node.js 18+ or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone/Download the project**
   ```bash
   # If using the shadcn CLI
   npx shadcn-cli@latest init my-app
   # Then copy the project files
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   - Visit `http://localhost:3000`

## Demo Account

Test the full application with the pre-created demo account:

- **Email:** demo@velandev.com
- **Password:** demo123

### How to use the demo account:
1. Click "Login" in the header
2. Click "Fill Demo Credentials" button
3. Click "Sign In"
4. You'll be redirected to the dashboard
5. Browse courses, enroll, and track progress

## Walkthrough Guide

### 1. Browsing Courses
- Go to **Courses** page
- Use the **search bar** to find courses by name
- Use **filters** on the left sidebar to narrow down by:
  - Category (Python, Java, Full Stack, etc.)
  - Level (Beginner, Intermediate, Advanced)
  - Price (Free, Paid, All)
- Use **sort dropdown** to sort by rating, price, or newest

### 2. Viewing Course Details
- Click on any course card
- View full curriculum with modules and lessons
- Read learning outcomes
- See student testimonials
- Check FAQ section
- View related courses at the bottom

### 3. Enrolling in a Course
- Click "Enroll Now" button
- Either:
  - Login if you're not authenticated
  - Or if logged in, you'll be added to dashboard immediately
- View your enrollment in the dashboard

### 4. Tracking Progress
- Go to **Dashboard** (after login)
- See your enrolled courses
- Click "+10%" button to simulate progress
- Watch the progress bar update
- See overall progress percentage

### 5. Using Wishlist
- Click the heart icon on any course
- Course will appear in your dashboard's Wishlist section
- Click heart again to remove from wishlist

### 6. Contacting Support
- Go to **Contact** page
- Fill out the contact form
- Select a subject from dropdown
- Submit to see success confirmation

### 7. Viewing Company Info
- Go to **About** page to learn about company mission, values, and team

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Global styles
│   ├── courses/
│   │   ├── page.tsx             # Courses catalog
│   │   └── [slug]/page.tsx      # Course detail page
│   ├── dashboard/
│   │   └── page.tsx             # User dashboard
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   └── admin/page.tsx           # Admin dashboard
├── components/
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Footer
│   ├── course-card.tsx          # Course card component
│   ├── course-filter.tsx        # Filter sidebar
│   ├── hero-section.tsx         # Homepage hero
│   ├── testimonials.tsx         # Testimonials carousel
│   ├── contact-form.tsx         # Contact form
│   ├── faq.tsx                  # FAQ accordion
│   ├── enrollment-modal.tsx     # Enrollment confirmation
│   ├── demo-init.tsx            # Demo data initializer
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── courses-data.ts          # Course data
│   ├── auth-context.tsx         # Authentication context
│   ├── user-data-context.tsx    # User enrollment context
│   └── init-demo.ts             # Demo initialization
├── public/                       # Static assets
├── FEATURES.md                  # Complete features list
└── SETUP.md                     # This file
```

## Key Technologies

- **Framework:** Next.js 16 with App Router
- **UI Library:** shadcn/ui components
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Authentication:** Client-side localStorage
- **Type Safety:** TypeScript

## Customization Guide

### Change Color Theme
Edit `/app/globals.css` to modify color variables:
```css
:root {
  --primary: 270 84% 55%;  /* Purple */
  --background: 12 8% 8%;  /* Dark background */
  /* ... other colors ... */
}
```

### Add New Courses
1. Open `/lib/courses-data.ts`
2. Add a new course object to the `courses` array
3. Follow the existing course structure with all required fields
4. The course will automatically appear in the catalog

### Modify Company Info
- **Homepage:** Edit `/app/page.tsx`
- **About Page:** Edit `/app/about/page.tsx`
- **Contact Info:** Edit `/app/contact/page.tsx`
- **Header/Footer:** Edit `/components/header.tsx` and `/components/footer.tsx`

### Add New Pages
1. Create new folder under `/app`
2. Add `page.tsx` file
3. Import and use existing components (Header, Footer)
4. Add navigation link in Header component

## Troubleshooting

### Demo account not working?
- Clear browser localStorage (F12 → Application → Local Storage → Clear All)
- Refresh the page
- Try logging in again

### Courses not showing?
- Check if `/lib/courses-data.ts` exists
- Verify course objects have all required fields
- Check browser console for errors

### Styles not applying?
- Make sure Tailwind CSS is properly configured
- Check `/app/globals.css` for color definitions
- Clear Next.js cache: `rm -rf .next` then `npm run dev`

## Deployment

### Deploy to Vercel (Recommended)
```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git push origin main

# Then deploy on Vercel
# Visit: https://vercel.com/new
# Select your GitHub repository
# Vercel will auto-detect Next.js and deploy
```

### Deploy to other platforms
- Netlify: `npm run build` then deploy `out` folder
- GitHub Pages: Configure for static export
- AWS Amplify: Connect GitHub and auto-deploy

## Performance Tips

1. **Images:** Replace placeholders with actual images
2. **Database:** Integrate real database for production
3. **Caching:** Use Next.js cache for static pages
4. **Analytics:** Add Google Analytics or similar
5. **CDN:** Use Vercel's built-in CDN for fast delivery

## Security Notes

⚠️ **Important for Production:**
- Do NOT store passwords in localStorage (currently for demo only)
- Implement proper backend authentication
- Use HTTPS in production
- Add CSRF protection
- Implement rate limiting on forms
- Validate all inputs server-side
- Use secure session management

## Support & Feedback

For questions or improvements:
- Check the FEATURES.md for complete feature list
- Review component code for customization examples
- Refer to shadcn/ui documentation for component usage

---

**Happy learning! 🚀**
