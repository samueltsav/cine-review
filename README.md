# CineReview - Movie Review Platform

> A comprehensive movie review and watchlist platform project for mastering HTML, CSS, and JavaScript fundamentals with real-world API integration.

## 📚 Project Overview

**CineReview** is a fully functional movie review platform where users can browse movies, write reviews, manage their watchlist, and discover highly-rated films. This project will help you master DOM manipulation, API integration, component architecture, and modern JavaScript practices.

## 📋 Requirements

You are required to:

1. **Build this app and style it** as shown in the videos and images provided
2. **Make it functional with JavaScript** and interact with data from a server
3. **Make it fully responsive** to other screen sizes

## 🎯 Learning Objectives

By completing this project, you will strengthen your abilities on:

- ✅ **DOM manipulation** and dynamic content rendering
- ✅ **async operations** with Fetch API and promises
- ✅ **CRUD operations** with a REST API
- ✅ **UI components** (Carousel, Modal, Toast, Accordion)
- ✅ **application state** and data relationships
- ✅ **responsive layouts** with CSS Grid and Flexbox
- ✅ **form validation** and user input
- ✅ **filtering, searching, and sorting** algorithms
- ✅ **rating systems** and review management

---

## 🌟 Features by Page

  ### 🏠 Landing Page (`index.html`)

  #### Visual Features
  - Hero section with animated background and call-to-action
  - Featured movies carousel (auto-play with manual controls)
  - Top rated movies section with rankings
  - "How It Works" accordion (3 steps)
  - Footer with social links and quick navigation

  #### Implementation Checklist
  - [ ] Load and display 5 featured movies in carousel
  - [ ] Implement working carousel with auto-play and pagination dots
  - [ ] Display top 3 rated movies with rankings
  - [ ] Create functional accordion (one section open at a time)
  - [ ] Calculate average ratings from reviews
  - [ ] Add smooth scroll to section links
  - [ ] Handle carousel pause on hover

  ### 🎬 Movies Page (`movies.html`)

  #### Visual Features
  - Search bar for real-time filtering
  - Multiple filter controls (Genre, Min Rating)
  - Sort options (Rating, Year, Title)
  - Movie grid with poster images
  - Movie detail modal with full information
  - Review submission modal with star rating
  - Watchlist add/remove functionality
  - Empty state when no movies found
  - Loading spinner during data fetch
  - Toast notifications for actions

#### API Endpoints Used
- `GET /movies` - Fetch all movies
- `GET /reviews` - Get all reviews
- `GET /reviews?movieId=:id` - Get reviews for specific movie
- `POST /reviews` - Submit new review
- `GET /watchlist` - Get user's watchlist
- `POST /watchlist` - Add movie to watchlist
- `DELETE /watchlist/:id` - Remove from watchlist

#### Implementation Checklist
- [ ] Load and display all movies in grid
- [ ] Implement debounced search (filters as you type)
- [ ] Add genre filter dropdown
- [ ] Add minimum rating filter
- [ ] Implement sorting (highest/lowest rating, year, title)
- [ ] Display average rating for each movie
- [ ] Show movie count matching filters
- [ ] Open movie detail modal on card click
- [ ] Implement star rating input in review form
- [ ] Validate review form (name, rating, comment)
- [ ] Toggle watchlist status with visual feedback
- [ ] Handle empty search results gracefully
- [ ] Add loading states during API calls
- [ ] Show toast notifications for actions

### 📖 Movie Detail Modal

#### Visual Features
- Large poster image
- Movie title and metadata (genre, year, duration)
- Director and cast information
- Full synopsis
- Average rating display
- "Write Review" button
- "Add to Watchlist" toggle button
- Reviews section with all user reviews
- Individual review cards with ratings and timestamps

#### Implementation Checklist
- [ ] Load movie details by ID
- [ ] Display all movie metadata
- [ ] Calculate and show average rating
- [ ] List all reviews for the movie
- [ ] Format review timestamps (e.g., "2 days ago")
- [ ] Open review modal from detail view
- [ ] Toggle watchlist status from modal
- [ ] Close modal on overlay click or ESC key
- [ ] Handle missing movie ID gracefully

### 📝 Review Modal

#### Visual Features
- Movie title display
- Name input field
- Interactive star rating (1-5 stars)
- Comment textarea
- Submit button
- Form validation messages

#### Implementation Checklist
- [ ] Display correct movie title
- [ ] Implement clickable star rating
- [ ] Show hover effects on stars
- [ ] Validate all required fields
- [ ] Generate unique review IDs
- [ ] Add ISO timestamp to reviews
- [ ] Submit review to API
- [ ] Close modal after successful submission
- [ ] Refresh movie details to show new review
- [ ] Show success toast notification

### 🔖 Watchlist Page (`watchlist.html`)

#### Visual Features
- Watchlist header with description
- Grid of watchlisted movies
- Movie cards with "In Watchlist" badge
- "Added [time]" display
- "View Details" button
- "Remove" button per card
- Empty state with illustration
- Loading state during fetch

#### API Endpoints Used
- `GET /watchlist` - Fetch user's watchlist
- `GET /movies` - Get movie details
- `GET /reviews` - Calculate ratings
- `DELETE /watchlist/:id` - Remove item
- `POST /reviews` - Add review from watchlist page

#### Implementation Checklist
- [ ] Load all watchlist items
- [ ] Match watchlist items with movie data
- [ ] Calculate average ratings for each movie
- [ ] Display "Added X days ago" timestamps
- [ ] Open movie detail modal from cards
- [ ] Remove movies from watchlist with confirmation
- [ ] Show empty state when watchlist is empty
- [ ] Handle loading state
- [ ] Navigate to movies page from empty state
- [ ] Update UI after removing items

---

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
--primary: #DC2626;           /* Main red - buttons, accents */
--primary-dark: #B91C1C;      /* Hover states */
--primary-light: #EF4444;     /* Light accents */
```

#### Background Colors
```css
--background: #111827;        /* Page background */
--surface: #1F2937;          /* Card backgrounds */
--surface-light: #374151;    /* Elevated surfaces */
```

#### Text Colors
```css
--text-primary: #F9FAFB;     /* Main text */
--text-secondary: #D1D5DB;   /* Secondary text */
--text-tertiary: #9CA3AF;    /* Subtle text */
```

#### Status Colors
```css
--success: #10B981;          /* Success messages */
--error: #EF4444;            /* Error messages */
--warning: #F59E0B;          /* Warning messages */
--border: #374151;           /* Borders and dividers */
--overlay: rgba(0, 0, 0, 0.7); /* Modal overlays */
```

### Typography
```css
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

## 🛠️ Setup Instructions

### Prerequisites

**Required Knowledge:**
- HTML5
- CSS3
- JavaScript ES6+

**Required Software:**
- Node.js (v14 or higher)
- Code editor (VS Code recommended)
- Modern web browser (Chrome, Firefox, Edge)

### Step-by-Step Setup

#### 1️⃣ Install JSON Server Globally

```bash
npm install -g json-server
```

#### 2️⃣ Navigate to Project Folder

```bash
cd path/to/cinereview
```

#### 3️⃣ Start JSON Server

```bash
json-server --watch db.json --port 3000
```

✅ **Success!** You should see:
```
Resources
http://localhost:3000/movies
http://localhost:3000/reviews
http://localhost:3000/watchlist
```

#### 4️⃣ Open the Project

1. Install [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Site opens at `http://127.0.0.1:5500`


## 📁 Sample Project Structure

```
movie-review-watchlist/
│
├── index.html                 # Landing page
├── movies.html                # Movies browsing page
├── watchlist.html             # Personal watchlist page
│
├── css/
│   ├──# create CSS files here
│
├── js/
│   ├──# create JS files here
|
├── db.json                   # JSON Server database
└── README.md                 # This file
```

---

## 🗄️ Database Structure

### Movies Collection
```json
{
  "id": "1",
  "title": "The Shawshank Redemption",
  "genre": "Drama",
  "year": 1994,
  "duration": 142,
  "director": "Frank Darabont",
  "cast": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  "description": "Two imprisoned men bond over a number of years...",
  "image": "https://m.media-amazon.com/images/..."
}
```

### Reviews Collection
```json
{
  "id": "1",
  "movieId": 1,              // Links to parent movie
  "reviewer": "John Doe",
  "rating": 5,               // 1-5 stars
  "comment": "Absolutely masterful storytelling...",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Watchlist Collection
```json
{
  "id": "1",
  "movieId": 1,              // Links to movie
  "addedAt": "2024-01-20T14:30:00Z"
}
```

**Relationships:**
- Reviews belong to Movies via `movieId`
- Watchlist items reference Movies via `movieId`


## 🧪 Implemetation Checklist

### Landing Page
- [ ] Featured movies carousel loads
- [ ] Carousel auto-plays every 5 seconds
- [ ] Carousel pauses on hover
- [ ] Previous/Next buttons work
- [ ] Pagination dots indicate current slide
- [ ] Clicking dots navigates to that slide
- [ ] Top rated section shows 3 movies
- [ ] Top rated movies sorted by rating
- [ ] Accordion expands/collapses correctly
- [ ] Only one accordion section open at a time
- [ ] All navigation links work
- [ ] "Browse Movies" button navigates correctly

### Movies Page
- [ ] All movies display in grid
- [ ] Average ratings calculated accurately
- [ ] Search filters movies in real-time
- [ ] Genre filter works (all genres)
- [ ] Rating filter works (4+, 3+, 2+)
- [ ] Sorting features work
- [ ] Clear filters resets everything
- [ ] Loading spinner shows during fetch
- [ ] Clicking card opens movie details
- [ ] Average rating matches review average
- [ ] Review timestamps formatted correctly
- [ ] "Write Review" opens review modal
- [ ] Review modal has movie title
- [ ] Star rating hover effect works
- [ ] Form validation prevents empty submit
- [ ] New review appears immediately
- [ ] Success toast shows after review
- [ ] Watchlist button toggles correctly
- [ ] Toast shows "Added to watchlist"
- [ ] Page is responsive on mobile

### Watchlist Page
- [ ] All watchlist items display
- [ ] Empty state shows when empty
- [ ] Movie cards show correct information
- [ ] "Added X days ago" calculates correctly
- [ ] "View Details" opens modal
- [ ] Modal shows full movie information
- [ ] "Remove" button works
- [ ] Card disappears after removal
- [ ] Empty state appears if last item removed
- [ ] Can write review from watchlist modal
- [ ] Page is responsive on mobile

---

## 🚀 Future Features (not required  in the project)

- [ ] User authentication system
- [ ] Personal user profiles
- [ ] Edit/delete own reviews
- [ ] Reply to reviews (nested comments)
- [ ] Like/dislike reviews
- [ ] Report inappropriate reviews
- [ ] Save favorite reviews
- [ ] Movie recommendations based on ratings


## 💡 Implementation Tips

### API Best Practices
```javascript
// Always use try-catch for API calls
async function getMovies() {
  try {
    const res = await fetch('http://localhost:3000/movies');
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
}
```

### Calculating Average Rating
```javascript
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;

  let sum = 0;

  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }

  const average = sum / reviews.length;
  return average.toFixed(1);
}

```

### Debouncing Search
```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Use it
const debouncedSearch = debounce((query) => {
  filterMovies(query);
}, 300);

// Debouncing is a technique that delays a function from running until a certain amount of time has passed since the last time it was called. It used to reduce the frequency of api calls made
```

### Formatting Dates
```javascript
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const days = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return date.toLocaleDateString();
}
```

### Submission Checklist
- [ ] All files organized in correct folders
- [ ] Code is properly formatted and commented
- [ ] No console errors in browser
- [ ] JSON Server runs without errors
- [ ] All features tested and working
- [ ] Responsive on mobile devices


## 📜 License

Educational use only - Tecvision Frontend Cohort 2025

---
