"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import Plans from "@/components/Plans";
import Contact from "@/components/Contact";
import Simulator from "@/components/Simulator";

import { useEffect, useState } from "react";
import EconomicModeling from "@/components/EconomicModeling";
import OilPriceChart from "@/components/EconomicsDashboard";
import EconomicsDashboard from "@/components/EconomicsDashboard";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from the endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.datos.gov.co/resource/xigv-mdqq.json"
        );
        const result = await response.json();
        setData(result); // Save the fetched data
        setLoading(false); // Stop the loading state
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <UseCases />
      <HowItWorks />
      <Plans />
      <Simulator />
      <EconomicsDashboard />
      
      <Contact />
    </>
  );
}
