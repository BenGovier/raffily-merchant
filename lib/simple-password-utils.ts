// NOTE: This is a simplified implementation for demo purposes only
// In a production environment, always use a proper hashing library like bcryptjs

// A very basic "hash" function - NOT SECURE FOR PRODUCTION
export function simpleHash(password: string): string {
  // Simple base64 encoding with a salt
  const salt = "raffily-salt-"
  return Buffer.from(salt + password).toString("base64")
}

// Compare a password with a "hash"
export function comparePassword(password: string, hashedPassword: string): boolean {
  const hashedInput = simpleHash(password)
  return hashedInput === hashedPassword
}

