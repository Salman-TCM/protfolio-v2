"use client"

import React from 'react'
import { SalmanLoader } from '../../components/salman-loader'

export default function LoaderShowcase() {
  return (
    <div className="min-h-screen bg-black">
      <SalmanLoader
        isVisible={true}
        onComplete={() => {}}
        theme="cyberspace"
        duration={4000}
      />
    </div>
  )
}
