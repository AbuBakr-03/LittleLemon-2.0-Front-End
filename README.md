# 🍋 Little Lemon Restaurant Management System

A modern, full-stack restaurant management system built with React, TypeScript, and Django. This application provides both a customer-facing interface for viewing menus and making reservations, and an admin dashboard for managing bookings, menu items, and categories.


## ✨ Features

### 🌟 Customer Features
- **Menu Browsing**: View categorized menu items with detailed descriptions and images
- **Table Reservations**: Book tables with date/time selection and seating preferences
- **Real-time Availability**: See available time slots based on existing bookings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 Admin Dashboard
- **Booking Management**: View, edit, and delete customer reservations
- **Menu Management**: Add, update, and remove menu items with image uploads
- **Category Management**: Organize menu items by categories
- **Advanced Filtering**: Filter bookings by date, seating preference, and guest count
- **Data Tables**: Sortable and paginated views with column customization
- **Real-time Updates**: Instant data synchronization across the system

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication system
- **Role-based Access Control**: Admin and user role separation
- **Protected Routes**: Private dashboard routes with authentication guards
- **Token Refresh**: Automatic token renewal for seamless user experience

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** component library

### Backend
- **Django** with Django REST Framework
- **MySQL** database
- **JWT Authentication** with Simple JWT
- **Djoser** for user management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MySQL** server
- **npm** or **yarn**
- **pip** (Python package manager)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/littlelemon.git
cd littlelemon
```

### 2. Backend Setup (Django)

#### Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt djoser django-filter mysqlclient
```

#### Database Configuration
1. Create a MySQL database named `littlelemondb`
2. Update database settings in `LittleLemon/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'littlelemondb',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

#### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser
```bash
python manage.py createsuperuser
```

#### Start Django Server
```bash
python manage.py runserver
```
The backend will be available at `http://127.0.0.1:8000/`

### 3. Frontend Setup (React)

#### Navigate to Frontend Directory
```bash
cd littlelemon
```

#### Install Dependencies
```bash
npm install
```

#### Start Development Server
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173/`

## 📁 Project Structure

```
littlelemon/
├── backend/
│   ├── LittleLemon/           # Django project settings
│   ├── LittleLemonApp/        # Main Django app
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   └── urls.py            # URL routing
│   └── manage.py
├── littlelemon/               # React frontend
│   ├── src/
│   │   ├── apis/              # API service functions
│   │   ├── app/               # Feature-specific components
│   │   ├── components/        # Reusable UI components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   └── lib/               # Utility functions
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
VITE_AUTH_BASE_URL=http://127.0.0.1:8000/auth/
```

### Django Settings
Key settings in `settings.py`:
- `CORS_ALLOWED_ORIGINS`: Frontend URL for CORS
- `SIMPLE_JWT`: JWT token configuration
- `REST_FRAMEWORK`: DRF settings
- `MEDIA_ROOT` and `MEDIA_URL`: File upload settings

## 🔗 API Endpoints

### Authentication
- `POST /auth/jwt/create/` - Login
- `POST /auth/jwt/refresh/` - Refresh token
- `POST /auth/users/` - Register
- `POST /auth/logout/` - Logout

### Bookings
- `GET /api/booking/` - List bookings
- `POST /api/booking/` - Create booking
- `GET /api/booking/{id}/` - Get booking details
- `PUT /api/booking/{id}/` - Update booking
- `DELETE /api/booking/{id}/` - Delete booking

### Menu Items
- `GET /api/menu/` - List menu items
- `POST /api/menu/` - Create menu item
- `GET /api/menu/{id}/` - Get menu item details
- `PUT /api/menu/{id}/` - Update menu item
- `DELETE /api/menu/{id}/` - Delete menu item

### Categories
- `GET /api/category/` - List categories
- `POST /api/category/` - Create category
- `GET /api/category/{id}/` - Get category details
- `PUT /api/category/{id}/` - Update category
- `DELETE /api/category/{id}/` - Delete category

## 👥 User Roles

### User
- Browse menu items
- Make table reservations
- View available time slots

### Admin
- All customer features
- Access to admin dashboard
- Manage bookings, menu items, and categories
- View analytics and reports

## 🎨 Key Features Implementation

### Responsive Data Tables
- Built with TanStack Table
- Sortable columns with custom headers
- Advanced filtering and search
- Pagination with customizable page sizes
- Column visibility controls

### Form Validation
- React Hook Form with Zod schema validation
- Real-time form validation
- Custom error messages
- File upload handling

### Real-time Updates
- TanStack Query for efficient data fetching
- Automatic cache invalidation
- Optimistic updates for better UX

### Authentication Flow
- JWT token management
- Automatic token refresh
- Protected route guards
- Role-based access control
