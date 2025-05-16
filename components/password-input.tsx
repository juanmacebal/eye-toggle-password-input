"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { EyeMovementIcon } from "./eye-movement-icon"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  eyeFollowMouse?: boolean
  followDelay?: number
  slowMovement?: boolean
  movementSpeed?: number
  eyeSize?: number
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      eyeFollowMouse = false,
      followDelay = 500,
      slowMovement = false,
      movementSpeed = 5,
      eyeSize = 24,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="relative">
        <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} ref={ref} {...props} />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <EyeMovementIcon
            showEye={showPassword}
            eyeFollowMouse={eyeFollowMouse}
            followDelay={followDelay}
            slowMovement={slowMovement}
            movementSpeed={movementSpeed}
            size={eyeSize}
          />
        </button>
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
