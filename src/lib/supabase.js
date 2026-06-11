import { createClient } from '@supabase/supabase-js'

const SUPA_URL = 'https://xtoviysixmnlbehsdlug.supabase.co'
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0b3ZpeXNpeG1ubGJlaHNkbHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTE1MDksImV4cCI6MjA5NjM4NzUwOX0.Ng-9QZ_0ekB8SI-9ts4Hv6raB9_DH0UjVioawMjjxoo'

export const db = createClient(SUPA_URL, SUPA_KEY)

export const genCode = () => String(Math.floor(100000 + Math.random() * 900000))
export const genId = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36)

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
