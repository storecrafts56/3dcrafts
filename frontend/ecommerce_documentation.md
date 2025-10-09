# MERN Stack E-Commerce Platform - Complete Documentation

## 📋 Project Overview

A full-featured e-commerce platform with separate customer-facing frontend and admin panel, built using the MERN stack (MongoDB, Express.js, React, Node.js).

---

## 🏗️ Project Structure

```
ecommerce-platform/
├── frontend/                 # Customer-facing React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── VideoSection.jsx
│   │   │   ├── CustomerFeedback.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Subscribe.jsx
│   │   │   ├── WhatsAppFloat.jsx
│   │   │   └── Cart/
│   │   │       ├── CartItem.jsx
│   │   │       └── CheckoutForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── admin/                    # Admin Dashboard React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── OrderTable.jsx
│   │   │   └── CustomerTable.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Homepage.jsx
│   │   │   └── Subscribers.jsx
│   │   ├── context/
│   │   │   └── AdminAuthContext.jsx
│   │   ├── services/
│   │   │   └── adminApi.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                  # Express.js API Server
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   ├── Subscriber.js
│   │   └── Homepage.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── reviews.js
│   │   ├── subscribers.js
│   │   ├── homepage.js
│   │   └── admin.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   ├── subscriberController.js
│   │   └── homepageController.js
│   ├── utils/
│   │   ├── emailService.js
│   │   └── validators.js
│   ├── uploads/              # Image upload directory
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔧 Technology Stack

### Frontend (Customer & Admin)
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Context API** - State management
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

---

## 📦 Database Schema

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  role: String (enum: ['customer', 'admin'], default: 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  longDescription: String,
  howWePrepare: String,
  price: Number (required),
  images: [String], // URLs
  sizes: [String], // ['5"', '8"', '12"', '16"', '20"', '24"', '28"']
  stock: Number (default: 0),
  featured: Boolean (default: false),
  category: String,
  tags: [String],
  averageRating: Number (default: 0),
  reviewCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String (unique, auto-generated),
  userId: ObjectId (ref: 'User'),
  products: [{
    productId: ObjectId (ref: 'Product'),
    name: String,
    size: String,
    quantity: Number,
    price: Number,
    customImage: String // uploaded image URL
  }],
  total: Number,
  paymentType: String (enum: ['full', 'half']),
  paidAmount: Number,
  transactionId: String,
  status: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    pincode: String
  },
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Reviews Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId (ref: 'Product'),
  userId: ObjectId (ref: 'User'),
  userName: String,
  rating: Number (1-5, required),
  comment: String,
  approved: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Subscribers Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  subscribedAt: Date (default: Date.now),
  active: Boolean (default: true)
}
```

### 6. Homepage Collection
```javascript
{
  _id: ObjectId,
  banners: [{
    image: String,
    title: String,
    subtitle: String,
    link: String,
    order: Number
  }],
  videos: [{
    url: String,
    title: String,
    description: String
  }],
  faqs: [{
    question: String,
    answer: String,
    order: Number
  }],
  policies: [{
    title: String,
    content: String,
    icon: String
  }],
  whatsappNumber: String,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

### JWT Token Structure
```javascript
{
  userId: ObjectId,
  email: String,
  role: String,
  iat: Number,
  exp: Number
}
```

### Protected Routes
- **Customer**: Profile, Orders, Reviews
- **Admin**: All admin panel routes

### Middleware Implementation
```javascript
// Verify JWT token
// Check user role
// Attach user data to request
```

---

## 🎨 Frontend Features & Components

### Customer Frontend

#### 1. Homepage (`/`)
**Components:**
- `Header` - Logo, Menu (Home, Catalog, Contact), Search, Cart icon
- `FeaturedBanner` - Dynamic slider from admin
- `FeaturedProducts` - Grid of featured products
- `VideoSection` - Embedded video about products
- `CustomerFeedback` - Review carousel
- `PolicySection` - Dynamic policy cards
- `FAQ` - Accordion-style FAQs
- `Subscribe` - Email subscription form
- `Footer` - Links, contact info, social media
- `WhatsAppFloat` - Fixed floating button

#### 2. Product Detail Page (`/product/:id`)
**Features:**
- Image gallery with zoom
- Product name, price, rating
- Size selector (5" to 28")
- Image upload for customization
- Quantity selector
- Payment type selector (Full/Half)
- Pincode availability checker
- Add to Cart button
- Buy Now button
- Full description section
- "How We Prepare" section
- Customer reviews with ratings

#### 3. Catalog Page (`/catalog`)
**Features:**
- Product grid
- Filter by category
- Sort by (price, rating, newest)
- Search functionality
- Pagination

#### 4. Cart & Checkout (`/cart`, `/checkout`)
**Features:**
- Cart items list
- Update quantity
- Remove items
- Apply coupon (optional)
- Shipping details form
- QR code for payment
- Transaction ID input
- Order summary
- Order confirmation

### Admin Panel

#### 1. Login (`/admin/login`)
**Features:**
- Email & password authentication
- JWT token storage
- Protected routes

#### 2. Dashboard (`/admin/dashboard`)
**Features:**
- Statistics cards (products, orders, customers, revenue)
- Recent orders table
- Quick actions
- Charts (optional)

#### 3. Products Management (`/admin/products`)
**Features:**
- Product list table
- Add new product form
- Edit product
- Delete product
- Toggle featured status
- Image upload (multiple)
- Stock management

#### 4. Orders Management (`/admin/orders`)
**Features:**
- Orders table with filters
- Real-time order notifications
- Order status update
- View order details
- Transaction verification
- Export orders

#### 5. Customers Management (`/admin/customers`)
**Features:**
- Customer list
- View customer details
- Order history per customer
- Export customer data

#### 6. Homepage Management (`/admin/homepage`)
**Features:**
- Banner management (add, edit, delete, reorder)
- Video section editor
- FAQ manager
- Policy editor
- WhatsApp number setting

#### 7. Subscribers (`/admin/subscribers`)
**Features:**
- Email subscriber list
- Export emails
- Unsubscribe management

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user
POST   /api/auth/admin/login       - Admin login
```

### Products
```
GET    /api/products               - Get all products (with pagination, filters)
GET    /api/products/featured      - Get featured products
GET    /api/products/:id           - Get single product
POST   /api/products               - Create product (admin)
PUT    /api/products/:id           - Update product (admin)
DELETE /api/products/:id           - Delete product (admin)
POST   /api/products/:id/upload    - Upload product images (admin)
```

### Orders
```
GET    /api/orders                 - Get user orders
GET    /api/orders/:id             - Get single order
POST   /api/orders                 - Create new order
GET    /api/admin/orders           - Get all orders (admin)
PUT    /api/admin/orders/:id       - Update order status (admin)
```

### Reviews
```
GET    /api/reviews/product/:id    - Get product reviews
POST   /api/reviews                - Create review
GET    /api/admin/reviews          - Get all reviews (admin)
PUT    /api/admin/reviews/:id      - Approve review (admin)
DELETE /api/admin/reviews/:id      - Delete review (admin)
```

### Subscribers
```
POST   /api/subscribers            - Subscribe to newsletter
GET    /api/admin/subscribers      - Get all subscribers (admin)
DELETE /api/admin/subscribers/:id  - Unsubscribe (admin)
```

### Homepage
```
GET    /api/homepage               - Get homepage content
PUT    /api/admin/homepage         - Update homepage content (admin)
```

### Utilities
```
POST   /api/check-pincode          - Check pincode availability
POST   /api/upload-custom-image    - Upload customization image
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (v5+)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=30d

# Email Configuration (for Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@yourdomain.com

# Upload Configuration
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads

# Frontend URLs
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# WhatsApp
WHATSAPP_NUMBER=+1234567890
```

4. **Start server:**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server:**
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Admin Panel Setup

1. **Navigate to admin directory:**
```bash
cd admin
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server:**
```bash
npm run dev
```

Admin panel runs on `http://localhost:5174`

---

## 📝 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/ecommerce |
| JWT_SECRET | Secret key for JWT | random_secret_key |
| JWT_EXPIRE | Token expiration time | 30d |
| EMAIL_HOST | SMTP host | smtp.gmail.com |
| EMAIL_PORT | SMTP port | 587 |
| EMAIL_USER | Email username | your@email.com |
| EMAIL_PASSWORD | Email password/app password | app_password |
| ADMIN_EMAIL | Admin notification email | admin@domain.com |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |
| ADMIN_URL | Admin URL | http://localhost:5174 |

### Frontend & Admin (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

---

## 🔒 Security Features

1. **Password Hashing** - bcrypt with salt rounds
2. **JWT Authentication** - Secure token-based auth
3. **Input Validation** - Server-side validation
4. **CORS Protection** - Configured origins
5. **Rate Limiting** - Prevent API abuse (optional)
6. **XSS Protection** - Sanitize user inputs
7. **File Upload Validation** - Type and size checks
8. **Environment Variables** - Sensitive data protection

---

## 📧 Email Notifications

### Automated Emails:
1. **Order Confirmation** - Sent to customer
2. **Order Notification** - Sent to admin
3. **Order Status Update** - Sent to customer
4. **Welcome Email** - New subscriber

### Email Template Structure:
```javascript
{
  to: 'recipient@email.com',
  subject: 'Subject Line',
  html: '<email template>',
  attachments: [] // optional
}
```

---

## 🎯 Key Features Implementation

### 1. Real-time Order Notifications
**Technology:** Socket.io or Polling
```javascript
// When new order is created
io.emit('newOrder', orderData);

// Admin listens for new orders
socket.on('newOrder', (data) => {
  // Update orders list
  // Show notification
});
```

### 2. Image Upload (Multiple Images)
**Technology:** Multer
```javascript
// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: imageFilter
});

// Route
router.post('/upload', upload.array('images', 5));
```

### 3. Dynamic Pricing (Half/Full Payment)
```javascript
const calculatePrice = (basePrice, paymentType) => {
  return paymentType === 'half' ? basePrice * 0.5 : basePrice;
};
```

### 4. Pincode Availability Checker
```javascript
// Maintain pincode list in DB or config
const checkPincode = async (pincode) => {
  // Check against available pincodes
  // Return availability and estimated delivery
};
```

### 5. Featured Products Selection
```javascript
// Toggle featured in admin
Product.findByIdAndUpdate(id, { featured: !product.featured });

// Fetch featured products
Product.find({ featured: true }).limit(8);
```

---

## 🧪 Testing Checklist

### Frontend Testing
- [ ] Homepage loads correctly
- [ ] Product catalog displays
- [ ] Product detail page shows all info
- [ ] Add to cart functionality
- [ ] Cart page calculations
- [ ] Checkout form validation
- [ ] Image upload works
- [ ] Responsive design on mobile
- [ ] Search functionality
- [ ] WhatsApp button redirects

### Backend Testing
- [ ] User registration
- [ ] User login
- [ ] JWT token validation
- [ ] Product CRUD operations
- [ ] Order creation
- [ ] Email notifications
- [ ] File upload
- [ ] API error handling
- [ ] Database connections
- [ ] Admin authentication

### Integration Testing
- [ ] Frontend-backend communication
- [ ] Order flow (cart to confirmation)
- [ ] Admin panel operations
- [ ] Real-time updates
- [ ] Payment verification flow

---

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for production:**
```bash
npm run build
```

2. **Set environment variables** in hosting platform

3. **Configure MongoDB Atlas** for cloud database

4. **Deploy:**
```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. **Build production:**
```bash
npm run build
```

2. **Configure build settings:**
- Build command: `npm run build`
- Output directory: `dist`

3. **Set environment variables**

4. **Deploy** via GitHub integration or CLI

### Important Notes:
- Update CORS origins in backend
- Use environment variables for URLs
- Enable HTTPS
- Configure file storage (S3 for production)
- Set up CDN for images

---

## 🔄 Workflow Diagram

```
User Journey:
Landing → Browse Products → View Details → Customize → Add to Cart → Checkout → Payment → Order Confirmation

Admin Journey:
Login → Dashboard → Manage Products/Orders → Update Content → Monitor Sales

Data Flow:
Frontend (React) ↔ API (Express) ↔ Database (MongoDB)
                ↓
          Email Service (Nodemailer)
```

---

## 📊 Performance Optimization

1. **Image Optimization**
   - Compress images before upload
   - Use lazy loading
   - Implement CDN

2. **Database Optimization**
   - Index frequently queried fields
   - Use pagination
   - Implement caching (Redis)

3. **Code Splitting**
   - React lazy loading
   - Route-based code splitting

4. **API Optimization**
   - Implement rate limiting
   - Use compression middleware
   - Optimize database queries

---

## 🐛 Common Issues & Solutions

### Issue: CORS errors
**Solution:** Configure CORS in backend:
```javascript
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true
}));
```

### Issue: Image upload fails
**Solution:** Check file size limits and multer configuration

### Issue: JWT token expires
**Solution:** Implement refresh token logic or extend expiration

### Issue: MongoDB connection fails
**Solution:** Check connection string and network access

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io)

---

## 👨‍💻 Development Tips

1. **Use .gitignore:**
```
node_modules/
.env
uploads/
dist/
build/
```

2. **Code Organization:**
   - Keep components small and reusable
   - Use proper folder structure
   - Follow naming conventions
   - Comment complex logic

3. **Version Control:**
   - Commit frequently
   - Use descriptive commit messages
   - Create branches for features

4. **Error Handling:**
   - Always use try-catch blocks
   - Return meaningful error messages
   - Log errors for debugging

---

## 🎓 Learning Path

1. **Beginner:** Setup project, create basic routes
2. **Intermediate:** Implement authentication, CRUD operations
3. **Advanced:** Add real-time features, optimize performance
4. **Production:** Deploy and monitor application

---

## 📞 Support

For issues or questions:
- Check documentation
- Review error logs
- Test API endpoints with Postman
- Debug with browser DevTools

---

## 🏆 Project Completion Checklist

### MVP (Minimum Viable Product)
- [ ] User authentication
- [ ] Product listing
- [ ] Product detail page
- [ ] Add to cart
- [ ] Checkout process
- [ ] Admin login
- [ ] Admin product management
- [ ] Order management

### Full Features
- [ ] All MVP features
- [ ] Image customization upload
- [ ] Email notifications
- [ ] Customer reviews
- [ ] Homepage content management
- [ ] Subscriber management
- [ ] Real-time order updates
- [ ] Pincode checker
- [ ] FAQ management
- [ ] Policy management
- [ ] WhatsApp integration
- [ ] Payment verification
- [ ] Responsive design

### Production Ready
- [ ] All features complete
- [ ] Tested thoroughly
- [ ] Deployed to production
- [ ] SSL certificate configured
- [ ] Analytics setup
- [ ] Error monitoring
- [ ] Backup strategy
- [ ] Documentation complete

---

**Last Updated:** October 2025
**Version:** 1.0.0
**Status:** Ready for Development

---

## 🎯 Quick Start for bolt.new

Copy this entire documentation and paste it into bolt.new with the following prompt:

```
Build a MERN stack e-commerce platform according to this complete specification. 
Create the full project structure with:
1. Backend API with Express and MongoDB
2. Customer-facing React frontend with Tailwind CSS
3. Admin panel React app
4. All features mentioned in the documentation
5. Proper authentication and authorization
6. Image upload functionality
7. Email notifications
8. Real-time order updates

Make sure all components are functional and connected properly.
```

---

**Ready to Build!** 🚀