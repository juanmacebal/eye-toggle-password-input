"use client"
import { useState, useRef, useEffect } from "react"

interface EyeMovementIconProps {
  showEye: boolean
  eyeFollowMouse?: boolean
  followDelay?: number
  slowMovement?: boolean
  movementSpeed?: number
  size?: number
  className?: string
}

export function EyeMovementIcon({
  showEye,
  eyeFollowMouse = false,
  followDelay = 500,
  slowMovement = false,
  movementSpeed = 5,
  size = 24,
  className,
}: EyeMovementIconProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [delayPassed, setDelayPassed] = useState(false)
  const eyeRef = useRef<SVGSVGElement>(null)
  const animationFrameRef = useRef<number>()

  // Reset delay state when delay changes
  useEffect(() => {
    setDelayPassed(false)
    setEyePosition({ x: 0, y: 0 })
    setTargetPosition({ x: 0, y: 0 })

    if (!eyeFollowMouse) return

    const timer = setTimeout(() => {
      setDelayPassed(true)
    }, followDelay)

    return () => clearTimeout(timer)
  }, [eyeFollowMouse, followDelay])

  // Handle mouse movement and eye position updates
  useEffect(() => {
    if (!eyeFollowMouse || !delayPassed) return

    const handleMouseMove = (e: MouseEvent) => {
      if (eyeRef.current) {
        const eyeRect = eyeRef.current.getBoundingClientRect()
        const eyeCenterX = eyeRect.left + eyeRect.width / 2
        const eyeCenterY = eyeRect.top + eyeRect.height / 2

        // Calculate distance from eye center to mouse
        const dx = e.clientX - eyeCenterX
        const dy = e.clientY - eyeCenterY

        // Limit movement radius
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Allow more movement, especially at smaller sizes
        // The smaller the size, the more relative movement we allow
        const maxMovement = Math.min(4, size / 10)

        // For smaller sizes, allow even more movement proportionally
        const sizeAdjustment = size <= 30 ? 1.5 : 1
        const scale = distance === 0 ? 0 : Math.min(maxMovement * sizeAdjustment, distance) / distance

        // Set target position
        setTargetPosition({
          x: dx * scale,
          y: dy * scale,
        })

        // If not using slow movement, update position immediately
        if (!slowMovement) {
          setEyePosition({
            x: dx * scale,
            y: dy * scale,
          })
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [eyeFollowMouse, delayPassed, slowMovement, size])

  // Handle smooth movement animation
  useEffect(() => {
    if (!slowMovement || !eyeFollowMouse || !delayPassed) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const animateEye = () => {
      setEyePosition((prev) => {
        // Calculate the distance to move based on speed
        const dx = targetPosition.x - prev.x
        const dy = targetPosition.y - prev.y

        // Adjust speed (lower value = slower movement)
        const speed = 1 - Math.exp(-1 / (21 - movementSpeed))

        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        }
      })

      animationFrameRef.current = requestAnimationFrame(animateEye)
    }

    animationFrameRef.current = requestAnimationFrame(animateEye)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [slowMovement, eyeFollowMouse, delayPassed, targetPosition, movementSpeed])

  // Calculate center point for the SVG
  const centerPoint = 12 // Always use 12 as the center point (24/2)

  // Scale the pupil radius based on size, but keep it proportional and within bounds
  // This ensures the pupil is visible at small sizes and not too large at big sizes
  const pupilRadius = Math.max(1.5, Math.min(size / 12, 4))

  // Ensure cx and cy values are valid numbers
  const cx = centerPoint + (eyeFollowMouse && delayPassed ? (Number.isFinite(eyePosition.x) ? eyePosition.x : 0) : 0)
  const cy = centerPoint + (eyeFollowMouse && delayPassed ? (Number.isFinite(eyePosition.y) ? eyePosition.y : 0) : 0)

  // Calculate stroke width based on size to maintain proportions
  const strokeWidth = Math.max(1, Math.min(size / 12, 2.5))

  // For the closed eye (eyeOff), we need custom SVG paths
  const closedEyeSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      ref={eyeRef}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )

  // For the open eye, we need a custom SVG with properly scaled elements
  const openEyeSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      ref={eyeRef}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx={cx} cy={cy} r={pupilRadius} />
    </svg>
  )

  return showEye ? closedEyeSvg : openEyeSvg
}
