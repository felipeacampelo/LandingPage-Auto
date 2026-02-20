import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border bg-black/50 px-4 py-3 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-200",
          error
            ? "border-red-500 focus:ring-red-500/50"
            : "border-gold/30 focus:border-gold focus:ring-gold/50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
