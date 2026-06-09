'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { User, AuthState } from './types'
import { mockUsers } from './mock-data'

const AuthContext = createContext<{
  auth: AuthState
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
} | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
  })

  const login = useCallback(async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true }))
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const user = mockUsers.find((u) => u.email === email)
      if (!user) {
        throw new Error('Invalid credentials')
      }
      setAuth({
        isAuthenticated: true,
        user,
        isLoading: false,
      })
    } catch (error) {
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      })
      throw error
    }
  }, [])

  const register = useCallback(async (data: any) => {
    setAuth((prev) => ({ ...prev, isLoading: true }))
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        phone: data.phone || '',
        wishlist: [],
        createdAt: new Date(),
        isVerified: false,
      }
      setAuth({
        isAuthenticated: true,
        user: newUser,
        isLoading: false,
      })
    } catch (error) {
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      })
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    })
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
