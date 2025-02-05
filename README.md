# FastLynk - Modern URL Shortener

🚀 FastLynk is a lightning-fast URL shortener that makes sharing links quick, smart, and effortless. Built with React, Node.js, and MongoDB.

## 🚀 DEMO
[FastLynk - Shorten your links and generate QR codes instantly](https://fastlynk.vercel.app/)

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
 
## API Endpoints
### 1. Generate a Short URL
**Endpoint:** `POST /shorten`

**Description:** Creates a short URL for the given long URL. Optionally, users can set a password for access control and enable one-time usage.

**Request Body:**
```json
{
  "longUrl": "https://example.com",
  "password": "optional-password",
  "isOneTime": true
}
```

**Response:**
```json
{
  "shortId": "abc123",
  "isProtected": true,
  "isOneTime": true
}
```

**Error Responses:**
- `400 Bad Request` if the `longUrl` is missing or invalid.

---

### 2. Check If a URL is Password Protected or Handle Redirect
**Endpoint:** `GET /:shortId`

**Description:** Retrieves the long URL associated with the short ID. If the URL is password-protected, it will return a flag indicating protection. If the URL is one-time use and already accessed, it returns an error.

**Response:**
- If the URL is protected:
```json
{
  "isProtected": true,
  "isOneTime": false
}
```
- If the URL is not protected:
```json
"https://example.com"
```

**Error Responses:**
- `404 Not Found` if the short ID does not exist.
- `410 Gone` if the URL was one-time use and already accessed.

---

### 3. Verify Password and Get URL
**Endpoint:** `POST /:shortId/access`

**Description:** If a URL is password-protected, this endpoint verifies the password and returns the original long URL. If the URL is not password-protected, it behaves like the previous endpoint.

**Request Body:**
```json
{
  "password": "your-password"
}
```

**Response:**
```json
"https://example.com"
```

**Error Responses:**
- `404 Not Found` if the short ID does not exist.
- `401 Unauthorized` if the password is incorrect.
- `410 Gone` if the URL was one-time use and already accessed.

---
## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
- `git clone https://github.com/oudayfatteh/fastlynk.git`
- `cd fastlynk`
2. Install dependencies:
Install backend dependencies
- `cd server`
- `npm install`
Install frontend dependencies
- `cd ../client`
- `npm install`
3. Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
4. Start the development servers:
Start backend server (from server directory)
- `npm start`
Start frontend server (from client directory)
- `npm run dev`
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
