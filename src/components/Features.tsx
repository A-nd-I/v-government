"use client"

import { useState } from "react"
import { Globe, Brain, BarChart2, Users } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Advanced Simulation",
    description: "Simulate countries and regions with unprecedented accuracy using cutting-edge AI models.",
    details:
      "Our advanced simulation engine uses machine learning algorithms to process vast amounts of data, creating highly accurate models of complex societal systems. This allows policymakers to test various scenarios and predict outcomes with unparalleled precision.",
  },
  {
    icon: Brain,
    title: "Predictive Analysis",
    description: "Harness the power of AI for data-driven predictions and policy recommendations.",
    details:
      "Leveraging state-of-the-art natural language processing and deep learning techniques, our predictive analysis tool can forecast trends, identify potential issues, and suggest optimal solutions based on historical data and real-time information.",
  },
  {
    icon: BarChart2,
    title: "Interactive Visualization",
    description: "Visualize complex government data with intuitive and dynamic dashboards.",
    details:
      "Our interactive visualization tools transform raw data into easily understandable graphics, charts, and maps. This allows for quick insights, pattern recognition, and effective communication of complex information to both experts and the general public.",
  },
  {
    icon: Users,
    title: "Citizen Participation",
    description: "Enhance transparency and engage citizens in the governance process.",
    details:
      "Our platform includes features for citizen engagement, such as public forums, polls, and feedback mechanisms. This fosters a more participatory democracy, allowing governments to tap into the collective wisdom of their constituents and build trust through transparency.",
  },
]

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Cutting-Edge Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glassmorphism p-6 rounded-lg cursor-pointer transition-all duration-300 ${activeFeature === index ? "neon-border" : ""}`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 glassmorphism p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">{features[activeFeature].title}</h3>
          <p className="text-gray-300">{features[activeFeature].details}</p>
        </div>
      </div>
    </section>
  )
}

export default Features

