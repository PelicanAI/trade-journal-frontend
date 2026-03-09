'use client'

import { PlugsConnected } from '@phosphor-icons/react'
import { PelicanButton } from '@/components/ui/pelican'
import { toast } from '@/hooks/use-toast'

interface ConnectBrokerButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ConnectBrokerButton({
  variant = 'secondary',
  size = 'sm',
  className,
}: ConnectBrokerButtonProps) {
  return (
    <PelicanButton
      variant={variant}
      size={size}
      onClick={() => {
        toast({
          title: 'Coming soon',
          description: 'Broker sync coming soon! Connect your brokerage to auto-import positions.',
        })
      }}
      className={className}
    >
      <PlugsConnected size={14} weight="bold" />
      Connect Broker
    </PelicanButton>
  )
}
