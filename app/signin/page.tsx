"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simpan user session (demo purposes)
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }))
    localStorage.setItem('token', 'demo-token-' + Date.now())
    
    console.log("Sign in dengan:", { email, password })
    setIsLoading(false)
    
    // Redirect ke home page
    router.push('/')
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Masukkan email dan password Anda untuk masuk
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <Link 
                href="/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Lupa password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Belum punya akun?{" "}
              <Link 
                href="/signup" 
                className="text-primary font-medium hover:underline"
              >
                Daftar disini
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
