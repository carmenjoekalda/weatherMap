# ⛅Temperature Visualization Map
The application provides an interactive world map visualizing real-time global temperature data. Each grid cell represents a geographic region and is color-coded based on temperature values.

# 🔍Features
- Dynamic temperature grid based on latitude and longitude
- Color-coded data visualization
- Clickable grid cells showing temperature and location details
- Global coverage
- Zoomable, responsive, fullscreen map

# 🛠️ Tech Stack
**1. Frontend**

- React
- Leaflet.js
- Carto Basemap

**2. AWS Serverless Backend Architecture**

The backend is completely serverless, built on **AWS** (Amazon Web Services), which automatically refreshes the temperature data in batches every minute. The whole data set is refreshed approximately every 2 hours.
![WeatherMap](https://github.com/user-attachments/assets/1793b62d-1fb7-49fc-8f1c-d3d1b4d90763)


# 🧱Project Structure
```
weatherMap/
│── src/
│   ├── components/          # Reusable components
│   │   └── TemperatureMap/  # Main map and grid logic
│   ├── index.js             # App entry point
│   ├── App.js               # Root component
│── # Other essential files at the root (e.g. package.json, .gitignore) which are required to run and configure the project but typically don’t need editing

```

# 🚀Installation Instructions
1. Clone the repository:
   
   ```
   git clone git@github.com:carmenjoekalda/weatherMap.git
   ```
3. Install dependencies in weatherMap folder:
   ```
   npm install
   ```
3. Start the development
   ```
   npm start
   ```
4. Feel free to change files in the `src` folder
