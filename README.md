# FastLynk - Modern URL Shortener

🚀 FastLynk is a lightning-fast URL shortener that makes sharing links quick, smart, and effortless. Built with React, Node.js, and MongoDB.

## ✨ Features

- **Quick URL Shortening**: Convert long URLs into short, manageable links instantly
- **QR Code Generation**: Automatically generate QR codes for shortened URLs
- **Password Protection**: Secure your links with optional password protection
- **One-Time Links**: Create links that expire after first use
- **Copy to Clipboard**: Easy one-click copying with visual feedback
- **Real-time Validation**: Instant feedback for invalid URLs and passwords

## 🛠️ Tech Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Axios for API requests
  - QRCode.react for QR code generation

- **Backend**:
  - Node.js & Express
  - MongoDB with Mongoose
  - bcrypt for password hashing
  - nanoid for generating unique IDs

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
bash
git clone https://github.com/oudayfatteh/fastlynk.git
cd fastlynk
2. Install dependencies:
bash
Install backend dependencies
cd server
npm install
Install frontend dependencies
cd ../client
npm install
3. Create a `.env` file in the server directory:
env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
4. Start the development servers:
bash
Start backend server (from server directory)
npm start
Start frontend server (from client directory)
npm run dev
## 💻 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a long URL in the input field
3. Optional features:
   - Enable password protection and set a password
   - Enable one-time use for the link
4. Click "Shorten" to generate your short URL
5. Share your shortened link:
   - Copy the link using the copy button
   - Share the QR code for mobile access

## 🔐 Security Features

- **Password Protection**: 
  - Securely hash passwords using bcrypt
  - Custom password protection for sensitive links
- **One-Time Access**: 
  - Links can be set to expire after first use
  - Automatic cleanup of expired links
- **Input Validation**: 
  - URL validation and sanitization
  - Protection against malicious inputs