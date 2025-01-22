"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Citizen",
    price: "Free",
    features: ["Basic access to public data", "Participate in public forums", "View simplified simulations"],
  },
  {
    name: "Government",
    price: "Custom Pricing",
    features: [
      "Full simulation capabilities",
      "Advanced AI analysis",
      "Customized dashboards",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Starting at $999/mo",
    features: [
      "All Government features",
      "Multi-region support",
      "Advanced security features",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
]

const Plans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section id="plans" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glassmorphism p-8 rounded-lg transition-all duration-300 ${
                hoveredPlan === index ? "neon-border" : ""
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6 text-gradient">{plan.price}</p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient text-gray-900 py-2 rounded-full hover:opacity-90 transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Plans

