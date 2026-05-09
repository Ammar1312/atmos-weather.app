# Atmos Weather App

Atmos is a cinematic weather dashboard built with semantic HTML, modern CSS, and vanilla JavaScript. It uses the OpenWeather API for live weather data, supports demo mode for portfolio previews, and changes the entire visual atmosphere based on the current weather.

## Features

- City search with current weather data
- Browser geolocation with `Use my location`
- Temperature, feels like, humidity, wind, pressure, visibility, cloud cover, sunrise and sunset
- Next-hours forecast and 5-day forecast
- Celsius and Fahrenheit switching
- Dark and light mode
- Favorite cities and recent searches saved in `localStorage`
- Browser-saved Advanced settings panel for live OpenWeather access
- Demo mode fallback when no API key is available
- Dynamic video backgrounds for clear, cloudy, rainy, stormy, snowy, foggy, and night states
- Smooth double-buffered video transitions
- Lightweight Lottie weather animations across current, hourly, and 5-day forecast cards
- Animated Lottie location globe that locks onto searched coordinates
- Responsive mobile-first layout
- Accessible labels, focus states, semantic sections, loading states, and error handling
- Polished empty states and production-style error feedback

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- OpenWeather API
- LocalStorage
- Static video backgrounds
- Lottie JSON animation

## Project Structure

```text
.
|-- index.html
|-- style.css
|-- script.js
|-- animation/
|   |-- clear-night.json
|   |-- clouds-day.json
|   |-- clouds-night.json
|   |-- fog.json
|   |-- globe.json
|   |-- rainy.json
|   |-- snow.json
|   |-- sunny.json
|   `-- thunderstorm.json
|-- video/
|   |-- clear-day.mp4
|   |-- clear-night.mp4
|   |-- clouds-day.mp4
|   |-- clouds-night.mp4
|   |-- default.mp4
|   |-- fog.mp4
|   |-- rain-day.mp4
|   |-- rain-night.mp4
|   |-- snow.mp4
|   `-- thunderstorm.mp4
`-- screenshots/
```

## Setup

1. Clone or download the project.
2. Open `index.html` with Live Server or any static local server.
3. Open the app, expand `Advanced settings`, paste your OpenWeather API key, and click `Save`.
4. Search for a city.

The app keeps this value only in the current browser through `localStorage`.

## API Key

The public source code intentionally keeps:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

Do not commit a real API key to GitHub. For portfolio sharing, use the in-app Advanced settings panel or let visitors try the built-in demo mode.

## Demo Mode

If no API key is saved, Atmos can still render a polished demo dashboard. This keeps the project presentable on GitHub Pages, Netlify, or when someone opens the app without configuring OpenWeather first.

## Video Backgrounds

Weather videos are loaded only when needed and crossfaded with a double-buffer system. To replace a background, keep the same filename in the `video` folder, for example:

```text
video/clear-day.mp4
```

Recommended video guidelines:

- 1080p is enough
- 8-15 seconds works well
- keep files as small as possible
- avoid text, logos, people, and fast camera movement
- use calm footage with good contrast behind dashboard text

## Animation

Weather animations live in the `animation` folder. The app lazy-loads the Lottie player and only loads the matching JSON for the current OpenWeather condition, then falls back to the standard OpenWeather icon if an animation cannot load. The location globe also uses a lazy-loaded Lottie layer while keeping the coordinate marker as a CSS overlay.

## Deployment

This is a static app, so it can be deployed on:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

For GitHub Pages:

1. Push the project to GitHub.
2. Open repository settings.
3. Go to `Pages`.
4. Deploy from the main branch root.
5. Open the generated GitHub Pages URL.

## Screenshots

Add portfolio screenshots to the `screenshots` folder before publishing the repository. Recommended files:

```text
screenshots/desktop-preview.png
screenshots/mobile-preview.png
```

## Author

Built by Amar.
