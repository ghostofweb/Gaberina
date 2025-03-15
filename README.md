# 🌟 Gaberina - Full-Stack E-commerce Website 🛍️

Gaberina is a **full-stack e-commerce website** built with **Vite (React)** for the frontend and **Node.js + Express** for the backend. It features a shopping system, user authentication, cart management, sorting & filtering, and an admin panel for CRUD operations.

---

## 🚀 Features

### 🛒 User Features
- **Shop Products** – Browse & purchase items  
- **User Authentication** – Secure login & logout  
- **Cart Management** – Add/remove products from the cart  
- **Sorting & Filtering** – Search products, filter by price, relevance, etc.  
- **Order Tracking** – View order status and history  

### 🛠️ Admin Features
- **CRUD Operations** – Add, edit, delete products  
- **Order Management** – View & update order status  

---

## 🏗️ Tech Stack

### 🖥️ Frontend (Vite + React)
- MUI  
- Axios  
- Framer Motion  
- JWT Token & Decode  
- React & React DOM  
- React Toastify  
- Tailwind CSS  

### ⚙️ Backend (Node.js + Express)
- Bcrypt (Password encryption)  
- Cloudinary (Image uploads)  
- Cookie Parser  
- Express  
- JSON Web Token (JWT)  
- JWT Decode  
- Mongoose  
- Multer (File uploads)  
- Nodemon  
- Razorpay & Stripe (Payment gateways)  
- Validator  

---

## 📂 Project Structure
```
/gaberina
├── frontend   # React (Vite) user interface
├── backend    # Node.js + Express API
├── admin      # Admin panel for product management
```

---

## 🛠️ Installation & Setup

### Clone the repository
```sh
git clone https://github.com/yourusername/gaberina.git
cd gaberina
```

### Install dependencies

#### Frontend
```sh
cd frontend
npm install
```

#### Backend
```sh
cd ../backend
npm install
```

### Configure environment variables (.env)
Create a `.env` file in the backend folder:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET=your_stripe_key
```

### Start the development servers

#### Frontend
```sh
cd frontend
npm run dev
```

#### Backend
```sh
cd ../backend
npm start
```

---

## 🚀 Deployment

| Service   | Platform          |
|-----------|------------------|
| Frontend  | Vercel           |
| Backend   | Render / Heroku  |
| Database  | MongoDB Atlas    |

---

## 📌 Future Improvements
- Add user reviews & ratings  
- Enhance UI animations  
- Optimize API responses  

💡 **Gaberina is designed to provide a seamless shopping experience while allowing easy product management via the admin panel. Contributions and feedback are welcome!** 🚀

