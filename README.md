# 🍋 Little Lemon Restaurant - Frontend

Modern React frontend for Little Lemon restaurant management system with customer reservations and admin dashboard.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)

## ✨ Features

- 📋 **Menu Browsing** - Interactive menu with categories and item details
- 🗓️ **Reservations** - Date/time booking with real-time availability
- 🔐 **Admin Dashboard** - Manage bookings, menu items, and categories
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - Live data synchronization

## 🛠️ Tech Stack

- **React 18** + TypeScript + Vite
- **TanStack Query** - Data fetching
- **React Hook Form** + Zod - Forms & validation
- **Tailwind CSS** + shadcn/ui - Styling & components
- **React Router** - Navigation

## 🚀 Quick Start

```bash
# Clone & install
git clone <repo-url>
cd littlelemon
npm install

# Environment setup
cp .env.example .env
# Edit .env with your API URLs

# Start development
npm run dev
```

### Environment Variables
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
VITE_AUTH_BASE_URL=http://127.0.0.1:8000/auth/
```

## 📁 Project Structure

```
src/
├── apis/           # API service functions
├── app/            # Feature components (tables, forms)
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── contexts/       # React contexts (Auth)
└── lib/            # Utilities
```

## 🔗 Key Routes

- `/` - Home page
- `/menu` - Public menu
- `/reservations` - Booking form
- `/log-in` - Authentication
- `/dashboard/booking` - Admin reservations
- `/dashboard/menu` - Admin menu management
- `/dashboard/category` - Admin categories

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

Built with React + TypeScript
