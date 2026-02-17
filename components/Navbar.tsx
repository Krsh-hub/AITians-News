'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      setIsLoggedIn(true)
      try {
        const userData = JSON.parse(user)
        setUserName(userData.name || userData.email)
      } catch (e) {
        setUserName('User')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUserName('')
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.jpg"
              alt="AITians Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-xl font-bold gradient-text">
              AITian News
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/category/finance" className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition">
              Finance
            </Link>
            <Link href="/category/education" className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition">
              Education
            </Link>
            <Link href="/category/startups" className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition">
              Startups
            </Link>
            <Link href="/category/tools" className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition">
              Tools
            </Link>
            <Link href="/category/medical" className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition">
              Medical
            </Link>
            <Link href="/category/environment" className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition">
              Environment
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 glass rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm hover:bg-white/5 rounded-lg transition flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm hover:bg-white/5 rounded-lg transition">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}