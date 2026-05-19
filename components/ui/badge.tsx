import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-ink text-white hover:bg-ink-2',
        secondary:
          'border border-transparent bg-bg text-ink hover:bg-line',
        destructive:
          'border border-transparent bg-red-primary text-white hover:bg-red-dark',
        outline: 'border border-ink text-ink',
        success: 'border border-transparent bg-green-light text-green-primary',
        warning: 'border border-transparent bg-yellow-light text-yellow-primary',
        info: 'border border-transparent bg-blue-light text-blue-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
