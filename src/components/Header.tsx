"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-gray-900/80 backdrop-blur-md" : "py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gradient">
            v-government
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/#features" className="hover:text-primary transition">
              Features
            </Link>
            <Link href="/#use-cases" className="hover:text-primary transition">
              Use Cases
            </Link>
            <Link href="/#how-it-works" className="hover:text-primary transition">
              How It Works
            </Link>
            <Link href="/#plans" className="hover:text-primary transition">
              Plans
            </Link>
            <Link href="/#contact" className="hover:text-primary transition">
              Contact
            </Link>
          </nav>
          <button className="hidden md:block bg-gradient text-gray-900 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition">
            Sign In / Register
          </button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden glassmorphism mt-2 p-4">
          <Link
            href="/#features"
            className="block py-2 hover:text-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/#use-cases"
            className="block py-2 hover:text-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Use Cases
          </Link>
          <Link
            href="/#how-it-works"
            className="block py-2 hover:text-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/#plans"
            className="block py-2 hover:text-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Plans
          </Link>
          <Link
            href="/#contact"
            className="block py-2 hover:text-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <button className="mt-4 w-full bg-gradient text-gray-900 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition">
            Sign In / Register
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header

