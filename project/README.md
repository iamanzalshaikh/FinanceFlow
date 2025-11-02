# FinanceFlow - Personal Finance Tracker Dashboard

A full-stack Personal Finance Tracker built with the MERN stack (MongoDB, Express, React, Node.js) in pure JavaScript. Features AI-powered spending insights, budget management, recurring transactions, and comprehensive financial analytics.

## Features

- **User Authentication**: Secure JWT-based login and registration
- **Transaction Management**: Add, edit, and delete income/expense transactions
- **Budget Planner**: Set category-based or monthly budgets with progress tracking
- **Analytics Dashboard**: Visual charts showing spending by category and monthly trends
- **AI Insights**: Smart spending analysis with personalized recommendations
- **Recurring Transactions**: Automatically duplicate monthly or yearly transactions
- **Export Data**: Download transactions as CSV or PDF
- **Multi-Currency Support**: Track expenses in different currencies
- **Responsive Design**: Beautiful UI with Tailwind CSS and Framer Motion animations

## Tech Stack

### Frontend
- React 18.3 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Chart.js for data visualization
- Framer Motion for animations
- Lucide React for icons
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT authentication
- bcryptjs for password hashing
- json2csv and pdfkit for exports
- node-cron for recurring transactions

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB local instance or MongoDB Atlas connection string

## Setup

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

**Backend (.env)**:
```
MONGO_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_secure_secret_key_here
PORT=5000
```

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the Application

#### Development Mode (Frontend + Backend)
```bash
npm run dev
```

This runs both frontend (port 3000) and backend (port 5000) in parallel.

#### Individual Servers
- **Frontend only**: `npm run dev:frontend`
- **Backend only**: `npm run dev:backend`

### 4. Build for Production

```bash
npm run build
```

This creates an optimized frontend build in the `dist/` directory.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login (returns JWT token)

### Transactions
- `GET /api/transactions` - Get all transactions (supports filters)
  - Query params: `category`, `type`, `startDate`, `endDate`
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Budgets
- `GET /api/budgets` - Get all budgets with spending data
- `POST /api/budgets` - Create/update budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Exports
- `GET /api/export/csv` - Export transactions as CSV
- `GET /api/export/pdf` - Export transactions as PDF

### Insights
- `GET /api/insights` - Get AI-powered spending insights

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── Budget.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   ├── export.js
│   │   └── insights.js
│   ├── middleware/
│   │   └── auth.js
│   ├── jobs/
│   │   └── recurringTransactions.js
│   └── server.js
├── src/
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── components/
│   │   ├── SummaryCards.jsx
│   │   ├── Charts.jsx
│   │   ├── TransactionList.jsx
│   │   ├── AddTransactionModal.jsx
│   │   └── Insights.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── package.json
└── README.md
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  currency: String (default: 'USD'),
  createdAt: Date
}
```

### Transactions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: 'income' | 'expense',
  amount: Number,
  description: String,
  category: String,
  date: Date,
  isRecurring: Boolean,
  recurringType: 'monthly' | 'yearly' | 'none',
  currency: String,
  createdAt: Date
}
```

### Budgets Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  category: String,
  limit: Number,
  month: String (YYYY-MM format),
  currency: String,
  createdAt: Date
}
```

## Advanced Features

### 1. Budget Management with Alerts
Users can set monthly or category-based budgets. The system calculates spending and shows progress bars. Alerts are displayed when budgets are exceeded.

### 2. Recurring Transactions
Mark transactions as recurring (monthly/yearly). The system automatically creates duplicates using Node Cron on the first of each month.

### 3. CSV/PDF Export
Export all transactions to downloadable CSV or PDF files for record-keeping or tax purposes.

### 4. AI Spending Insights
The system analyzes spending patterns and generates:
- Category-wise spending comparisons (vs. previous month)
- Alert when spending exceeds average by 15%
- Saving potential recommendations

### 5. Multi-Currency Support
Select preferred currency during registration. Future enhancements can include real-time exchange rates via API integration.

## Usage Examples

### Add a Transaction
1. Click "Add Transaction" button
2. Fill in amount, description, category, and date
3. Optionally mark as recurring
4. Submit to save

### View Analytics
1. Go to Dashboard → Overview tab
2. View summary cards (Income, Expenses, Balance)
3. Check pie chart for spending by category
4. View bar chart for monthly income vs. expenses

### Export Data
1. Go to Transactions tab
2. Click "Export CSV" or "Export PDF"
3. File downloads to your device

### Review Insights
1. Go to Dashboard → Insights tab
2. View monthly statistics
3. Read AI-generated recommendations
4. Check category breakdown

## Future Enhancements

- Real-time exchange rate integration
- Voice summary of insights using Text-to-Speech
- PWA support for offline access
- Category color customization
- Multi-user dashboard (admin view)
- Email notifications for budget alerts
- Mobile app integration
- Advanced forecasting and predictions

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or provide valid MongoDB Atlas URI
- Check MONGO_URI in `.env` file

### Port Already in Use
- Backend default: 5000
- Frontend default: 5173
- Modify PORT in `.env` if needed

### CORS Errors
- Ensure VITE_API_URL matches backend URL in `.env`
- Check backend CORS configuration

### Build Errors
- Delete `node_modules` and `dist` directories
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Security Notes

- JWT tokens expire after 7 days
- Passwords are hashed using bcryptjs (10 salt rounds)
- Authentication middleware protects all API routes
- Always use HTTPS in production
- Change JWT_SECRET in production to a strong random string
- Use MongoDB Atlas with IP whitelist in production

## Performance Tips

- Use database indexes on frequently queried fields
- Implement pagination for large transaction lists
- Cache insights data if generating complex analytics
- Minify and compress assets in production
- Use CDN for static assets

## License

MIT License

## Support

For issues, questions, or suggestions, please open an issue on the repository.

---

Built with ❤️ using React, Node.js, and MongoDB
