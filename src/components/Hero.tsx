"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 },
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">The Future of Governance is Here</h1>
            <p className="text-xl mb-8 text-gray-300">
              Revolutionize decision-making with AI-driven simulations, policy analysis, and real-time data insights.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gradient text-gray-900 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
                Get Started
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-gray-900 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI-powered governance platform"
                width={600}
                height={400}
                className="rounded-lg neon-border"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient text-gray-900 px-4 py-2 rounded-full font-semibold">
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

