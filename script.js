const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ICON_URL = "https://openweathermap.org/img/wn";
const DEFAULT_VIDEO = "video/default.mp4?v=1";
const CLEAR_DAY_VIDEO = "video/clear-day.mp4?v=2";
const CLEAR_NIGHT_VIDEO = "video/clear-night.mp4?v=2";
const CLOUDS_DAY_VIDEO = "video/clouds-day.mp4?v=1";
const CLOUDS_NIGHT_VIDEO = "video/clouds-night.mp4?v=1";
const RAIN_DAY_VIDEO = "video/rain-day.mp4?v=3";
const RAIN_NIGHT_VIDEO = "video/rain-night.mp4?v=3";
const THUNDERSTORM_VIDEO = "video/thunderstorm.mp4?v=1";
const SNOW_VIDEO = "video/snow.mp4?v=1";
const FOG_VIDEO = "video/fog.mp4?v=1";
const LOTTIE_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";
const GLOBE_ANIMATION_PATH = "animation/globe.json";
const WEATHER_ANIMATION_PATHS = {
  clearDay: "animation/sunny.json",
  clearNight: "animation/clear-night.json",
  cloudsDay: "animation/clouds-day.json",
  cloudsNight: "animation/clouds-night.json",
  rain: "animation/rainy.json",
  thunderstorm: "animation/thunderstorm.json",
  snow: "animation/snow.json",
  fog: "animation/fog.json",
};

const WEATHER_VIDEO_SOURCES = {
  idle: DEFAULT_VIDEO,
  "clear-day": CLEAR_DAY_VIDEO,
  "clear-night": CLEAR_NIGHT_VIDEO,
  clear: DEFAULT_VIDEO,
  "clouds-day": CLOUDS_DAY_VIDEO,
  "clouds-night": CLOUDS_NIGHT_VIDEO,
  clouds: DEFAULT_VIDEO,
  "rain-day": RAIN_DAY_VIDEO,
  "rain-night": RAIN_NIGHT_VIDEO,
  rain: RAIN_DAY_VIDEO,
  thunderstorm: THUNDERSTORM_VIDEO,
  snow: SNOW_VIDEO,
  fog: FOG_VIDEO,
  night: CLEAR_NIGHT_VIDEO,
};

const STORAGE_KEYS = {
  apiKey: "atmos:api-key",
  lastCity: "atmos:last-city",
  unit: "atmos:unit",
  theme: "atmos:theme",
  recentCities: "atmos:recent-cities",
  favoriteCities: "atmos:favorite-cities",
};

const DEMO_LOCATION = {
  name: "Sarajevo",
  country: "BA",
  latitude: 43.8563,
  longitude: 18.4131,
  timezone: 7200,
};

const DEMO_FORECAST_PATTERN = [
  { temp: 21, description: "few clouds", main: "Clouds", id: 801, icon: "02", pop: 0.08, clouds: 24 },
  { temp: 23, description: "scattered clouds", main: "Clouds", id: 802, icon: "03", pop: 0.12, clouds: 38 },
  { temp: 20, description: "light rain", main: "Rain", id: 500, icon: "10", pop: 0.42, clouds: 66 },
  { temp: 18, description: "broken clouds", main: "Clouds", id: 803, icon: "04", pop: 0.22, clouds: 72 },
  { temp: 22, description: "clear sky", main: "Clear", id: 800, icon: "01", pop: 0.04, clouds: 8 },
  { temp: 25, description: "clear sky", main: "Clear", id: 800, icon: "01", pop: 0.02, clouds: 6 },
  { temp: 24, description: "few clouds", main: "Clouds", id: 801, icon: "02", pop: 0.1, clouds: 20 },
  { temp: 19, description: "moderate rain", main: "Rain", id: 501, icon: "10", pop: 0.58, clouds: 84 },
  { temp: 17, description: "mist", main: "Mist", id: 701, icon: "50", pop: 0.16, clouds: 62 },
  { temp: 21, description: "scattered clouds", main: "Clouds", id: 802, icon: "03", pop: 0.12, clouds: 42 },
  { temp: 24, description: "clear sky", main: "Clear", id: 800, icon: "01", pop: 0.03, clouds: 10 },
  { temp: 22, description: "few clouds", main: "Clouds", id: 801, icon: "02", pop: 0.06, clouds: 28 },
  { temp: 18, description: "light rain", main: "Rain", id: 500, icon: "10", pop: 0.46, clouds: 74 },
  { temp: 16, description: "broken clouds", main: "Clouds", id: 803, icon: "04", pop: 0.2, clouds: 70 },
  { temp: 20, description: "clear sky", main: "Clear", id: 800, icon: "01", pop: 0.04, clouds: 12 },
  { temp: 23, description: "few clouds", main: "Clouds", id: 801, icon: "02", pop: 0.07, clouds: 24 },
  { temp: 22, description: "scattered clouds", main: "Clouds", id: 802, icon: "03", pop: 0.13, clouds: 40 },
  { temp: 19, description: "light rain", main: "Rain", id: 500, icon: "10", pop: 0.34, clouds: 68 },
  { temp: 17, description: "mist", main: "Mist", id: 701, icon: "50", pop: 0.18, clouds: 58 },
  { temp: 21, description: "clear sky", main: "Clear", id: 800, icon: "01", pop: 0.03, clouds: 9 },
];

const WEATHER_THEME_CLASSES = [
  "weather-idle",
  "weather-clear",
  "weather-clouds",
  "weather-rain",
  "weather-thunderstorm",
  "weather-snow",
  "weather-fog",
  "weather-night",
];

const elements = {
  body: document.body,
  main: document.querySelector("main"),
  weatherVideo: document.querySelector("#weatherVideo"),
  weatherVideoBuffer: document.querySelector("#weatherVideoBuffer"),
  searchForm: document.querySelector("#searchForm"),
  cityInput: document.querySelector("#cityInput"),
  searchButton: document.querySelector("#searchButton"),
  locationButton: document.querySelector("#locationButton"),
  demoButton: document.querySelector("#demoButton"),
  apiKeyForm: document.querySelector("#apiKeyForm"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  apiKeyState: document.querySelector("#apiKeyState"),
  clearApiKeyButton: document.querySelector("#clearApiKeyButton"),
  themeToggle: document.querySelector("#themeToggle"),
  themeIcon: document.querySelector("#themeIcon"),
  unitButtons: document.querySelectorAll(".unit-button"),
  status: document.querySelector("#weatherStatus"),
  emptyState: document.querySelector("#emptyState"),
  loadingState: document.querySelector("#loadingState"),
  loadingMessage: document.querySelector("#loadingMessage"),
  dashboard: document.querySelector("#weatherDashboard"),
  sourceBadge: document.querySelector("#sourceBadge"),
  timezoneBadge: document.querySelector("#timezoneBadge"),
  locationName: document.querySelector("#locationName"),
  locationGlobe: document.querySelector("#locationGlobe"),
  locationGlobeAnimation: document.querySelector("#locationGlobeAnimation"),
  locationMarker: document.querySelector("#locationMarker"),
  globeLabel: document.querySelector("#globeLabel"),
  railLocation: document.querySelector("#railLocation"),
  favoriteButton: document.querySelector("#favoriteButton"),
  favoriteIcon: document.querySelector("#favoriteIcon"),
  favoriteList: document.querySelector("#favoriteList"),
  weatherDescription: document.querySelector("#weatherDescription"),
  weatherLottie: document.querySelector("#weatherLottie"),
  weatherIcon: document.querySelector("#weatherIcon"),
  currentTemp: document.querySelector("#currentTemp"),
  currentUnit: document.querySelector("#currentUnit"),
  currentSummary: document.querySelector("#currentSummary"),
  dayHighLow: document.querySelector("#dayHighLow"),
  lastUpdated: document.querySelector("#lastUpdated"),
  feelsLike: document.querySelector("#feelsLike"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#windSpeed"),
  pressure: document.querySelector("#pressure"),
  visibility: document.querySelector("#visibility"),
  sunTimes: document.querySelector("#sunTimes"),
  cloudCover: document.querySelector("#cloudCover"),
  rainChance: document.querySelector("#rainChance"),
  recentList: document.querySelector("#recentList"),
  forecastCurvePath: document.querySelector("#forecastCurvePath"),
  forecastCurvePoints: document.querySelector("#forecastCurvePoints"),
  hourlyList: document.querySelector("#hourlyList"),
  forecastList: document.querySelector("#forecastList"),
};

let units = readStorage(STORAGE_KEYS.unit, "metric");
let currentQuery = null;
let currentFavoriteCity = null;
let requestSequence = 0;
let activeController = null;
let activeWeatherVideo = null;
let videoSwapSequence = 0;
let weatherAnimationSequence = 0;
let weatherLottieAnimation = null;
let activeWeatherAnimationPath = "";
let lottieLoaderPromise = null;
let globeLottieAnimation = null;
let globeAnimationPromise = null;
let cardAnimationSequence = 0;
let cardWeatherAnimations = [];

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  const savedTheme = readStorage(STORAGE_KEYS.theme);
  const prefersLight =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  const preferredTheme = prefersLight ? "light" : "dark";
  const lastCity = readStorage(STORAGE_KEYS.lastCity);

  setTheme(savedTheme || preferredTheme);
  setUnit(units, false);
  updateApiKeyControls();
  initializeWeatherVideo();
  bindEvents();
  showEmptyState();
  renderRecentCities();
  renderFavoriteCities();

  if (lastCity && hasApiKey()) {
    elements.cityInput.value = lastCity;
    loadWeatherByCity(lastCity);
  }
}

function bindEvents() {
  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = normalizeCity(elements.cityInput.value);

    if (city.length < 2) {
      showError("Enter at least two characters for the city name.");
      return;
    }

    if (!hasApiKey()) {
      loadDemoWeather(city);
      showSuccess("Demo forecast active. Live data is ready in Advanced settings.");
      return;
    }

    loadWeatherByCity(city);
  });

  elements.cityInput.addEventListener("input", () => {
    if (elements.status.classList.contains("is-error")) {
      clearStatus();
    }
  });

  elements.locationButton.addEventListener("click", useCurrentLocation);
  elements.demoButton?.addEventListener("click", () => {
    const city = normalizeCity(elements.cityInput.value) || DEMO_LOCATION.name;
    loadDemoWeather(city);
    showSuccess("Demo forecast active. Live data is ready in Advanced settings.");
  });
  elements.apiKeyForm?.addEventListener("submit", saveApiKey);
  elements.clearApiKeyButton?.addEventListener("click", clearSavedApiKey);
  elements.favoriteButton?.addEventListener("click", toggleCurrentFavorite);

  document.querySelectorAll("[data-scroll-target]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      scrollToSection(trigger.dataset.scrollTarget);
    });
  });

  elements.themeToggle.addEventListener("click", () => {
    const nextTheme = elements.body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  elements.unitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setUnit(button.dataset.unit, true);
    });
  });

  window.addEventListener("offline", () => {
    showError("You appear to be offline. Weather data needs a network connection.");
  });
}

async function loadWeatherByCity(city) {
  return loadWeather({
    query: { type: "city", city },
    params: { q: city },
    loadingMessage: `Loading weather for ${city}...`,
  });
}

async function loadWeatherByCoords(latitude, longitude) {
  return loadWeather({
    query: { type: "coords", latitude, longitude },
    params: { lat: latitude, lon: longitude },
    loadingMessage: "Loading weather for your location...",
  });
}

async function loadWeather({ query, params, loadingMessage }) {
  const requestId = createRequestId();
  setLoading(true, loadingMessage);

  try {
    const [currentWeather, forecast] = await Promise.all([
      fetchOpenWeather("weather", params, activeController.signal),
      fetchOpenWeather("forecast", params, activeController.signal),
    ]);

    if (!isLatestRequest(requestId)) return;

    validateWeatherPayload(currentWeather, forecast);
    currentQuery = getReloadQuery(query, currentWeather);
    writeStorage(STORAGE_KEYS.lastCity, currentWeather.name);
    elements.cityInput.value = currentWeather.name;
    renderWeather(currentWeather, forecast);
    showSuccess(`Showing weather for ${formatLocation(currentWeather)}.`);
  } catch (error) {
    if (error.name === "AbortError" || !isLatestRequest(requestId)) return;

    if (shouldUseDemoFallback(error)) {
      const demoCity = query.type === "city" ? query.city : DEMO_LOCATION.name;
      loadDemoWeather(demoCity);
      showError(`${getFriendlyError(error)} Showing demo data instead.`);
      return;
    }

    if (elements.dashboard.hidden) {
      showEmptyState({ clearMessage: false });
    }

    showError(getFriendlyError(error));
  } finally {
    if (isLatestRequest(requestId)) {
      setLoading(false);
    }
  }
}

async function fetchOpenWeather(endpoint, params, signal) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw createAppError("missing-key", "Missing OpenWeather API key.");
  }

  if (navigator.onLine === false) {
    throw createAppError("offline", "Browser is offline.");
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", units);
  url.searchParams.set("lang", "en");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  let response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw createAppError("network", "Network request failed.");
  }

  const payload = await parseJson(response);

  if (!response.ok) {
    throw createAppError("api", payload?.message || "Weather request failed.", response.status);
  }

  return payload;
}

function loadDemoWeather(city = DEMO_LOCATION.name) {
  createRequestId();

  const demoCity = normalizeCity(city) || DEMO_LOCATION.name;
  const { currentWeather, forecast } = buildDemoWeatherPayload(demoCity);

  currentQuery = { type: "demo", city: demoCity };
  elements.cityInput.value = demoCity;
  setLoading(false);
  renderWeather(currentWeather, forecast, { isDemo: true });
}

function buildDemoWeatherPayload(cityName) {
  const hash = hashString(cityName);
  const now = Math.floor(Date.now() / 1000);
  const location = getDemoLocation(cityName, hash);
  const tempShift = ((hash % 70) - 35) / 10;
  const currentPattern = DEMO_FORECAST_PATTERN[hash % DEMO_FORECAST_PATTERN.length];
  const currentTemp = currentPattern.temp + tempShift;
  const localMidnight = getLocalMidnightUtc(now, location.timezone);

  const currentWeather = {
    name: cityName,
    timezone: location.timezone,
    dt: now,
    coord: {
      lat: location.latitude,
      lon: location.longitude,
    },
    sys: {
      country: location.country,
      sunrise: localMidnight + 6 * 3600,
      sunset: localMidnight + 19 * 3600,
    },
    weather: [
      {
        id: currentPattern.id,
        main: currentPattern.main,
        description: currentPattern.description,
        icon: getDemoIconCode(currentPattern, now, location.timezone),
      },
    ],
    main: {
      temp: convertDemoTemperature(currentTemp),
      feels_like: convertDemoTemperature(currentTemp - 1),
      temp_min: convertDemoTemperature(currentTemp - 3),
      temp_max: convertDemoTemperature(currentTemp + 4),
      pressure: 1016 + (hash % 9),
      humidity: getDemoHumidity(currentPattern),
    },
    wind: {
      speed: convertDemoWind(2.4 + (hash % 20) / 10),
    },
    visibility: currentPattern.main === "Mist" ? 6200 : 10000,
    clouds: {
      all: currentPattern.clouds,
    },
  };

  const forecast = {
    city: {
      name: cityName,
      country: location.country,
      timezone: location.timezone,
      coord: {
        lat: location.latitude,
        lon: location.longitude,
      },
    },
    list: Array.from({ length: 40 }, (_, index) => {
      const pattern = DEMO_FORECAST_PATTERN[index % DEMO_FORECAST_PATTERN.length];
      const timestamp = now + (index + 1) * 3 * 3600;
      const temp =
        pattern.temp + tempShift + Math.sin(index / 2) * 1.6 + Math.floor(index / 8) * 0.3;

      return {
        dt: timestamp,
        pop: pattern.pop,
        visibility: pattern.main === "Mist" ? 5600 : 10000,
        clouds: {
          all: pattern.clouds,
        },
        wind: {
          speed: convertDemoWind(2.1 + ((hash + index) % 18) / 10),
        },
        main: {
          temp: convertDemoTemperature(temp),
          feels_like: convertDemoTemperature(temp - 0.8),
          temp_min: convertDemoTemperature(temp - 2.5),
          temp_max: convertDemoTemperature(temp + 2.5),
          pressure: 1013 + ((hash + index) % 11),
          humidity: getDemoHumidity(pattern),
        },
        weather: [
          {
            id: pattern.id,
            main: pattern.main,
            description: pattern.description,
            icon: getDemoIconCode(pattern, timestamp, location.timezone),
          },
        ],
      };
    }),
  };

  return { currentWeather, forecast };
}

function getDemoLocation(cityName, hash) {
  if (cityName.toLowerCase() === DEMO_LOCATION.name.toLowerCase()) {
    return DEMO_LOCATION;
  }

  const rawLongitude = (((hash * 7) % 32000) / 100) - 160;

  return {
    name: cityName,
    country: "",
    latitude: clampNumber(((hash % 12000) / 100) - 60, -60, 70),
    longitude: clampNumber(rawLongitude, -170, 170),
    timezone: clampNumber(Math.round(rawLongitude / 15) * 3600, -43200, 50400),
  };
}

function getDemoHumidity(pattern) {
  if (pattern.main === "Rain") return 78;
  if (pattern.main === "Mist") return 84;
  if (pattern.main === "Clear") return 48;
  return 58;
}

function getDemoIconCode(pattern, timestamp, timezoneOffset) {
  const localHour = getLocalHour(timestamp, timezoneOffset);
  const suffix = localHour >= 6 && localHour < 20 ? "d" : "n";
  return `${pattern.icon}${suffix}`;
}

function getLocalHour(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.getUTCHours();
}

function getLocalMidnightUtc(timestamp, timezoneOffset) {
  const secondsIntoLocalDay = positiveModulo(timestamp + timezoneOffset, 86400);
  return timestamp - secondsIntoLocalDay;
}

function convertDemoTemperature(celsiusValue) {
  return units === "imperial" ? (celsiusValue * 9) / 5 + 32 : celsiusValue;
}

function convertDemoWind(metersPerSecond) {
  return units === "imperial" ? metersPerSecond * 2.236936 : metersPerSecond;
}

function hashString(value) {
  return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 2166136261);
}

function positiveModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function useCurrentLocation() {
  if (!hasApiKey()) {
    loadDemoWeather(DEMO_LOCATION.name);
    showError("Live weather access is not configured. Showing demo data instead.");
    return;
  }

  if (!navigator.geolocation) {
    showError("Geolocation is not available in this browser.");
    return;
  }

  setLoading(true, "Waiting for location permission...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      loadWeatherByCoords(latitude, longitude);
    },
    (error) => {
      setLoading(false);
      if (elements.dashboard.hidden) {
        showEmptyState({ clearMessage: false });
      }
      showError(getGeolocationMessage(error));
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    }
  );
}

function renderWeather(currentWeather, forecast, { isDemo = false } = {}) {
  const mainCondition = currentWeather.weather?.[0] || {};
  const timezoneOffset = forecast.city?.timezone ?? currentWeather.timezone ?? 0;
  const description = mainCondition.description || "Weather data";
  const nextForecast = forecast.list?.[0] || null;
  const dailyForecast = buildDailyForecast(forecast.list, timezoneOffset);
  const hourlyForecast = buildHourlyForecast(forecast.list, timezoneOffset);
  currentFavoriteCity = buildStoredCity(currentWeather, description, mainCondition.icon);

  updateWeatherTheme(mainCondition.main, mainCondition.icon, mainCondition.id);
  elements.body.classList.toggle("is-demo-mode", isDemo);
  elements.emptyState.hidden = true;
  elements.loadingState.hidden = true;
  elements.dashboard.hidden = false;
  animateDashboardUpdate();

  elements.sourceBadge.textContent = isDemo
    ? `Demo data ${formatTime(currentWeather.dt, timezoneOffset)}`
    : `OpenWeather update ${formatTime(currentWeather.dt, timezoneOffset)}`;
  elements.timezoneBadge.textContent = `Local timezone ${formatTimezone(timezoneOffset)}`;
  elements.locationName.textContent = formatLocation(currentWeather);
  updateLocationGlobe(currentWeather);
  elements.weatherDescription.textContent = toTitleCase(description);
  elements.currentTemp.textContent = Math.round(currentWeather.main.temp);
  elements.currentUnit.textContent = getUnitSymbol();
  elements.currentSummary.textContent = buildCurrentSummary(
    currentWeather,
    nextForecast,
    description
  );
  elements.dayHighLow.textContent = `${formatTemperature(
    currentWeather.main.temp_max
  )} / ${formatTemperature(currentWeather.main.temp_min)}`;
  elements.lastUpdated.textContent = formatTime(currentWeather.dt, timezoneOffset);
  elements.feelsLike.textContent = formatTemperature(currentWeather.main.feels_like);
  elements.humidity.textContent = `${currentWeather.main.humidity}%`;
  elements.windSpeed.textContent = formatWind(currentWeather.wind?.speed);
  elements.pressure.textContent = `${currentWeather.main.pressure} hPa`;
  elements.visibility.textContent = formatVisibility(currentWeather.visibility);
  elements.sunTimes.textContent = `${formatTime(
    currentWeather.sys.sunrise,
    timezoneOffset
  )} / ${formatTime(currentWeather.sys.sunset, timezoneOffset)}`;
  elements.cloudCover.textContent = formatPercentFromWhole(currentWeather.clouds?.all);
  elements.rainChance.textContent = nextForecast ? formatProbability(nextForecast.pop) : "0%";

  updatePrimaryWeatherVisual(mainCondition, description);
  resetCardWeatherAnimations();

  renderHourlyForecast(hourlyForecast);
  renderDailyForecast(dailyForecast);
  renderForecastCurve(dailyForecast);
  updateFavoriteButton();
  renderFavoriteCities();

  if (!isDemo) {
    saveRecentCity(currentWeather, description, mainCondition.icon);
    renderRecentCities();
  }
}

function buildHourlyForecast(list, timezoneOffset) {
  return list.slice(0, 10).map((item) => ({
    time: formatTime(item.dt, timezoneOffset),
    temp: formatTemperature(item.main.temp),
    description: item.weather?.[0]?.description || "Forecast",
    main: item.weather?.[0]?.main || "",
    id: item.weather?.[0]?.id ?? null,
    icon: item.weather?.[0]?.icon,
    pop: formatProbability(item.pop),
    wind: formatWind(item.wind?.speed),
  }));
}

function buildDailyForecast(list, timezoneOffset) {
  const groupedDays = new Map();

  list.forEach((item) => {
    const key = getLocalDateKey(item.dt, timezoneOffset);
    const values = groupedDays.get(key) || [];
    values.push(item);
    groupedDays.set(key, values);
  });

  return Array.from(groupedDays.entries())
    .slice(0, 5)
    .map(([dateKey, items]) => {
      const representative = getMiddayForecast(items, timezoneOffset);
      const temperatures = items.map((item) => item.main.temp);
      const highRaw = Math.max(...temperatures);
      const lowRaw = Math.min(...temperatures);
      const description = representative.weather?.[0]?.description || "Forecast";
      const highestPop = Math.max(...items.map((item) => item.pop || 0));

      return {
        key: dateKey,
        day: formatDay(representative.dt, timezoneOffset),
        high: formatTemperature(highRaw),
        low: formatTemperature(lowRaw),
        highRaw,
        lowRaw,
        description,
        main: representative.weather?.[0]?.main || "",
        id: representative.weather?.[0]?.id ?? null,
        icon: representative.weather?.[0]?.icon,
        pop: formatProbability(highestPop),
      };
    });
}

function getMiddayForecast(items, timezoneOffset) {
  return items.reduce((closest, item) => {
    const currentDistance = Math.abs(getLocalHour(item.dt, timezoneOffset) - 12);
    const closestDistance = Math.abs(getLocalHour(closest.dt, timezoneOffset) - 12);
    return currentDistance < closestDistance ? item : closest;
  }, items[0]);
}

function renderHourlyForecast(items) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "hour-card";

    const time = document.createElement("time");
    time.textContent = item.time;

    const icon = createWeatherIcon(item.icon, item.description, item, {
      animated: true,
    });

    const temp = document.createElement("strong");
    temp.textContent = item.temp;

    const description = document.createElement("span");
    description.textContent = toTitleCase(item.description);

    const pop = document.createElement("span");
    pop.className = "hour-pop";
    pop.textContent = `${item.pop} precip`;

    const wind = document.createElement("span");
    wind.textContent = item.wind;

    card.append(time, icon, temp, description, pop, wind);
    fragment.append(card);
  });

  elements.hourlyList.replaceChildren(fragment);
}

function renderDailyForecast(items) {
  const fragment = document.createDocumentFragment();
  const lowestTemp = Math.min(...items.map((item) => item.lowRaw));
  const highestTemp = Math.max(...items.map((item) => item.highRaw));

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "forecast-card";

    const dayWrapper = document.createElement("div");
    dayWrapper.className = "forecast-copy";

    const day = document.createElement("time");
    day.dateTime = item.key;
    day.textContent = item.day;

    const description = document.createElement("span");
    description.textContent = toTitleCase(item.description);

    const pop = document.createElement("span");
    pop.className = "forecast-pop";
    pop.textContent = `${item.pop} precip`;

    dayWrapper.append(day, description, pop);

    const icon = createWeatherIcon(item.icon, item.description, item, {
      animated: true,
    });

    const tempWrapper = document.createElement("div");
    tempWrapper.className = "forecast-temp";

    const high = document.createElement("strong");
    high.textContent = item.high;

    const low = document.createElement("span");
    low.textContent = item.low;

    const rangeTrack = document.createElement("span");
    rangeTrack.className = "range-track";
    const range = normalizeTemperatureRange(
      item.lowRaw,
      item.highRaw,
      lowestTemp,
      highestTemp
    );
    rangeTrack.style.setProperty("--range-start", `${range.start}%`);
    rangeTrack.style.setProperty("--range-end", `${range.end}%`);

    tempWrapper.append(high, low, rangeTrack);
    card.append(dayWrapper, icon, tempWrapper);
    fragment.append(card);
  });

  elements.forecastList.replaceChildren(fragment);
}

function renderForecastCurve(items) {
  if (!elements.forecastCurvePath || !elements.forecastCurvePoints || items.length < 2) {
    return;
  }

  const temperatures = items.map((item) => (item.highRaw + item.lowRaw) / 2);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);
  const spread = Math.max(max - min, 1);
  const points = temperatures.map((temp, index) => {
    const x = 4 + (index * 92) / Math.max(items.length - 1, 1);
    const y = 28 - ((temp - min) / spread) * 20;
    return { x, y };
  });

  const [first, ...rest] = points;
  const path = rest.reduce((pathValue, point, index) => {
    const previous = points[index];
    const controlX = (previous.x + point.x) / 2;
    return `${pathValue} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, `M ${first.x} ${first.y}`);

  const pointNodes = document.createDocumentFragment();
  points.forEach((point, index) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", index === Math.floor(points.length / 2) ? "1.8" : "1.1");
    circle.classList.add(index === Math.floor(points.length / 2) ? "is-active" : "is-muted");
    pointNodes.append(circle);
  });

  elements.forecastCurvePath.setAttribute("d", path);
  elements.forecastCurvePoints.replaceChildren(pointNodes);
}

function buildStoredCity(currentWeather, description, iconCode) {
  return {
    name: currentWeather.name,
    country: currentWeather.sys?.country || "",
    description,
    icon: iconCode || "",
    tempCelsius: toCelsius(currentWeather.main.temp),
    latitude: currentWeather.coord?.lat ?? null,
    longitude: currentWeather.coord?.lon ?? null,
    savedAt: Date.now(),
  };
}

function toggleCurrentFavorite() {
  if (!currentFavoriteCity) return;

  const favorites = readFavoriteCities();
  const currentKey = getCityKey(currentFavoriteCity);
  const isSaved = favorites.some((city) => getCityKey(city) === currentKey);

  if (isSaved) {
    writeJsonStorage(
      STORAGE_KEYS.favoriteCities,
      favorites.filter((city) => getCityKey(city) !== currentKey)
    );
    showSuccess(`${formatRecentLocation(currentFavoriteCity)} removed from favorites.`);
  } else {
    writeJsonStorage(STORAGE_KEYS.favoriteCities, [
      { ...currentFavoriteCity, savedAt: Date.now() },
      ...favorites,
    ].slice(0, 8));
    showSuccess(`${formatRecentLocation(currentFavoriteCity)} saved to favorites.`);
  }

  updateFavoriteButton();
  renderFavoriteCities();
}

function renderFavoriteCities() {
  if (!elements.favoriteList) return;

  const favorites = readFavoriteCities();

  if (favorites.length === 0) {
    const empty = createListEmptyState(
      "\u2606",
      "No favorites yet",
      "Save a city from the current weather card."
    );
    elements.favoriteList.replaceChildren(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  favorites.slice(0, 4).forEach((city) => {
    const card = document.createElement("div");
    card.className = "favorite-card";

    const loadButton = document.createElement("button");
    loadButton.className = "favorite-load";
    loadButton.type = "button";
    loadButton.setAttribute("aria-label", `Load weather for ${formatRecentLocation(city)}`);
    loadButton.addEventListener("click", () => {
      loadFavoriteCity(city);
    });

    const icon = createWeatherIcon(city.icon, city.description || "Weather");

    const copy = document.createElement("span");
    copy.className = "recent-copy";

    const location = document.createElement("strong");
    location.textContent = formatRecentLocation(city);

    const description = document.createElement("span");
    description.textContent = toTitleCase(city.description || "Weather");

    const temperature = document.createElement("b");
    temperature.textContent = formatStoredTemperature(city.tempCelsius);

    const removeButton = document.createElement("button");
    removeButton.className = "favorite-remove";
    removeButton.type = "button";
    removeButton.textContent = "\u00d7";
    removeButton.setAttribute("aria-label", `Remove ${formatRecentLocation(city)} from favorites`);
    removeButton.addEventListener("click", () => {
      removeFavoriteCity(city);
    });

    copy.append(location, description);
    loadButton.append(icon, copy, temperature);
    card.append(loadButton, removeButton);
    fragment.append(card);
  });

  elements.favoriteList.replaceChildren(fragment);
}

function removeFavoriteCity(city) {
  const targetKey = getCityKey(city);
  const favorites = readFavoriteCities().filter((item) => getCityKey(item) !== targetKey);

  writeJsonStorage(STORAGE_KEYS.favoriteCities, favorites);
  showSuccess(`${formatRecentLocation(city)} removed from favorites.`);
  updateFavoriteButton();
  renderFavoriteCities();
}

function loadFavoriteCity(city) {
  const query = city.country ? `${city.name}, ${city.country}` : city.name;

  if (hasApiKey()) {
    loadWeatherByCity(query);
  } else {
    loadDemoWeather(city.name);
    showSuccess("Demo forecast active. Live data is ready in Advanced settings.");
  }
}

function updateFavoriteButton() {
  if (!elements.favoriteButton) return;

  const isReady = Boolean(currentFavoriteCity);
  const isSaved = isReady && readFavoriteCities().some(
    (city) => getCityKey(city) === getCityKey(currentFavoriteCity)
  );

  elements.favoriteButton.disabled = !isReady;
  elements.favoriteButton.classList.toggle("is-saved", Boolean(isSaved));
  elements.favoriteButton.setAttribute("aria-pressed", String(Boolean(isSaved)));
  elements.favoriteButton.setAttribute(
    "aria-label",
    isSaved
      ? `Remove ${formatRecentLocation(currentFavoriteCity)} from favorites`
      : isReady
      ? `Save ${formatRecentLocation(currentFavoriteCity)} to favorites`
      : "Save current city to favorites"
  );

  if (elements.favoriteIcon) {
    elements.favoriteIcon.textContent = isSaved ? "\u2605" : "\u2606";
  }
}

function getCityKey(city) {
  return `${city.name || ""}|${city.country || ""}`.toLowerCase();
}

function saveRecentCity(currentWeather, description, iconCode) {
  const recentCities = readRecentCities();
  const city = buildStoredCity(currentWeather, description, iconCode);
  const withoutDuplicate = recentCities.filter(
    (item) => getCityKey(item) !== getCityKey(city)
  );

  writeJsonStorage(STORAGE_KEYS.recentCities, [city, ...withoutDuplicate].slice(0, 5));
}

function renderRecentCities() {
  if (!elements.recentList) return;

  const recentCities = readRecentCities();

  if (recentCities.length === 0) {
    const empty = createListEmptyState(
      "\u2315",
      "No recent searches",
      "Search for your first city to build local history."
    );
    elements.recentList.replaceChildren(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  recentCities.slice(0, 3).forEach((city) => {
    const button = document.createElement("button");
    button.className = "recent-card";
    button.type = "button";
    button.setAttribute("aria-label", `Load weather for ${formatRecentLocation(city)}`);
    button.addEventListener("click", () => {
      loadWeatherByCity(city.name);
    });

    const icon = createWeatherIcon(city.icon, city.description || "Weather");

    const copy = document.createElement("span");
    copy.className = "recent-copy";

    const location = document.createElement("strong");
    location.textContent = formatRecentLocation(city);

    const description = document.createElement("span");
    description.textContent = toTitleCase(city.description || "Weather");

    const temperature = document.createElement("b");
    temperature.textContent = formatStoredTemperature(city.tempCelsius);

    copy.append(location, description);
    button.append(icon, copy, temperature);
    fragment.append(button);
  });

  elements.recentList.replaceChildren(fragment);
}

function createListEmptyState(icon, title, message) {
  const empty = document.createElement("div");
  empty.className = "recent-empty";

  const iconElement = document.createElement("span");
  iconElement.className = "recent-empty-icon";
  iconElement.setAttribute("aria-hidden", "true");
  iconElement.textContent = icon;

  const copy = document.createElement("span");
  copy.className = "recent-empty-copy";

  const titleElement = document.createElement("strong");
  titleElement.textContent = title;

  const messageElement = document.createElement("span");
  messageElement.textContent = message;

  copy.append(titleElement, messageElement);
  empty.append(iconElement, copy);

  return empty;
}

function animateDashboardUpdate() {
  elements.dashboard.classList.remove("is-entering");
  const frame =
    typeof window.requestAnimationFrame === "function"
      ? window.requestAnimationFrame.bind(window)
      : setTimeout;
  frame(() => {
    elements.dashboard.classList.add("is-entering");
  });
}

function updatePrimaryWeatherVisual(condition, description) {
  const label = `${toTitleCase(description)} weather icon`;
  const animationPath = getWeatherAnimationPath(condition);
  const animationId = weatherAnimationSequence + 1;
  weatherAnimationSequence = animationId;

  showStaticWeatherIcon(condition.icon, label);

  if (!animationPath || !elements.weatherLottie || prefersReducedMotion()) {
    return;
  }

  loadWeatherAnimation(animationId, label, condition.icon, animationPath);
}

function showStaticWeatherIcon(iconCode, label) {
  hideWeatherLottie();

  if (!elements.weatherIcon) return;

  if (iconCode) {
    elements.weatherIcon.hidden = false;
    elements.weatherIcon.src = `${ICON_URL}/${iconCode}@2x.png`;
    elements.weatherIcon.alt = label;
  } else {
    elements.weatherIcon.hidden = true;
  }
}

async function loadWeatherAnimation(animationId, label, fallbackIconCode, animationPath) {
  try {
    await ensureLottieReady();

    if (animationId !== weatherAnimationSequence) return;

    await showWeatherLottie(label, animationPath, animationId);
  } catch {
    if (animationId === weatherAnimationSequence) {
      showStaticWeatherIcon(fallbackIconCode, label);
    }
  }
}

function showWeatherLottie(label, animationPath, animationId) {
  if (!elements.weatherLottie || !window.lottie) {
    return Promise.reject(new Error("Lottie is unavailable."));
  }

  return new Promise((resolve, reject) => {
    const revealAnimation = () => {
      if (animationId !== weatherAnimationSequence) {
        reject(new Error("Stale weather animation."));
        return;
      }

      elements.weatherIcon.hidden = true;
      elements.weatherLottie.hidden = false;
      elements.weatherLottie.setAttribute("aria-label", label);
      weatherLottieAnimation.play();
      resolve(weatherLottieAnimation);
    };

    if (weatherLottieAnimation && activeWeatherAnimationPath === animationPath) {
      revealAnimation();
      return;
    }

    destroyWeatherLottieAnimation();
    elements.weatherLottie.hidden = true;
    elements.weatherLottie.setAttribute("aria-label", label);

    let isSettled = false;
    const animation = window.lottie.loadAnimation({
      container: elements.weatherLottie,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: animationPath,
      rendererSettings: {
        progressiveLoad: true,
        preserveAspectRatio: "xMidYMid meet",
      },
    });
    weatherLottieAnimation = animation;
    activeWeatherAnimationPath = animationPath;
    animation.setSpeed(0.82);

    const cleanup = () => {
      animation.removeEventListener("DOMLoaded", handleReady);
      animation.removeEventListener("data_ready", handleReady);
      animation.removeEventListener("data_failed", handleFailure);
    };
    const handleReady = () => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      revealAnimation();
    };
    const handleFailure = () => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      destroyWeatherLottieAnimation();
      reject(new Error(`Could not load ${animationPath}.`));
    };

    animation.addEventListener("DOMLoaded", handleReady);
    animation.addEventListener("data_ready", handleReady);
    animation.addEventListener("data_failed", handleFailure);
  });
}

function hideWeatherLottie() {
  if (!elements.weatherLottie) return;

  elements.weatherLottie.hidden = true;

  if (weatherLottieAnimation) {
    weatherLottieAnimation.stop();
  }
}

function destroyWeatherLottieAnimation() {
  if (weatherLottieAnimation) {
    weatherLottieAnimation.destroy();
    weatherLottieAnimation = null;
  }

  activeWeatherAnimationPath = "";
  elements.weatherLottie?.replaceChildren();
}

function getWeatherAnimationPath(condition) {
  const weatherMain = String(condition.main || "").toLowerCase();
  const iconCode = String(condition.icon || "");
  const id = Number(condition.id);
  const isDaytimeIcon = iconCode.includes("d");

  if (id >= 200 && id < 300) return WEATHER_ANIMATION_PATHS.thunderstorm;
  if (id >= 300 && id < 600) return WEATHER_ANIMATION_PATHS.rain;
  if (id >= 600 && id < 700) return WEATHER_ANIMATION_PATHS.snow;
  if (id >= 700 && id < 800) return WEATHER_ANIMATION_PATHS.fog;
  if (id === 800 || weatherMain === "clear") {
    return isDaytimeIcon
      ? WEATHER_ANIMATION_PATHS.clearDay
      : WEATHER_ANIMATION_PATHS.clearNight;
  }
  if (id > 800 && id < 900) {
    return isDaytimeIcon
      ? WEATHER_ANIMATION_PATHS.cloudsDay
      : WEATHER_ANIMATION_PATHS.cloudsNight;
  }

  if (weatherMain.includes("thunderstorm")) return WEATHER_ANIMATION_PATHS.thunderstorm;
  if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
    return WEATHER_ANIMATION_PATHS.rain;
  }
  if (weatherMain.includes("snow")) return WEATHER_ANIMATION_PATHS.snow;
  if (
    weatherMain.includes("mist") ||
    weatherMain.includes("fog") ||
    weatherMain.includes("haze") ||
    weatherMain.includes("smoke") ||
    weatherMain.includes("dust") ||
    weatherMain.includes("sand") ||
    weatherMain.includes("ash") ||
    weatherMain.includes("squall")
  ) {
    return WEATHER_ANIMATION_PATHS.fog;
  }
  if (weatherMain.includes("cloud")) {
    return isDaytimeIcon
      ? WEATHER_ANIMATION_PATHS.cloudsDay
      : WEATHER_ANIMATION_PATHS.cloudsNight;
  }

  return "";
}

function ensureLottieReady() {
  if (window.lottie) {
    return Promise.resolve(window.lottie);
  }

  if (lottieLoaderPromise) {
    return lottieLoaderPromise;
  }

  lottieLoaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = LOTTIE_CDN_URL;
    script.async = true;
    script.onload = () => (window.lottie ? resolve(window.lottie) : reject());
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return lottieLoaderPromise;
}

function createWeatherIcon(iconCode, description, condition = {}, options = {}) {
  if (!iconCode) {
    const fallback = document.createElement("span");
    fallback.className = "weather-glyph";
    fallback.textContent = "--";
    fallback.setAttribute("aria-label", `${toTitleCase(description)} weather icon`);
    fallback.setAttribute("role", "img");
    return fallback;
  }

  const label = `${toTitleCase(description)} weather icon`;
  const animationPath =
    options.animated && !prefersReducedMotion()
      ? getWeatherAnimationPath({ ...condition, icon: iconCode })
      : "";
  const icon = document.createElement("img");
  icon.loading = "lazy";
  icon.decoding = "async";
  icon.alt = label;
  icon.src = `${ICON_URL}/${iconCode}@2x.png`;

  if (!animationPath) {
    return icon;
  }

  const wrapper = document.createElement("span");
  wrapper.className = "animated-weather-icon";
  wrapper.setAttribute("aria-label", label);
  wrapper.setAttribute("role", "img");

  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");
  wrapper.append(icon);
  loadCardWeatherAnimation(wrapper, icon, animationPath, label, cardAnimationSequence);

  return wrapper;
}

async function loadCardWeatherAnimation(container, fallbackIcon, animationPath, label, sequenceId) {
  try {
    await ensureLottieReady();

    if (sequenceId !== cardAnimationSequence || !container.isConnected) {
      return;
    }

    const slot = document.createElement("span");
    slot.className = "card-lottie-slot";
    slot.hidden = true;
    container.append(slot);

    const animation = window.lottie.loadAnimation({
      container: slot,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: animationPath,
      rendererSettings: {
        progressiveLoad: true,
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    animation.setSpeed(0.78);
    cardWeatherAnimations.push(animation);

    const cleanup = () => {
      animation.removeEventListener("DOMLoaded", handleReady);
      animation.removeEventListener("data_ready", handleReady);
      animation.removeEventListener("data_failed", handleFailure);
    };
    const handleReady = () => {
      if (sequenceId !== cardAnimationSequence || !container.isConnected) {
        cleanup();
        animation.destroy();
        return;
      }

      cleanup();
      fallbackIcon.hidden = true;
      slot.hidden = false;
      container.setAttribute("aria-label", label);
      animation.play();
    };
    const handleFailure = () => {
      cleanup();
      animation.destroy();
      slot.remove();
      fallbackIcon.hidden = false;
    };

    animation.addEventListener("DOMLoaded", handleReady);
    animation.addEventListener("data_ready", handleReady);
    animation.addEventListener("data_failed", handleFailure);
  } catch {
    fallbackIcon.hidden = false;
  }
}

function resetCardWeatherAnimations() {
  cardAnimationSequence += 1;
  cardWeatherAnimations.forEach((animation) => animation.destroy());
  cardWeatherAnimations = [];
}

function setUnit(nextUnit, shouldReload) {
  const previousUnit = units;

  if (!["metric", "imperial"].includes(nextUnit)) {
    units = "metric";
  } else {
    units = nextUnit;
  }

  writeStorage(STORAGE_KEYS.unit, units);

  elements.unitButtons.forEach((button) => {
    const isActive = button.dataset.unit === units;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  elements.currentUnit.innerHTML = units === "metric" ? "&deg;C" : "&deg;F";
  renderRecentCities();
  renderFavoriteCities();

  if (shouldReload && currentQuery && previousUnit !== units) {
    reloadCurrentWeather();
  }
}

function reloadCurrentWeather() {
  if (currentQuery.type === "demo") {
    loadDemoWeather(currentQuery.city);
  } else if (currentQuery.type === "city") {
    loadWeatherByCity(currentQuery.city);
  } else {
    loadWeatherByCoords(currentQuery.latitude, currentQuery.longitude);
  }
}

function setTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  const isLight = nextTheme === "light";

  elements.body.dataset.theme = nextTheme;
  elements.themeIcon.textContent = isLight ? "\u2600" : "\u263e";
  elements.themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );
  elements.themeToggle.setAttribute("aria-pressed", String(isLight));
  writeStorage(STORAGE_KEYS.theme, nextTheme);
}

function setLoading(isLoading, message = "") {
  elements.body.classList.toggle("is-refreshing", isLoading && !elements.dashboard.hidden);
  elements.main.setAttribute("aria-busy", String(isLoading));
  elements.searchButton.disabled = isLoading;
  elements.locationButton.disabled = isLoading;
  if (elements.demoButton) {
    elements.demoButton.disabled = isLoading;
  }
  if (elements.favoriteButton) {
    elements.favoriteButton.disabled = isLoading || !currentFavoriteCity;
  }
  elements.unitButtons.forEach((button) => {
    button.disabled = isLoading;
  });

  if (isLoading) {
    elements.status.className = "status is-loading";
    elements.status.setAttribute("role", "status");
    elements.status.textContent = message;
    elements.loadingMessage.textContent = message;

    if (elements.dashboard.hidden) {
      elements.emptyState.hidden = true;
      elements.loadingState.hidden = false;
    }

    return;
  }

  elements.status.classList.remove("is-loading");
  elements.loadingState.hidden = true;
}

function showEmptyState({ clearMessage = true } = {}) {
  resetWeatherTheme();
  resetLocationGlobe();
  currentFavoriteCity = null;
  updateFavoriteButton();
  elements.body.classList.remove("is-demo-mode");
  elements.emptyState.hidden = false;
  elements.loadingState.hidden = true;
  elements.dashboard.hidden = true;

  if (clearMessage) {
    clearStatus();
  }
}

function showError(message) {
  const errorState = getErrorStateCopy(message);
  const icon = document.createElement("span");
  icon.className = "status-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "!";

  const copy = document.createElement("span");
  copy.className = "status-copy";

  const title = document.createElement("strong");
  title.textContent = errorState.title;

  const detail = document.createElement("span");
  detail.textContent = errorState.detail;

  copy.append(title, detail);
  elements.status.replaceChildren(icon, copy);
  elements.status.className = "status is-error";
  elements.status.setAttribute("role", "alert");
}

function showSuccess(message) {
  elements.status.textContent = message;
  elements.status.className = "status is-success";
  elements.status.setAttribute("role", "status");
}

function clearStatus() {
  elements.status.replaceChildren();
  elements.status.className = "status";
  elements.status.setAttribute("role", "status");
}

function getErrorStateCopy(message) {
  const value = String(message || "Weather data could not be loaded.");
  const normalized = value.toLowerCase();
  const includesDemoFallback = normalized.includes("showing demo data instead");

  if (normalized.includes("city not found")) {
    return {
      title: "City not found",
      detail: "Try another location or check the spelling.",
    };
  }

  if (normalized.includes("offline") || normalized.includes("network")) {
    return {
      title: "Connection issue",
      detail: includesDemoFallback
        ? "Demo forecast is shown while live data is unavailable."
        : "Check your connection and try again.",
    };
  }

  if (normalized.includes("live weather access") || normalized.includes("api key")) {
    return {
      title: "Live weather unavailable",
      detail: includesDemoFallback
        ? "Demo forecast is shown. Configure Advanced settings for live data."
        : "Configure Advanced settings or use demo mode.",
    };
  }

  if (normalized.includes("location")) {
    return {
      title: "Location unavailable",
      detail: "Search manually or allow location access in your browser.",
    };
  }

  if (normalized.includes("rate limit")) {
    return {
      title: "Rate limit reached",
      detail: "Wait a moment, then try again.",
    };
  }

  return {
    title: "Weather could not load",
    detail: value,
  };
}

function createRequestId() {
  requestSequence += 1;

  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();
  return requestSequence;
}

function isLatestRequest(requestId) {
  return requestId === requestSequence;
}

function validateWeatherPayload(currentWeather, forecast) {
  if (!currentWeather?.main || !Array.isArray(forecast?.list) || forecast.list.length === 0) {
    throw createAppError("bad-data", "Weather API returned incomplete data.");
  }
}

function getReloadQuery(query, currentWeather) {
  const latitude = currentWeather.coord?.lat;
  const longitude = currentWeather.coord?.lon;

  if (typeof latitude === "number" && typeof longitude === "number") {
    return {
      type: "coords",
      latitude,
      longitude,
    };
  }

  return query.type === "city" ? { type: "city", city: query.city } : query;
}

function updateLocationGlobe(currentWeather) {
  const latitude = Number(currentWeather.coord?.lat);
  const longitude = Number(currentWeather.coord?.lon);

  if (
    !elements.locationGlobe ||
    !elements.locationMarker ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    resetLocationGlobe();
    return;
  }

  const markerX = ((longitude + 180) / 360) * 100;
  const markerY = ((90 - latitude) / 180) * 100;
  const surfaceShift = clampNumber(-longitude / 3, -54, 54);
  const locationLabel = formatLocation(currentWeather);

  elements.locationMarker.style.setProperty("--marker-x", `${clampNumber(markerX, 8, 92)}%`);
  elements.locationMarker.style.setProperty("--marker-y", `${clampNumber(markerY, 10, 90)}%`);
  elements.locationGlobe.style.setProperty("--globe-shift", `${surfaceShift}px`);
  elements.locationGlobe.classList.remove("is-locking");
  void elements.locationGlobe.offsetWidth;
  elements.locationGlobe.classList.add("has-lock", "is-locking");
  loadLocationGlobeAnimation();

  if (elements.globeLabel) {
    elements.globeLabel.textContent = `Locked on ${locationLabel}`;
  }

  if (elements.railLocation) {
    elements.railLocation.textContent = `${formatCoordinate(
      latitude,
      "lat"
    )} / ${formatCoordinate(longitude, "lon")}`;
  }
}

function loadLocationGlobeAnimation() {
  if (!elements.locationGlobeAnimation || prefersReducedMotion()) {
    return;
  }

  if (globeLottieAnimation) {
    elements.locationGlobe?.classList.add("has-lottie-globe");
    globeLottieAnimation.play();
    return;
  }

  if (globeAnimationPromise) {
    return;
  }

  globeAnimationPromise = ensureLottieReady()
    .then(() => {
      if (!window.lottie || !elements.locationGlobeAnimation) return null;

      return new Promise((resolve, reject) => {
        let isSettled = false;
        const animation = window.lottie.loadAnimation({
          container: elements.locationGlobeAnimation,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: GLOBE_ANIMATION_PATH,
          rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: "xMidYMid meet",
          },
        });

        globeLottieAnimation = animation;
        animation.setSpeed(0.62);

        const cleanup = () => {
          animation.removeEventListener("DOMLoaded", handleReady);
          animation.removeEventListener("data_ready", handleReady);
          animation.removeEventListener("data_failed", handleFailure);
        };
        const handleReady = () => {
          if (isSettled) return;
          isSettled = true;
          cleanup();
          elements.locationGlobe?.classList.add("has-lottie-globe");
          animation.play();
          resolve(animation);
        };
        const handleFailure = () => {
          if (isSettled) return;
          isSettled = true;
          cleanup();
          reject(new Error(`Could not load ${GLOBE_ANIMATION_PATH}.`));
        };

        animation.addEventListener("DOMLoaded", handleReady);
        animation.addEventListener("data_ready", handleReady);
        animation.addEventListener("data_failed", handleFailure);
      });
    })
    .catch(() => {
      handleLocationGlobeFailure();
      return null;
    });
}

function handleLocationGlobeFailure() {
  if (globeLottieAnimation) {
    globeLottieAnimation.destroy();
    globeLottieAnimation = null;
  }

  globeAnimationPromise = null;
  elements.locationGlobe?.classList.remove("has-lottie-globe");
  elements.locationGlobeAnimation?.replaceChildren();
}

function resetLocationGlobe() {
  if (elements.locationGlobe) {
    elements.locationGlobe.classList.remove("has-lock", "is-locking");
    elements.locationGlobe.style.setProperty("--globe-shift", "0px");
  }

  if (elements.locationMarker) {
    elements.locationMarker.style.setProperty("--marker-x", "50%");
    elements.locationMarker.style.setProperty("--marker-y", "50%");
  }

  if (elements.globeLabel) {
    elements.globeLabel.textContent = "Awaiting location";
  }

  if (elements.railLocation) {
    elements.railLocation.textContent = "Search or use location to update the board.";
  }
}

async function parseJson(response) {
  try {
    return await response.json();
  } catch {
    if (response.ok) {
      throw createAppError("bad-data", "Weather API returned invalid JSON.");
    }

    return null;
  }
}

function getApiKey() {
  const storedKey = readStorage(STORAGE_KEYS.apiKey, "");
  const fileKey = API_KEY !== "YOUR_API_KEY_HERE" ? API_KEY : "";

  return normalizeApiKey(storedKey || fileKey);
}

function hasApiKey() {
  return Boolean(getApiKey());
}

function saveApiKey(event) {
  event.preventDefault();

  const apiKey = normalizeApiKey(elements.apiKeyInput?.value || "");

  if (apiKey.length < 20) {
    showError("Enter a valid live weather key or use demo mode.");
    return;
  }

  writeStorage(STORAGE_KEYS.apiKey, apiKey);
  elements.apiKeyInput.value = "";
  updateApiKeyControls();
  showSuccess("Advanced settings saved. Live weather data is ready.");

  const city = normalizeCity(elements.cityInput.value);

  if (city.length >= 2) {
    loadWeatherByCity(city);
  }
}

function clearSavedApiKey() {
  removeStorage(STORAGE_KEYS.apiKey);
  updateApiKeyControls();
  showSuccess("Live weather key cleared. Demo mode is available.");
}

function updateApiKeyControls() {
  const hasKey = hasApiKey();

  elements.body.classList.toggle("has-api-key", hasKey);

  if (elements.apiKeyState) {
    elements.apiKeyState.textContent = hasKey ? "Live ready" : "Demo ready";
  }

  if (elements.apiKeyInput) {
    elements.apiKeyInput.placeholder = hasKey ? "Live weather key saved" : "Live weather access key";
  }
}

function normalizeApiKey(value) {
  return String(value || "").trim();
}

function shouldUseDemoFallback(error) {
  return (
    ["missing-key", "offline", "network"].includes(error.type) ||
    [401, 429, 500, 502, 503, 504].includes(error.status)
  );
}

function createAppError(type, message, status = null) {
  const error = new Error(message);
  error.type = type;
  error.status = status;
  return error;
}

function updateWeatherTheme(weatherMain, iconCode, weatherId = null) {
  const theme = getWeatherTheme(weatherMain, iconCode, weatherId);

  elements.body.classList.remove(...WEATHER_THEME_CLASSES);
  elements.body.classList.add(`weather-${theme}`);
  elements.body.dataset.weather = theme;
  updateWeatherVideo(theme, iconCode, weatherMain, weatherId);
}

function resetWeatherTheme() {
  elements.body.classList.remove(...WEATHER_THEME_CLASSES);
  elements.body.classList.add("weather-idle");
  elements.body.dataset.weather = "idle";
  updateWeatherVideo("idle");
}

function initializeWeatherVideo() {
  const video = elements.weatherVideo;

  if (!video || prefersReducedMotion()) {
    resetWeatherVideo();
    return;
  }

  activeWeatherVideo = video;
  video.dataset.source = DEFAULT_VIDEO;
  video.dataset.activeSlot = "true";
  video.preload = "metadata";
  video.classList.add("is-visible");

  if (elements.weatherVideoBuffer) {
    elements.weatherVideoBuffer.dataset.activeSlot = "false";
    elements.weatherVideoBuffer.preload = "none";
    elements.weatherVideoBuffer.classList.remove("is-visible");
  }

  elements.body.dataset.weatherVideo = DEFAULT_VIDEO;
  elements.body.classList.add("has-weather-video", "is-default-video");
  playWeatherVideo(video, DEFAULT_VIDEO);
}

function updateWeatherVideo(theme, iconCode = "", weatherMain = "", weatherId = null) {
  const source = getWeatherVideoSource(theme, iconCode, weatherMain, weatherId);
  const activeVideo = getActiveWeatherVideo();

  if (!activeVideo || !source || prefersReducedMotion()) {
    resetWeatherVideo();
    return;
  }

  elements.body.dataset.weatherVideo = source;
  elements.body.dataset.videoError = "";
  elements.body.classList.toggle("is-default-video", source === DEFAULT_VIDEO);

  if (activeVideo.dataset.source === source) {
    showWeatherVideo(activeVideo, source);
    return;
  }

  const nextVideo = getNextWeatherVideo(activeVideo);

  if (!nextVideo || nextVideo === activeVideo) {
    loadSingleWeatherVideo(activeVideo, source);
    return;
  }

  swapWeatherVideo(nextVideo, activeVideo, source);
}

function getActiveWeatherVideo() {
  return activeWeatherVideo || elements.weatherVideo;
}

function getNextWeatherVideo(activeVideo) {
  if (!elements.weatherVideoBuffer) return elements.weatherVideo;
  return activeVideo === elements.weatherVideo ? elements.weatherVideoBuffer : elements.weatherVideo;
}

function showWeatherVideo(video, source) {
  activeWeatherVideo = video;
  video.dataset.activeSlot = "true";
  video.classList.add("is-visible");
  elements.body.classList.add("has-weather-video");
  elements.body.classList.remove("is-video-loading");
  elements.body.classList.toggle("is-default-video", source === DEFAULT_VIDEO);
  playWeatherVideo(video, source);
}

function loadSingleWeatherVideo(video, source) {
  elements.body.classList.add("is-video-loading");
  prepareWeatherVideo(
    video,
    source,
    () => showWeatherVideo(video, source),
    () => handleWeatherVideoError(source)
  );
}

function swapWeatherVideo(nextVideo, previousVideo, source) {
  videoSwapSequence += 1;
  const swapId = videoSwapSequence;

  elements.body.classList.add("is-video-loading");
  nextVideo.classList.remove("is-visible");
  nextVideo.dataset.activeSlot = "loading";

  prepareWeatherVideo(
    nextVideo,
    source,
    () => {
      if (swapId !== videoSwapSequence) return;
      activateWeatherVideo(nextVideo, previousVideo, source);
    },
    () => {
      if (swapId !== videoSwapSequence) return;
      handleWeatherVideoError(source, previousVideo);
    }
  );
}

function prepareWeatherVideo(video, source, onReady, onError) {
  let isSettled = false;

  const cleanup = () => {
    video.removeEventListener("canplay", handleReady);
    video.removeEventListener("loadeddata", handleReady);
    video.removeEventListener("error", handleError);
  };
  const handleReady = () => {
    if (isSettled) return;
    isSettled = true;
    cleanup();
    onReady();
  };
  const handleError = () => {
    if (isSettled) return;
    isSettled = true;
    cleanup();
    onError();
  };

  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = source === DEFAULT_VIDEO ? "metadata" : "auto";
  video.addEventListener("canplay", handleReady);
  video.addEventListener("loadeddata", handleReady);
  video.addEventListener("error", handleError);

  if (video.dataset.source !== source) {
    video.dataset.source = source;
    video.src = source;
    video.load();
    return;
  }

  if (video.readyState >= 2) {
    handleReady();
  } else {
    video.load();
  }
}

function activateWeatherVideo(nextVideo, previousVideo, source) {
  activeWeatherVideo = nextVideo;
  nextVideo.dataset.activeSlot = "true";
  nextVideo.classList.add("is-visible");
  elements.body.classList.add("has-weather-video");
  elements.body.classList.remove("is-video-loading");
  elements.body.classList.toggle("is-default-video", source === DEFAULT_VIDEO);
  playWeatherVideo(nextVideo, source);

  if (previousVideo && previousVideo !== nextVideo) {
    previousVideo.dataset.activeSlot = "false";
    previousVideo.classList.remove("is-visible");
    releaseWeatherVideo(previousVideo);
  }
}

function releaseWeatherVideo(video) {
  window.setTimeout(() => {
    if (video.dataset.activeSlot !== "false") return;

    video.pause();
    video.preload = "none";
    video.removeAttribute("src");
    video.dataset.source = "";
    video.load();
  }, 950);
}

function handleWeatherVideoError(source, previousVideo = null) {
  elements.body.dataset.videoError = `Could not load ${source}`;
  elements.body.classList.remove("is-video-loading");

  if (previousVideo?.dataset.source) {
    showWeatherVideo(previousVideo, previousVideo.dataset.source);
    return;
  }

  if (source !== DEFAULT_VIDEO && elements.weatherVideo) {
    loadSingleWeatherVideo(elements.weatherVideo, DEFAULT_VIDEO);
  } else {
    resetWeatherVideo();
  }
}

function playWeatherVideo(video, source) {
  const playRequest = video.play();

  if (playRequest && typeof playRequest.catch === "function") {
    playRequest.catch(() => {
      elements.body.dataset.videoError = `Waiting to play ${source}`;
    });
  }
}

function getWeatherVideoSource(theme, iconCode = "", weatherMain = "", weatherId = null) {
  const partOfDay = String(iconCode).includes("n") ? "night" : "day";
  const condition = String(weatherMain || "").toLowerCase();
  const id = Number(weatherId);

  if (partOfDay === "night") {
    if (condition.includes("cloud") || (id > 800 && id < 900)) {
      return WEATHER_VIDEO_SOURCES["clouds-night"] || WEATHER_VIDEO_SOURCES.night;
    }

    if (condition.includes("clear") || id === 800) {
      return WEATHER_VIDEO_SOURCES["clear-night"] || WEATHER_VIDEO_SOURCES.night;
    }
  }

  return WEATHER_VIDEO_SOURCES[`${theme}-${partOfDay}`] || WEATHER_VIDEO_SOURCES[theme];
}

function resetWeatherVideo() {
  const videos = [elements.weatherVideo, elements.weatherVideoBuffer].filter(Boolean);

  elements.body.classList.remove("has-weather-video", "is-default-video", "is-video-loading");
  elements.body.dataset.weatherVideo = "";
  activeWeatherVideo = elements.weatherVideo || null;

  videos.forEach((video) => {
    video.dataset.activeSlot = "false";
    video.classList.remove("is-visible");
    video.pause();
  });
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getWeatherTheme(weatherMain, iconCode, weatherId = null) {
  const condition = String(weatherMain || "").toLowerCase();
  const id = Number(weatherId);
  const isNight = String(iconCode || "").includes("n");

  if (id >= 200 && id < 300) return "thunderstorm";
  if (id >= 300 && id < 600) return "rain";
  if (id >= 600 && id < 700) return "snow";
  if (id >= 700 && id < 800) return "fog";
  if (
    isNight &&
    (condition === "clear" || condition === "clouds" || id === 800 || (id > 800 && id < 900))
  ) {
    return "night";
  }
  if (id === 800 || condition === "clear") return "clear";
  if (id > 800 && id < 900) return "clouds";

  if (condition.includes("thunderstorm")) return "thunderstorm";
  if (condition.includes("rain") || condition.includes("drizzle")) return "rain";
  if (condition.includes("snow")) return "snow";
  if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze") ||
    condition.includes("smoke") ||
    condition.includes("dust") ||
    condition.includes("sand") ||
    condition.includes("ash") ||
    condition.includes("squall")
  ) {
    return "fog";
  }
  if (condition.includes("cloud")) return isNight ? "night" : "clouds";
  if (isNight) return "night";

  return "idle";
}

function buildCurrentSummary(currentWeather, nextForecast, description) {
  const feels = formatTemperature(currentWeather.main.feels_like);
  const wind = formatWind(currentWeather.wind?.speed);
  const humidity = currentWeather.main.humidity;
  const chance = nextForecast ? formatProbability(nextForecast.pop) : "0%";
  const comfort = getComfortLabel(currentWeather.main.temp, humidity, currentWeather.wind?.speed);

  return `${toTitleCase(description)} with a ${comfort.toLowerCase()} feel. Feels like ${feels}, wind ${wind}, and ${chance} precipitation chance in the next interval.`;
}

function getComfortLabel(temp, humidity, windSpeed = 0) {
  const tempCelsius = units === "metric" ? temp : ((temp - 32) * 5) / 9;
  const windKmh = units === "metric" ? windSpeed * 3.6 : windSpeed * 1.609344;

  if (tempCelsius >= 32 || humidity >= 82) return "Heavy";
  if (tempCelsius <= 3 || windKmh >= 36) return "Sharp";
  if (tempCelsius >= 18 && tempCelsius <= 27 && humidity <= 70) return "Comfortable";
  return "Moderate";
}

function getFriendlyError(error) {
  if (error.type === "missing-key") {
    return "Live weather access is not configured.";
  }

  if (error.type === "offline") {
    return "You appear to be offline. Connect to the internet and try again.";
  }

  if (error.status === 404) {
    return "City not found. Check spelling and try again.";
  }

  if (error.status === 401) {
    return "OpenWeather rejected the saved live weather key.";
  }

  if (error.status === 429) {
    return "OpenWeather rate limit reached. Wait a moment and try again.";
  }

  if (error.type === "bad-data") {
    return "Weather data came back incomplete. Try another city or retry.";
  }

  if (error.type === "network") {
    return "Network request failed. Check your connection and try again.";
  }

  return "Weather data could not be loaded. Try again in a moment.";
}

function getGeolocationMessage(error) {
  if (error.code === error.PERMISSION_DENIED) {
    return "Location permission was denied.";
  }

  if (error.code === error.POSITION_UNAVAILABLE) {
    return "Your location could not be detected.";
  }

  if (error.code === error.TIMEOUT) {
    return "Location request timed out.";
  }

  return "Location request failed.";
}

function normalizeCity(value) {
  return value.trim().replace(/\s+/g, " ");
}

function scrollToSection(targetId) {
  const target = document.querySelector(`#${targetId}`);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function formatLocation(data) {
  const country = data.sys?.country ? `, ${data.sys.country}` : "";
  return `${data.name}${country}`;
}

function formatCoordinate(value, axis) {
  const direction = axis === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  return `${Math.abs(value).toFixed(2)}\u00b0 ${direction}`;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatTemperature(value) {
  if (typeof value !== "number") return "--";
  return `${Math.round(value)}${getUnitSymbol()}`;
}

function getUnitSymbol() {
  return units === "metric" ? "\u00b0C" : "\u00b0F";
}

function formatWind(speed) {
  if (typeof speed !== "number") return "--";

  if (units === "metric") {
    return `${Math.round(speed * 3.6)} km/h`;
  }

  return `${Math.round(speed)} mph`;
}

function formatVisibility(visibilityMeters) {
  if (typeof visibilityMeters !== "number") {
    return "--";
  }

  if (units === "metric") {
    return `${(visibilityMeters / 1000).toFixed(1)} km`;
  }

  return `${(visibilityMeters / 1609.344).toFixed(1)} mi`;
}

function formatPercentFromWhole(value) {
  if (typeof value !== "number") return "--";
  return `${Math.round(value)}%`;
}

function formatProbability(value) {
  if (typeof value !== "number") return "0%";
  return `${Math.round(value * 100)}%`;
}

function toCelsius(value) {
  if (typeof value !== "number") return null;
  return units === "metric" ? value : ((value - 32) * 5) / 9;
}

function formatStoredTemperature(celsiusValue) {
  if (typeof celsiusValue !== "number") return "--";
  const value = units === "metric" ? celsiusValue : (celsiusValue * 9) / 5 + 32;
  return formatTemperature(value);
}

function formatRecentLocation(city) {
  return city.country ? `${city.name}, ${city.country}` : city.name;
}

function formatTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
}

function formatDay(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatTimezone(timezoneOffset) {
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const absolute = Math.abs(timezoneOffset);
  const hours = String(Math.floor(absolute / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((absolute % 3600) / 60)).padStart(2, "0");

  return `UTC${sign}${hours}:${minutes}`;
}

function getLocalDateKey(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000).toISOString().slice(0, 10);
}

function getLocalHour(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000).getUTCHours();
}

function normalizeTemperatureRange(low, high, globalLow, globalHigh) {
  const spread = Math.max(globalHigh - globalLow, 1);
  const start = Math.max(0, Math.round(((low - globalLow) / spread) * 100));
  const end = Math.min(100, Math.round(((high - globalLow) / spread) * 100));
  const adjustedStart = Math.min(start, 92);
  const adjustedEnd = Math.min(100, Math.max(end, adjustedStart + 8));

  return {
    start: adjustedStart,
    end: adjustedEnd,
  };
}

function toTitleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function readStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
}

function readJsonStorage(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
}

function readRecentCities() {
  const value = readJsonStorage(STORAGE_KEYS.recentCities, []);
  return Array.isArray(value) ? value : [];
}

function readFavoriteCities() {
  const value = readJsonStorage(STORAGE_KEYS.favoriteCities, []);
  return Array.isArray(value) ? value : [];
}
