import drizzle from "/images/day/icon-drizzle.webp";
import fog from "/images/day/icon-fog.webp";
import overcast from "/images/day/icon-overcast.webp";
import partlyCloudy from "/images/day/icon-partly-cloudy.webp";
import rain from "/images/day/icon-rain.webp";
import snow from "/images/day/icon-snow.webp";
import storm from "/images/day/icon-storm.webp";
import sunny from "/images/day/icon-sunny.webp";

import drizzleNight from "/images/night/icon-drizzle.png";
import overcastNight from "/images/night/icon-overcast.png";
import partlyCloudyNight from "/images/night/icon-partly-cloudy.png";
import rainNight from "/images/night/icon-rain.png";
import snowNight from "/images/night/icon-snow.png";
import stormNight from "/images/night/icon-storm.png";
import clear from "/images/night/icon-clear.png";

const weatherCodes = [
    { min: 0, max: 0, icon: {1 : sunny, 0 : clear} },
    { min: 3, max: 3, icon: {1 : overcast, 0 : overcastNight} },
    { min: 1, max: 2, icon: {1 : partlyCloudy, 0 : partlyCloudyNight} },
    { min: 45, max: 48, icon: { 1 : fog, 0 : fog} },
    { min: 51, max: 55, icon: { 1 : drizzle, 0 : drizzleNight} },
    { min: 56, max: 57, icon: { 1 : drizzle, 0 : drizzleNight} },
    { min: 61, max: 65, icon: { 1 : rain, 0 : rainNight} },
    { min: 66, max: 67, icon: { 1 : rain, 0 : rainNight} },
    { min: 71, max: 75, icon: { 1 : rain, 0 : rainNight} },
    { min: 77, max: 77, icon: {1 : snow, 0 : snowNight} },
    { min: 80, max: 82, icon: { 1 : rain, 0 : rainNight} },
    { min: 85, max: 86, icon: { 1 : snow, 0 : snowNight} },
    { min: 95, max: 95, icon: { 1 : storm, 0 : stormNight} },
    { min: 96, max: 99, icon: { 1 : storm, 0 : stormNight} }
];


export const getIcon = (weatherCode: number): { [key: number]: string } | boolean => {
    const src = weatherCodes.find(e => e.min <= weatherCode && e.max >= weatherCode)?.icon || false ;
    return src;
}