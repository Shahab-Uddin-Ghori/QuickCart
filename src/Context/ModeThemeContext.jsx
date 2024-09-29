// import React, { createContext, useEffect, useState } from "react"; // Importing React and necessary hooks
// export const ThemeContext = createContext(); // Creating a new context for theme management

// function ModeThemeContext({ children }) {
//   // Initialize theme state with a function that retrieves the saved theme from localStorage
//   // If no theme is saved, default to 'light'
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme"); // Get saved theme from localStorage
//     return savedTheme ? JSON.parse(savedTheme) : "light"; // Return saved theme or 'light' if none
//   });

//   // Effect to update localStorage whenever the theme changes
//   useEffect(() => {
//     localStorage.setItem("theme", JSON.stringify(theme)); // Save the current theme to localStorage
//   }, [theme]); // Dependency array ensures this runs only when 'theme' changes

//   return (
//     // Providing the theme and setTheme function to the component tree
//     <ThemeContext.Provider value={[theme, setTheme]}>
//       {children} {/* Rendering child components */}
//     </ThemeContext.Provider>
//   );
// }

// export default ModeThemeContext; // Exporting ModeThemeContext for use in other parts of the application
