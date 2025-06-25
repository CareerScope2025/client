import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomColor = (minBrightness: number): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness < minBrightness) {
    return getRandomColor(minBrightness);
  }

  return `rgb(${r}, ${g}, ${b})`;
};

export const getRandomVector = (size: number): [number, number, number] => {
  let x = Math.random() - 0.5;
  let y = Math.random() - 0.5;
  let z = Math.random() - 0.5;

  const length = Math.sqrt(x * x + y * y + z * z);
  if (length === 0) {
    return getRandomVector(size);
  }

  // Normalize the vector
  x = (x / length) * size;
  y = (y / length) * size;
  z = (z / length) * size;

  return [x, y, z];
};
