
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function minLength(value: string, length: number): boolean {
  return value.trim().length >= length;
}
