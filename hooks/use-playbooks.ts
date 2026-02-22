"use client"

import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import type { Playbook } from '@/types/trading'
import { useMemo } from 'react'

export function usePlaybooks() {
  const supabase = useMemo(() => createClient(), [])

  const { data, isLoading, error, mutate } = useSWR<Playbook[]>(
    'playbooks',
    async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []
      const { data: playbooks, error } = await supabase
        .from('playbooks')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('name', { ascending: true })
      if (error) throw error
      return (playbooks || []) as Playbook[]
    },
    { revalidateOnFocus: false }
  )

  return {
    playbooks: data || [],
    isLoading,
    error: error ?? null,
    refetch: mutate,
  }
}
