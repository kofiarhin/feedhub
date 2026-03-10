# FeedHub

FeedHub is a multi-restaurant food ordering platform built with the MERN stack. It is designed to let multiple restaurants operate on the same platform while giving customers a clean way to discover restaurants, browse menus, add items to a cart, and place orders.

The platform supports both guest customers and registered users. Restaurant admins can manage their own restaurant, menu, and incoming orders from an admin dashboard. The MVP uses cash on delivery and a simple order lifecycle.

---

# Table of Contents

- Overview
- Goals
- Core Features
- User Roles
- Order Lifecycle
- Tech Stack
- Product Scope
- System Architecture
- Project Structure
- Frontend Architecture
- Backend Architecture
- Database Design
- Data Models
- Predefined Food Tags
- Search System
- Authentication and Authorization
- Guest Checkout Flow
- Registered User Flow
- Restaurant Admin Flow
- Cart System
- Checkout Logic
- Order Management
- API Design
- Validation Rules
- Error Handling
- File Upload and Image Strategy
- Environment Variables
- Local Development Setup
- Deployment Plan
- Security Practices
- Performance Considerations
- Testing Strategy
- MVP Roadmap
- Future Features
- Suggested Development Phases
- License

---

# Overview

FeedHub is a production-oriented food ordering platform where:

- restaurants can sign up and manage their own storefront
- admins can manage menus, availability, and incoming orders
- customers can search for restaurants and food items
- guests can place orders without creating an account
- registered users can track their orders and view order history

The project is built with scalability in mind, even at MVP level. The app should support multiple restaurants at the same time, with clear ownership boundaries between stores and their data.

---

# Goals

The main goals of FeedHub are:

- support multiple restaurants under one platform
- give restaurant admins a simple dashboard
- let customers quickly discover food and place orders
- support guest checkout for low friction ordering
- maintain a clean codebase with modular backend and frontend structure
- use production-ready patterns from the start
- keep the MVP simple while leaving room for future growth

---

# Core Features

## Customer Features

- browse all restaurants
- view single restaurant details
- browse restaurant menu categories
- view menu items
- search menu items by predefined tags
- add items to cart
- edit cart quantities
- remove items from cart
- checkout as guest
- register and log in
- view previous orders if registered

## Restaurant Admin Features

- create and manage restaurant profile
- create menu categories
- create menu items
- edit menu items
- delete menu items
- toggle menu item availability
- receive customer orders
- update order statuses
- view order history

## Platform Features

- multi-restaurant architecture
- role-based access control
- tag-based food search
- guest and registered checkout support
- clean order status lifecycle
- support for menu images
- scalable database structure

---

# User Roles

## 1. Guest Customer

A guest customer can:

- browse restaurants
- add menu items to cart
- place an order
- provide name, phone number, and delivery address during checkout

A guest customer cannot:

- view account-based order history
- manage saved details
- access admin features

## 2. Registered Customer

A registered customer can:

- do everything a guest can do
- save account details
- log in and out
- view order history
- reuse saved delivery details

## 3. Restaurant Admin

A restaurant admin can:

- create and manage one or more restaurant records depending on your platform rules
- manage restaurant profile
- manage categories and menu items
- toggle item availability
- upload item images
- assign predefined tags
- receive new orders
- update order statuses
- view past orders

---

# Order Lifecycle

FeedHub uses a simple status lifecycle for MVP:

1. Pending
2. Preparing
3. Ready
4. Completed

## Status Meaning

### Pending
The order has just been placed and is waiting for the restaurant to begin processing.

### Preparing
The restaurant has accepted the order and is currently preparing it.

### Ready
The order is ready for pickup or delivery handoff.

### Completed
The order has been fulfilled successfully.

---

# Tech Stack

## Frontend

- React
- Vite
- SCSS

## Backend

- Node.js
- Express

## Database

- MongoDB
- Mongoose

## Deployment

- Frontend on Vercel
- Backend on Heroku
- MongoDB Atlas for production database

---

# Product Scope

This MVP includes:

- multi-restaurant support
- restaurant onboarding
- restaurant admin dashboard
- menu category management
- menu item CRUD
- item availability toggling
- food tag search
- cart system
- guest checkout
- authenticated user checkout
- order lifecycle tracking
- basic order history
- cash on delivery

This MVP does not yet require:

- online payments
- delivery tracking
- real-time notifications
- promo codes
- reviews
- multi-restaurant cart
- advanced analytics

---

# System Architecture

FeedHub should be structured as two main applications:

## Frontend App
A React client responsible for:

- public browsing
- restaurant pages
- cart and checkout
- authentication screens
- customer order history
- admin dashboard UI

## Backend API
An Express API responsible for:

- authentication
- restaurant management
- menu management
- order processing
- validation
- authorization
- business rules
- database access

## Database
MongoDB stores:

- users
- stores
- menu items
- orders

---

# Project Structure

```bash
feedhub/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── store.controller.js
│   │   │   ├── menuItem.controller.js
│   │   │   ├── order.controller.js
│   │   │   └── search.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Store.js
│   │   │   ├── MenuItem.js
│   │   │   └── Order.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── store.routes.js
│   │   │   ├── menuItem.routes.js
│   │   │   ├── order.routes.js
│   │   │   └── search.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── store.service.js
│   │   │   ├── menuItem.service.js
│   │   │   ├── order.service.js
│   │   │   └── search.service.js
│   │   │
│   │   ├── utils/
│   │   │   ├── appError.js
│   │   │   ├── catchAsync.js
│   │   │   ├── generateToken.js
│   │   │   └── constants.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── restaurant/
│   │   │   ├── menu/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── admin/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── RestaurantDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── MenuManagement.jsx
│   │   │       └── OrdersManagement.jsx
│   │   │
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
