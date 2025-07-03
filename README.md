# 📊 Social Media Dashboard

A responsive and user-friendly dashboard for managing and analyzing social media content, interactions, and performance metrics — built with the MERN stack.

## 🚀 Features

- ✅ Login & registration (JWT-based authentication)
- 📈 View key metrics like likes, comments, shares, and engagement rates
- 📊 Graphs and charts for visual analytics (using Chart.js / Recharts)
- 🌙 Dark/light theme toggle

## 🛠️ Tech Stack

**Frontend**
- React.js (with Hooks & Context API)
- Styled-components / Tailwind CSS (based on your project)
- Axios for API requests

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- Multer (for image uploads)
- Bcrypt (for password hashing)

## ⚙️ Installation

1. **Clone the repository**<br>
git clone https://github.com/your-username/social-media-dashboard.git
cd social-media-dashboard

2. **Install frontend & backend dependencies**<br>
cd client      # or frontend   <br>
npm install

cd ../server   # or backend
npm install

3. **Set up environment variables**
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

5. **Run the project**
6. # In one terminal
cd server
npm start

# In another terminal
cd client
npm start

