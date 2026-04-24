# Binud Software Solutions - Company Website

A modern, full-featured company website built with React, Firebase, and Tailwind CSS. Includes a complete admin panel for content management.

## 🚀 Features

### Public Website
- **Hero Section** - Eye-catching landing with animated elements
- **Services** - Showcase your offerings
- **Portfolio** - Display your projects with filtering
- **Team** - Introduce your team members
- **Testimonials** - Client reviews and ratings
- **Contact Form** - Integrated with Firebase Firestore
- **Fully Responsive** - Mobile-first design
- **Smooth Animations** - Powered by Framer Motion

### Admin Panel
- **Dashboard** - Overview of all content
- **Services Management** - Add/Edit/Delete services
- **Projects Management** - Manage portfolio items
- **Team Management** - Add/Edit team members
- **Testimonials** - Manage client reviews
- **Messages** - View contact form submissions
- **Firebase Authentication** - Secure admin access

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Firebase** - Backend (Auth + Firestore)
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

## 📦 Installation

1. **Clone and install dependencies:**
   ```bash
   cd binud-software-solutions
   npm install
   ```

2. **Set up Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable **Authentication** (Email/Password)
   - Enable **Firestore Database**
   - Copy your Firebase config

3. **Update Firebase config:**
   Open `src/firebase/config.js` and replace with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Create an admin user in Firebase:**
   - Go to Firebase Console → Authentication
   - Click "Add user"
   - Enter email and password (you'll use this to log in to the admin panel)

5. **Set up Firestore collections:**
   Firebase will auto-create collections when you add data through the admin panel. The collections are:
   - `services`
   - `projects`
   - `team`
   - `testimonials`
   - `messages`

## 🚀 Running the Project

### Development
```bash
npm run dev
```
Visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Use the email/password you created in Firebase Authentication
3. Access the admin dashboard at `/admin`

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to change the color scheme:
```css
@theme {
  --color-primary: #005d9e;  /* Change this */
  --color-primary-dark: #004a7f;
  --color-primary-light: #0073c4;
  --color-accent: #00b4d8;
}
```

### Company Info
Update company details in:
- `src/components/Footer.jsx` - Contact info, social links
- `src/sections/HeroSection.jsx` - Tagline and description
- `src/pages/About.jsx` - Company story and values

### Logo
Replace the "B" logo placeholder in:
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `src/pages/admin/AdminLogin.jsx`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AdminLayout.jsx
│   ├── ProtectedRoute.jsx
│   └── ScrollToTop.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Contact.jsx
│   └── admin/          # Admin pages
├── sections/           # Home page sections
│   ├── HeroSection.jsx
│   ├── StatsSection.jsx
│   ├── ServicesPreview.jsx
│   └── ...
├── context/            # React context
│   └── AuthContext.jsx
├── firebase/           # Firebase config
│   └── config.js
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🔒 Security Notes

- Never commit your Firebase config with real credentials to public repos
- Use environment variables for production
- Set up Firestore security rules in Firebase Console
- Restrict admin access to specific email domains if needed

## 📝 Firestore Security Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /{collection}/{document} {
      allow read: if true;
    }
    
    // Admin write access only
    match /{collection}/{document} {
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📧 Support

For issues or questions, contact: hello@binudsoftware.com

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ by Binud Software Solutions
