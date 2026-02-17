import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toRupiah(price : string | bigint){
  return Number(price).toLocaleString('id-ID')
}