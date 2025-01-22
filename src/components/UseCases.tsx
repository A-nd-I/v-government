"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

const useCases = [
  {
    title: "Smart City Management",
    description: "Optimize urban planning and resource allocation with AI-driven insights.",
    details:
      "v-government enables city planners to create digital twins of urban areas, simulating traffic flow, energy consumption, and public service utilization. This allows for data-driven decisions on infrastructure development, leading to more efficient and sustainable cities.",
  },
  {
    title: "Economic Policy Simulation",
    description: "Test and refine economic policies in a risk-free virtual environment.",
    details:
      "Policymakers can use v-government to model complex economic scenarios, testing the potential impacts of new tax structures, trade agreements, or monetary policies. This helps in identifying optimal strategies for economic growth and stability.",
  },
  {
    title: "Crisis Management",
    description: "Enhance preparedness and response to natural disasters and public health crises.",
    details:
      "v-government's predictive capabilities allow governments to simulate various crisis scenarios, optimizing resource allocation and response strategies. This leads to more effective emergency management and potentially saves lives.",
  },
]

const UseCases = () => {
  const [activeCase, setActiveCase] = useState(0)

  return (
    <section id="use-cases" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Real-World Applications</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeCase === index ? "bg-gradient text-gray-900" : "glassmorphism hover:neon-border"
                }`}
                onClick={() => setActiveCase(index)}
              >
                <h3 className="font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm">{useCase.description}</p>
                <ChevronRight
                  className={`w-5 h-5 mt-2 transition ${activeCase === index ? "text-gray-900" : "text-primary"}`}
                />
              </div>
            ))}
          </div>
          <div className="md:w-2/3 glassmorphism p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{useCases[activeCase].title}</h3>
            <p className="mb-4">{useCases[activeCase].description}</p>
            <p className="text-gray-300">{useCases[activeCase].details}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCases

