import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the difference in days between a given date string
 * in the 'dd-mm-yyyy' format and the current date.
 *
 * @param {string} dateString - The date string in 'dd-mm-yyyy' format.
 * @returns {number} The difference in days.
 */
export function getDaysDifference(dateString: string) {
  // Split the date string into day, month, and year components
  const [day, month, year] = dateString.split('-').map(Number);

  // Create a Date object using the parsed components
  // Month is zero-based in JavaScript Date, so subtract 1 from the month
  const givenDate = new Date(year, month - 1, day);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in time (milliseconds)
  const differenceInTime = currentDate.getTime() - givenDate.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}