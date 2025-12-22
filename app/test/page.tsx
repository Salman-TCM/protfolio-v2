export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-xl">This is a minimal test page to verify basic rendering.</p>
        <div className="mt-8 p-4 border border-white rounded">
          <p>If you can see this, the basic setup is working.</p>
        </div>
      </div>
    </div>
  )
}
