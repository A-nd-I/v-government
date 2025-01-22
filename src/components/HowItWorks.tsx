"use client"

import { useEffect, useRef } from "react"
import { Upload, Cog, LineChart } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Input Data",
    description: "Government or user inputs customized data into the system.",
  },
  {
    icon: Cog,
    title: "AI Analysis",
    description: "Advanced AI algorithms process and analyze the input data in real-time.",
  },
  {
    icon: LineChart,
    title: "Generate Results",
    description: "The system produces detailed simulations, predictions, and recommendations.",
  },
]

const HowItWorks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(0, 245, 212, ${Math.random() * 0.5 + 0.5})`,
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

      // Draw connecting lines
      ctx.strokeStyle = "rgba(0, 245, 212, 0.1)"
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs glassmorphism p-6 rounded-lg">
              <div className="bg-gradient text-gray-900 rounded-full p-4 mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

