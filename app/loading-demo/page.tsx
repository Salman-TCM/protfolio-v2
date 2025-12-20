"use client"

import React, { useState } from 'react'
import { PixelSparkLoader, usePixelSparkLoader } from '../../components/pixel-spark-loader'
import { SalmanLoader, useSalmanLoader } from '../../components/salman-loader'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { RETRO_THEMES } from '../../components/terminal-effects'

export default function LoadingDemo() {
  const [showLoader, setShowLoader] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof RETRO_THEMES>('green')
  const [duration, setDuration] = useState(3000)
  const [pixelCount, setPixelCount] = useState(64)
  
  const customLoader = usePixelSparkLoader({
    duration: duration,
    theme: selectedTheme,
    autoShow: true // Also auto-show on page load
  })

  const salmanLoader = useSalmanLoader({
    duration: duration,
    theme: selectedTheme,
    autoShow: true // Auto-show on page load
  })

  const themes: (keyof typeof RETRO_THEMES)[] = ['green', 'amber', 'white', 'cyberspace']

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Loader Overlay */}
      <PixelSparkLoader
        isVisible={showLoader}
        onComplete={() => setShowLoader(false)}
        duration={duration}
        theme={selectedTheme}
        pixelCount={pixelCount}
      />
      {customLoader.Loader()}
      {salmanLoader.Loader()}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-mono mb-8 text-center" style={{ color: RETRO_THEMES[selectedTheme].primary }}>
          Pixel-to-Spark Loader Demo
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls Card */}
          <Card className="border-white/20 bg-black/50">
            <CardHeader>
              <CardTitle className="text-white font-mono">Loader Controls</CardTitle>
              <CardDescription className="text-gray-400">
                Customize the loading animation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="text-sm font-mono text-gray-300 block mb-2">Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <Button
                      key={theme}
                      variant={selectedTheme === theme ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTheme(theme)}
                      className="font-mono text-xs"
                      style={{
                        borderColor: RETRO_THEMES[theme].primary,
                        backgroundColor: selectedTheme === theme ? RETRO_THEMES[theme].primary : 'transparent',
                        color: selectedTheme === theme ? 'black' : RETRO_THEMES[theme].primary
                      }}
                    >
                      {theme.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Duration Control */}
              <div>
                <label className="text-sm font-mono text-gray-300 block mb-2">
                  Duration: {duration}ms
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                  style={{
                    accentColor: RETRO_THEMES[selectedTheme].primary
                  }}
                />
              </div>

              {/* Pixel Count Control */}
              <div>
                <label className="text-sm font-mono text-gray-300 block mb-2">
                  Pixel Count: {pixelCount}
                </label>
                <input
                  type="range"
                  min="16"
                  max="256"
                  step="16"
                  value={pixelCount}
                  onChange={(e) => setPixelCount(Number(e.target.value))}
                  className="w-full"
                  style={{
                    accentColor: RETRO_THEMES[selectedTheme].primary
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => setShowLoader(true)}
                  className="w-full font-mono"
                  style={{
                    backgroundColor: RETRO_THEMES[selectedTheme].primary,
                    color: 'black'
                  }}
                >
                  SHOW BASIC LOADER
                </Button>
                <Button
                  onClick={customLoader.show}
                  variant="outline"
                  className="w-full font-mono"
                  style={{
                    borderColor: RETRO_THEMES[selectedTheme].primary,
                    color: RETRO_THEMES[selectedTheme].primary
                  }}
                >
                  SHOW HOOK LOADER
                </Button>
                <Button
                  onClick={salmanLoader.show}
                  variant="outline"
                  className="w-full font-mono"
                  style={{
                    borderColor: RETRO_THEMES[selectedTheme].primary,
                    color: RETRO_THEMES[selectedTheme].primary
                  }}
                >
                  SHOW SALMAN LOADER
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-white/20 bg-black/50">
            <CardHeader>
              <CardTitle className="text-white font-mono">Animation Stages</CardTitle>
              <CardDescription className="text-gray-400">
                The loader goes through these phases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: RETRO_THEMES[selectedTheme].primary }}
                  />
                  <span>INITIALIZING (0-30%)</span>
                </div>
                <p className="text-gray-400 text-xs ml-6">
                  Pixels form in grid pattern
                </p>
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: RETRO_THEMES[selectedTheme].secondary }}
                  />
                  <span>MORPHING (30-70%)</span>
                </div>
                <p className="text-gray-400 text-xs ml-6">
                  Pixels transform and emit sparks
                </p>
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: RETRO_THEMES[selectedTheme].primary }}
                  />
                  <span>IGNITING (70-90%)</span>
                </div>
                <p className="text-gray-400 text-xs ml-6">
                  Final spark explosion effect
                </p>
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: RETRO_THEMES[selectedTheme].dim }}
                  />
                  <span>COMPLETE (90-100%)</span>
                </div>
                <p className="text-gray-400 text-xs ml-6">
                  Animation concludes
                </p>
              </div>

              <div className="pt-4 border-t border-white/20">
                <h4 className="font-mono text-sm mb-2" style={{ color: RETRO_THEMES[selectedTheme].primary }}>
                  Features:
                </h4>
                <ul className="text-xs text-gray-400 space-y-1 font-mono">
                  <li>• Dynamic pixel grid formation</li>
                  <li>• Physics-based spark particles</li>
                  <li>• CRT scanline effects</li>
                  <li>• Retro terminal themes</li>
                  <li>• Keyboard skip (SPACE/ENTER)</li>
                  <li>• Progress tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Example */}
        <Card className="mt-8 border-white/20 bg-black/50">
          <CardHeader>
            <CardTitle className="text-white font-mono">Usage Example</CardTitle>
            <CardDescription className="text-gray-400">
              How to implement in your components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-black/50 p-4 rounded overflow-x-auto font-mono" style={{ color: RETRO_THEMES[selectedTheme].primary }}>
{`import { PixelSparkLoader, usePixelSparkLoader } from '@/components/pixel-spark-loader'
import { SalmanLoader, useSalmanLoader } from '@/components/salman-loader'

// Basic PixelSpark usage
<PixelSparkLoader
  isVisible={showLoader}
  onComplete={() => setShowLoader(false)}
  theme="green"
  duration={3000}
/>

// Salman Loader with text animation
<SalmanLoader
  isVisible={showLoader}
  onComplete={() => setShowLoader(false)}
  theme="cyberspace"
  duration={3000}
/>

// Hook usage
const { show, hide, Loader } = usePixelSparkLoader({
  duration: 3000,
  theme: 'cyberspace'
})

const salmanLoader = useSalmanLoader({
  duration: 3000,
  theme: 'green'
})

// Show loaders
show()
salmanLoader.show()

// Render
{Loader()}
{salmanLoader.Loader()}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
