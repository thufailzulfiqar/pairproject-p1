# pairproject-p1
Thufail &amp; Abigail

# HackFood

A web application for restaurants that allows potential customers to view the menu and contact details, with additional features for customer login and admin management.

## Features

- **Public Menu & Contact:** Anyone can browse the restaurant's menu and contact information without logging in.
- **Customer Cart:** Users must log in to add menu items to their cart.
- **Admin Dashboard:** Admins can create, read, update, and delete (CRUD) menu items through a protected dashboard, secured with authorization middleware.

## Tech Stack

- **Backend:** Express.js
- **Templating:** EJS
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, Bootstrap

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thufailzulfiqar/pairproject-p1.git
   cd pairproject-p1
   ```

2. **Install dependencies:**
   ```bash
   npm i
   ```

3. **Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your environment variables as needed (e.g., database URL, session secret).

4. **Database Setup:**
   - Ensure PostgreSQL is running and accessible.
   - Run any migration scripts provided to set up the database schema.

5. **Start the Application:**
   ```bash
   npm start
   ```

## Usage

- **View Menu & Contact:** Open the web app in your browser. Browse without logging in.
- **Customer Login:** Log in to add items to your cart.
- **Admin Access:** Navigate to the admin dashboard (URL may be `/admin` or as configured). Only admins can CRUD menu items.

## Contributing

Pull requests are welcome! For significant changes, please open an issue first to discuss your ideas.

## License

This project is for educational purposes.

---
**Created by Thufail & Abigail**
