'use client'

import { create } from 'zustand'

type UserState = { user: { username: string; id: string; isAdmin: boolean } }

type UserAction = {
  setUser: (user: { username: string; id: string; isAdmin: boolean }) => void
  clearUser: () => void
}

export const useUserStore = create<UserState & UserAction>()((set) => ({
  user: { username: '', id: '', isAdmin: false },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: { username: '', id: '', isAdmin: false } }),
}))
