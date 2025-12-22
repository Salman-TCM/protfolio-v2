"use client"

import { useState } from "react"
import { PixelSparkLoader } from "@/components/pixel-spark-loader"

export default function LoaderTestPage() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white">
      <PixelSparkLoader
        isVisible={showLoader}
        onComplete={() => setShowLoader(false)}
        duration={3000}
        theme="green"
      />
      
      {!showLoader && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loader Test Complete!</h1>
            <p className="text-xl mb-6">The pixel-to-spark morph animation worked perfectly.</p>
            <button 
              onClick={() => setShowLoader(true)}
              className="px-6 py-3 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors"
            >
              Test Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
