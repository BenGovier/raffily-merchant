export interface User {
  id: string
  email: string
  name: string
  company: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

