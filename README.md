# Move Fit 🏋️‍♀️

Move Fit is a modern fitness application built with React that helps users discover, learn, and perfect their exercise routines. With a comprehensive database of exercises, detailed demonstrations, and a user-friendly interface, it's your perfect companion for fitness journey.


## Features 🌟

- **Exercise Database**: Access a vast collection of exercises with detailed information
- **Smart Search**: Find exercises by name, body part, target muscle, or equipment
- **Visual Demonstrations**: High-quality GIFs showing proper exercise form
- **Categorized Browsing**: Browse exercises by body part with an intuitive interface
- **Detailed Information**: Get comprehensive details about each exercise
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Navigation**: Drag-to-scroll interface for better user experience

## Tech Stack 💻

- React 18
- Material-UI (MUI)
- RapidAPI Exercise Database
- JavaScript ES6+
- CSS3
- HTML5

## Local Development Setup 🚀

1. **Clone the repository**

   ```bash
   git clone https://github.com/sepicn/move-fit.git
   cd move-fit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory
   - Add your RapidAPI key:
     ```
     REACT_APP_RAPID_API_KEY=your_rapidapi_key_here
     ```
   - Get your API key from [RapidAPI Exercise DB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)

4. **Start the development server**
   ```bash
   npm start
   ```
   The application will open in your default browser at `http://localhost:3000`

## Build for Production 🏗️

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Project Structure 📁

```
move-fit/
├── public/
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.js         # Main App component
│   └── index.js       # Entry point
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## Key Components 🔑

- **SearchExercises**: Smart search functionality with body part detection
- **Exercises**: Paginated display of exercise cards
- **HorizontalScrollbar**: Custom scrollable container with drag support
- **ExerciseCard**: Display component for individual exercises
- **ExerciseDetail**: Detailed view of individual exercises

## Acknowledgments 🙏

- Exercise data provided by [ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
- UI components from [Material-UI](https://mui.com/)
- Icons from [Material Icons](https://mui.com/material-ui/material-icons/)
