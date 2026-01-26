🌐 Idioma:
[English](README.md) | [Español](README.es.md)


📦 Fullstack – Sistema Web de Gestión

Aplicación web fullstack diseñada para gestionar operaciones de negocio utilizando acceso basado en roles, arquitectura modular y sincronización de datos en tiempo real.

El sistema simula un entorno operativo del mundo real (flujo tipo restaurante), donde distintos usuarios interactúan con la plataforma según su rol y permisos.

🚀 Funciones principales

Autenticación basada en roles (Administrador, Cajero, Cocinero)

Diseño de sistema modular

Operaciones CRUD

Actualizaciones en tiempo real con Firestore

Acceso seguro con Firebase Authentication

Interfaz responsiva (móvil y escritorio)

👥 Roles y responsabilidades

Administrador

Gestión de usuarios y menú

Visualización de ventas y reservaciones

Dashboard y reportes

Cajero

Creación y gestión de pedidos

Seguimiento del estado de pedidos

Comunicación en tiempo real con cocina

Cocinero

Visualización de pedidos en tiempo real

Actualización del estado de pedidos (preparando / listo)

🧩 Módulos del sistema

Autenticación

Gestión de menú

Reservaciones

Pedidos

Panel de caja

Panel de cocina

Dashboard de administrador

El acceso a los módulos está estrictamente controlado por el rol del usuario.

🏗️ Descripción de la arquitectura

Frontend: HTML, CSS, JavaScript

Backend: Firebase (BaaS)

Firestore (base de datos NoSQL en tiempo real)

Firebase Authentication

Arquitectura: Cliente–Servidor

Flujo de datos: Totalmente sincronizado en tiempo real entre roles

🗄️ Base de datos (Firestore)

Colecciones principales:

users (roles y autenticación)

menus

reservations

orders

Optimizada con índices para consultas por fecha, estado y usuario.

🛠️ Stack tecnológico

Frontend

HTML

CSS

JavaScript

Backend

Firebase

Firestore

Authentication

Reglas de seguridad

Hosting

🗂️ Estructura del proyecto

```bash

fullstack-web-management-system/
│
├── .firebase/ # Archivos de caché de Firebase
│
├── assets/ # Recursos estáticos
│ ├── bg.jpg
│ └── logo.png
│
├── client/
│ └── node_modules/ # Dependencias del proyecto
│
├── admin.html # Vista administrador
├── cajero.html # Vista cajero
├── cocinero.html # Vista cocina
├── reservar.html # Vista de reservaciones
├── index.html # Página principal / login
├── 404.html # Página de error
│
├── app.js # Lógica principal de la aplicación
├── styles.css # Estilos globales
│
├── firebase.json # Configuración de Firebase Hosting
├── firestore.rules # Reglas de seguridad de Firestore
├── firestore.indexes.json # Índices de Firestore
├── .firebaserc # Configuración del proyecto Firebase
│
├── setAdminClaims.js # Script para asignar roles a usuarios
├── serviceAccountKey.json # Credenciales de servicio
│
├── package.json # Configuración del proyecto
├── package-lock.json
└── .gitignore
```

🔐 Seguridad

Firebase Authentication

Autorización basada en roles

Reglas de seguridad en Firestore

Acceso restringido a módulos sensibles

🔗 Enlaces

Aplicación en vivo: https://sazon-tete.web.app

Panel de administrador: https://sazon-tete.web.app/admin.html

Video demo: https://drive.google.com/file/d/1O0STTgekU5gSfQqalsQofp0dSWgIlabs/view

Código fuente: https://drive.google.com/drive/folders/1A8mOoLQw94BxS4CR9oxgJKJYp3hdTZkO

📌 Estado

✅ Funcional
🔧 En mejora continua

👨‍💻 Autor

Desarrollado por Erik Eduardo Escobar Farias