# Movie Review & Watchlist Platform

A  functional movie review and watchlist web application. Browse movies, write reviews, and build your personal watchlist.

## 🚀 Features

### Landing Page
- **Hero Section** with cinematic design
- **Featured Movies Carousel** - Swipeable movie showcase with ratings
- **Top Rated Movies** - Display highest-rated films
- **How It Works Accordion** - Expandable sections explaining features
- **Responsive Design** - Works on all devices

### Movies Page
- **Movie Gallery** - Browse all movies with posters and ratings
- **Advanced Filtering**:
  - Search by movie title
  - Filter by genre (9 genres)
  - Filter by minimum rating
  - Sort by rating, release year, or title
- **Movie Details Modal** - Click any movie for complete information
- **Average Ratings** - Calculated from all user reviews
- **Review System** - Write and view reviews
- **Watchlist Integration** - Add/remove movies

### Review System
- **Write Reviews** - Rate movies 1-5 stars with comments
- **View All Reviews** - See community feedback
- **Average Rating Display** - Automatically calculated
- **Review Management** - Delete your own reviews
- **Reviewer Names** - Personalized reviews

### Watchlist
- **Personal Watchlist** - Save movies to watch later
- **Organized Display** - Grid layout with movie posters
- **Quick Actions** - Remove or view movie details
- **Added Date** - Track when you added each movie

### UI Components with JavaScript
1. **Carousel** - Touch-enabled, responsive movie slider
2. **Accordion** - Collapsible content sections
3. **Toast Notifications** - Success, error, warning, info messages
4. **Modals** - Movie details and review forms
5. **Rating Input** - Interactive star rating system
6. **Loading Spinners** - While data loads
7. **Empty States** - User-friendly messages

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
│   ├──# Lcreate JS files here
|
├── db.json                   # JSON Server database
└── README.md                 # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Step 1: Install JSON Server

```bash
npm install -g json-server
```

### Step 2: Clone/Download Project

Place all project files in a folder.

### Step 3: Start JSON Server

```bash
json-server --watch db.json --port 3000
```

You should see:
```
Resources
http://localhost:3000/movies
http://localhost:3000/reviews
http://localhost:3000/watchlist
http://localhost:3000/config
```

### Step 4: Open the Website

Open `index.html` in your browser or use Live Server.

### Step 5: Add Sample Movies
Samples are already in the db.json

## 🎯 Usage Guide

### For Students

This project demonstrates:

1. **DOM Manipulation** - Creating, updating, removing elements
2. **Event Handling** - Click, input, form events
3. **Fetch API** - GET, POST, DELETE requests
4. **Async/Await** - Handling asynchronous operations
5. **Array Methods** - filter, map, reduce, sort, find
6. **Object Manipulation** - Complex data structures
7. **Local Storage** - Via JSON Server
8. **Error Handling** - Try-catch blocks
9. **Form Validation** - Input validation
10. **Responsive Design** - Mobile-first approach

### Key Learning Points

- **Rating Calculations**: Aggregate reviews to calculate average ratings
- **Review Management**: Full CRUD operations on reviews
- **Watchlist Functionality**: Add/remove items from personal lists
- **Search & Filtering**: Multiple filter criteria working together
- **Modal Interactions**: Complex modal with dynamic content
- **Form Handling**: Custom rating input with star buttons
- **Data Relationships**: Movies, reviews, and watchlist connected by IDs

## 🔧 Customization

### Adding More Genres

Edit `movies.html` genre filter:

```html
<select id="genreFilter">
    <option value="YourNewGenre">Your New Genre</option>
</select>
```

### Changing Styles

All colors in `css/style.css`:

```css
:root {
    --primary: #DC2626;
    /* Modify colors here */
}
```

### Rating Scale

Currently 1-5 stars. To change, modify:
- `movies.html` - Add/remove star buttons
- `movies.js` - Update rating logic

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### JSON Server not starting
- Check port 3000 is available
- Try different port: `json-server --watch db.json --port 3001`
- Update `API_BASE_URL` in `js/api.js`

### Movies not loading
- Ensure JSON Server is running
- Check browser console for errors
- Verify database has movies

### Reviews not appearing
- Check if movie has reviews
- Verify review submission succeeded
- Check Network tab in DevTools

## 📚 API Endpoints

### Movies
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get single movie
- `POST /movies` - Create movie

### Reviews
- `GET /reviews` - Get all reviews
- `GET /reviews?movieId=:id` - Get reviews for specific movie
- `POST /reviews` - Create review
- `DELETE /reviews/:id` - Delete review

### Watchlist
- `GET /watchlist` - Get watchlist items
- `POST /watchlist` - Add to watchlist
- `DELETE /watchlist/:id` - Remove from watchlist

## 🚧 Future Enhancements

- User authentication
- Movie search with external API (TMDB)
- Advanced filtering (by actor, director)
- Social features (follow users, share lists)
- Movie recommendations
- Watch progress tracking
- Multiple watchlists
- Export watchlist
- Movie trailers integration
- Sorting reviews (most helpful, recent)

## 📄 License

Educational purposes.

## 👥 Contributors

Frontend Development cohort 2025 - Group A 
