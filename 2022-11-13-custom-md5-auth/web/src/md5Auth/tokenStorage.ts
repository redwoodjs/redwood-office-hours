import type { User } from './types'

// Adapted from https://github.com/supabase/gotrue-js

type AnyFunction = (...args: any[]) => any
type MaybePromisify<T> = T | Promise<T>

type PromisifyMethods<T> = {
  [K in keyof T]: T[K] extends AnyFunction
    ? (...args: Parameters<T[K]>) => MaybePromisify<ReturnType<T[K]>>
    : T[K]
}

export type SupportedStorage = PromisifyMethods<
  Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
>

export const isBrowser = () => typeof window !== 'undefined'

export const localStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    if (!isBrowser()) {
      return null
    }

    return globalThis.localStorage.getItem(key)
  },
  setItem: (key, value) => {
    if (!isBrowser()) {
      return
    }

    globalThis.localStorage.setItem(key, value)
  },
  removeItem: (key) => {
    if (!isBrowser()) {
      return
    }

    globalThis.localStorage.removeItem(key)
  },
}

// Storage helpers
export const setItemAsync = async (
  storage: SupportedStorage,
  key: string,
  data: any
): Promise<void> => {
  await storage.setItem(key, JSON.stringify(data))
}

export const getItemAsync = async (
  storage: SupportedStorage,
  key: string
): Promise<unknown> => {
  const value = await storage.getItem(key)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const getTokenAsync = async (key: string) => {
  return await getItemAsync(localStorageAdapter, key)
}

export const setTokenAsync = async (key: string, token: string) => {
  return await setItemAsync(localStorageAdapter, key, token)
}

export const clearTokenAsync = async (key: string) => {
  localStorageAdapter.removeItem(key)
  return
}
