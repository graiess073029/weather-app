export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  generationtime_ms?: number;
}

export type PrecipitationUnit = "mm" | "inch";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph";
export type Modes = "metric" | "imperial";

export interface MainWeatherData {
  city: string,
  temperature: number,
  windSpeed: number,
  precipitation: number,
  weatherCode: number,
  date: string
}

export interface WeatherResponse{
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    precipitation: string;
    wind_speed_10m: string;
    weather_code: string;
    visibility: string;
    precipitation_probability: string;
    uv_index: string;
    pressure_msl: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    weather_code: number[];
    visibility: number[];
    precipitation_probability: number[];
    uv_index: number[];
    pressure_msl: number[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weather_code: string;
    sunrise: string;
    sunset: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    sunrise: string[];
    sunset: string[];
  };
};

export interface ReverseGeocodingResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    state: string;
    amenity: string;
    road: string;
    city_block: string;
    suburb: string;
    city_district: string;
    city: string;
    "ISO3166-2-lvl6": string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
}


export type Favorites = GeocodingResult[];

export interface City {
  lat: number;
  long: number;
  name: string;
}

export interface WeatherCardsData {
  apparent_temperature: string | undefined;
  humidity: string | undefined;
  wind: string | undefined;
  precipitation: string | undefined;
  uvIndex: string | undefined;
  visibility: string | undefined;
  pressure : string | undefined;
  precipitationProbability : string | undefined;
}

export interface UvComment { min: number; max: number; comment: string };