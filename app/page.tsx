"use client"

import { useState, useEffect } from "react"
import { PasswordInput } from "@/components/password-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "next-themes"
import { Moon, Sun, Github, Copy, Check, Code, Eye, EyeOff, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EyeMovementIcon } from "@/components/eye-movement-icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  const [password, setPassword] = useState("P@ssw0rd123!")
  const [copied, setCopied] = useState<string | null>(null)

  // Demo eye settings (controlled by UI)
  const [demoFollowMouse, setDemoFollowMouse] = useState(true)
  const [demoFollowDelay, setDemoFollowDelay] = useState(500)
  const [demoSlowMovement, setDemoSlowMovement] = useState(true)
  const [demoMovementSpeed, setDemoMovementSpeed] = useState(1)
  const [demoEyeSize, setDemoEyeSize] = useState(38)
  const [showEye, setShowEye] = useState(false)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-gray-950">
        <Card className="w-full max-w-md dark:border-gray-800">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const passwordInputCode = `import { PasswordInput } from "@/components/password-input"

export function MyForm() {
  const [password, setPassword] = useState("")
  
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <PasswordInput
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        eyeFollowMouse={true}
        followDelay={500}
        slowMovement={true}
        movementSpeed={1}
      />
    </div>
  )
}`

  const eyeMovementIconCode = `import { EyeMovementIcon } from "@/components/eye-movement-icon"

export function IconDemo() {
  const [showEye, setShowEye] = useState(false)
  
  return (
    <div onClick={() => setShowEye(!showEye)}>
      <EyeMovementIcon
        showEye={showEye}
        eyeFollowMouse={true}
        followDelay={500}
        slowMovement={true}
        movementSpeed={1}
        size={38}
      />
    </div>
  )
}`

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6" />
            <span className="text-xl font-bold">Eye Components</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Interactive Eye Components
          </h1>
          <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            A collection of React components for password inputs and interactive eye icons with mouse tracking
            capabilities.
          </p>
          <div className="flex gap-4">
            <Button className="gap-2">
              <Package className="h-4 w-4" />
              <span>Install Package</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container pb-16">
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-12">
            {/* Password Input Demo */}
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="w-full dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    <span>Password Input</span>
                  </CardTitle>
                  <CardDescription>A password input component with an interactive eye toggle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      eyeFollowMouse={true}
                      followDelay={500}
                      slowMovement={true}
                      movementSpeed={1}
                      eyeSize={24}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    The eye icon follows your mouse cursor with a smooth animation.
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => copyToClipboard(passwordInputCode, "password-input")}
                  >
                    {copied === "password-input" ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Eye Movement Icon Demo */}
              <Card className="w-full dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <EyeOff className="h-5 w-5" />
                    <span>Eye Movement Icon</span>
                  </CardTitle>
                  <CardDescription>Customize the eye icon appearance and behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-4">
                    <div
                      className="mb-6 p-6 rounded-full bg-gray-100 dark:bg-gray-800 cursor-pointer flex items-center justify-center"
                      style={{ width: Math.max(80, demoEyeSize * 1.8), height: Math.max(80, demoEyeSize * 1.8) }}
                      onClick={() => setShowEye(!showEye)}
                    >
                      <EyeMovementIcon
                        showEye={showEye}
                        eyeFollowMouse={demoFollowMouse}
                        followDelay={demoFollowDelay}
                        slowMovement={demoSlowMovement}
                        movementSpeed={demoMovementSpeed}
                        size={demoEyeSize}
                      />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Click the icon to toggle between states
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="follow-toggle">Eye follows mouse</Label>
                      <Toggle id="follow-toggle" pressed={demoFollowMouse} onPressedChange={setDemoFollowMouse}>
                        {demoFollowMouse ? "On" : "Off"}
                      </Toggle>
                    </div>

                    {demoFollowMouse && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="delay-input">Follow delay (ms)</Label>
                          <Input
                            id="delay-input"
                            type="number"
                            min="0"
                            max="5000"
                            step="100"
                            value={demoFollowDelay}
                            onChange={(e) => setDemoFollowDelay(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="slow-movement-toggle">Slow movement</Label>
                          <Toggle
                            id="slow-movement-toggle"
                            pressed={demoSlowMovement}
                            onPressedChange={setDemoSlowMovement}
                          >
                            {demoSlowMovement ? "On" : "Off"}
                          </Toggle>
                        </div>

                        {demoSlowMovement && (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="movement-speed">Movement speed</Label>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{demoMovementSpeed}</span>
                            </div>
                            <Slider
                              id="movement-speed"
                              min={1}
                              max={20}
                              step={1}
                              value={[demoMovementSpeed]}
                              onValueChange={(values) => setDemoMovementSpeed(values[0])}
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>Slower</span>
                              <span>Faster</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between">
                      <Label htmlFor="eye-size">Eye Size</Label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{demoEyeSize}px</span>
                    </div>
                    <Slider
                      id="eye-size"
                      min={24}
                      max={80}
                      step={2}
                      value={[demoEyeSize]}
                      onValueChange={(values) => setDemoEyeSize(values[0])}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    The eye icon can be customized with various settings.
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => copyToClipboard(eyeMovementIconCode, "eye-icon")}
                  >
                    {copied === "eye-icon" ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-8">
            <Card className="dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  <span>Component Documentation</span>
                </CardTitle>
                <CardDescription>Learn how to use the components in your projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Password Input Documentation */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">PasswordInput Component</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The PasswordInput component extends the standard input element with an interactive eye toggle that
                    allows users to show or hide their password. The eye icon can follow the mouse cursor for an
                    engaging user experience.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-medium">Props</h4>
                    <div className="rounded-md border border-gray-200 dark:border-gray-800">
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-medium">Prop</div>
                        <div className="font-medium">Type</div>
                        <div className="font-medium">Description</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">eyeFollowMouse</div>
                        <div className="text-sm">boolean</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Enable mouse tracking for the eye icon
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">followDelay</div>
                        <div className="text-sm">number</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Delay in ms before eye starts following mouse
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">slowMovement</div>
                        <div className="text-sm">boolean</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Enable smooth movement animation</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">movementSpeed</div>
                        <div className="text-sm">number</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Speed of eye movement (1-20)</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4">
                        <div className="font-mono text-sm">eyeSize</div>
                        <div className="text-sm">number</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Size of the eye icon in pixels</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Eye Movement Icon Documentation */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">EyeMovementIcon Component</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The EyeMovementIcon component is a standalone eye icon that can toggle between open and closed
                    states. It supports mouse tracking and customizable animation settings.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-medium">Props</h4>
                    <div className="rounded-md border border-gray-200 dark:border-gray-800">
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-medium">Prop</div>
                        <div className="font-medium">Type</div>
                        <div className="font-medium">Description</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">showEye</div>
                        <div className="text-sm">boolean</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Toggle between open and closed eye states
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">eyeFollowMouse</div>
                        <div className="text-sm">boolean</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Enable mouse tracking for the eye
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">followDelay</div>
                        <div className="text-sm">number</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Delay in ms before eye starts following mouse
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">slowMovement</div>
                        <div className="text-sm">boolean</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Enable smooth movement animation</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-mono text-sm">movementSpeed</div>
                        <div className="text-sm">number</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Speed of eye movement (1-20)</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4">
                        <div className="font-mono text-sm">size</div>
                        <div className="text-sm">number</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Size of the eye icon in pixels</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <span className="font-semibold">Eye Components</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with React, Next.js, and Tailwind CSS. Open source and MIT licensed.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
