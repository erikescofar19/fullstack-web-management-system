🌐 Language:
[English](README.md) | [Español](README.es.md)


📦 Fullstack – Web Management System

A fullstack web application designed to manage business operations using role-based access, modular architecture, and real-time data synchronization.

The system simulates a real-world operational environment (restaurant-style workflow), where different users interact with the platform according to their role and permissions.

   KEY FEATURES

Role-based authentication (Admin, Cashier, Cook)

Modular system design

CRUD operations

Real-time updates with Firestore

Secure access with Firebase Authentication

Responsive UI (mobile & desktop)

   ROLES & RESPONSABILITIES
Administrator

User and menu management

Sales and reservations overview

Dashboard and reports

Cashier

Order creation and management

Order status tracking

Real-time communication with kitchen

Cook

Real-time order visualization

Order status updates (preparing / ready)

   SYSTEM MODULES

Authentication

Menu Management

Reservations

Orders

Cashier Panel

Kitchen Panel

Admin Dashboard

Access to modules is strictly controlled by user role.

   ARCHITECTURE OVERVIEW

Frontend: HTML, CSS, JavaScript

Backend: Firebase (BaaS)

Firestore (NoSQL, real-time database)

Firebase Authentication

Architecture: Client–Server

Data flow: Fully synchronized in real time across roles

  DATABASE (FIREBASE)

Main collections:

users (roles & auth)

menus

reservations

orders

Optimized with indexes for date, status, and user queries.

  TECH STACK

Frontend

HTML

CSS

JavaScript

Backend

Firebase

Firestore

Authentication

Security Rules

Hosting

##  PROJECT STRUCTURE

```bash 

fullstack-web-management-system/
│
├── .firebase/ # Firebase cache files
│
├── assets/ # Static assets
│ ├── bg.jpg
│ └── logo.png
│
├── client/
│ └── node_modules/ # Project dependencies
│
├── admin.html # Administrator view
├── cajero.html # Cashier view
├── cocinero.html # Kitchen view
├── reservar.html # Reservations view
├── index.html # Main page / login
├── 404.html # Error page
│
├── app.js # Main application logic
├── styles.css # Global styles
│
├── firebase.json # Firebase Hosting configuration
├── firestore.rules # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── .firebaserc # Firebase project config
│
├── setAdminClaims.js # Script to assign user roles
├── serviceAccountKey.json # Service credentials
│
├── package.json # Project configuration
├── package-lock.json
└── .gitignore
```

   SECURITY

Firebase Authentication

Role-based authorization

Firestore security rules

Restricted access to sensitive modules

   LINKS

Live App: https://sazon-tete.web.app

Admin Panel: https://sazon-tete.web.app/admin.html

Demo Video: https://drive.google.com/file/d/1O0STTgekU5gSfQqalsQofp0dSWgIlabs/view

Source Code: https://drive.google.com/drive/folders/1A8mOoLQw94BxS4CR9oxgJKJYp3hdTZkO

   STATUS

 -Functional
 -Continuous improvement

   AUTHOR

Developed by Erik Eduardo Escobar Farias