import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { saveAs } from "file-saver";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function downloadFile(url: string, filename: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();
    // const filename = url.split('/').pop() || 'file';
    saveAs(blob, filename);
  } catch (error) {
    console.error(error);
  }
}