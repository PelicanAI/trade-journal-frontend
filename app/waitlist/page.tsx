"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "@phosphor-icons/react"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function WaitlistForm() {
  const searchParams = useSearchParams()
  const oauthBlocked = searchParams.get("oauth") === "blocked"
  const plan = searchParams.get("plan")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || trimmedName.length > 100) {
      setError("Please enter your name.")
      return
    }
    if (!EMAIL_RE.test(trimmedEmail) || trimmedEmail.length > 255) {
      setError("Please enter a valid email.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          source: "signup_closed",
          referral_code: plan,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else if (res.status === 429) {
        setError("Too many requests. Please try again shortly.")
      } else {
        const payload = await res.json().catch(() => null)
        setError(payload?.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 mb-4 relative">
            <Image
              src="/pelican-logo-transparent.webp"
              alt="Pelican Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            You&apos;re in.
          </h1>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            We&apos;ll email you the moment we reopen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {oauthBlocked && (
        <div
          className="mb-4 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground"
          role="alert"
        >
          Signups are closed for now. Get on the list and we&apos;ll reach out when the next wave opens.
        </div>
      )}

      <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 mb-4 relative">
            <Image
              src="/pelican-logo-transparent.webp"
              alt="Pelican Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Pelican is full.
          </h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Launch demand blew past what we planned for. We&apos;re sharpening the model with our current traders before the next wave opens up.
          </p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Drop your name and email. You&apos;ll be first through the door when we reopen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="wl-name"
              className="text-sm font-medium text-muted-foreground ml-1"
            >
              Name
            </label>
            <input
              type="text"
              id="wl-name"
              maxLength={100}
              placeholder="Your name"
              className="w-full bg-background border border-border rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="wl-email"
              className="text-sm font-medium text-muted-foreground ml-1"
            >
              Email
            </label>
            <input
              type="email"
              id="wl-email"
              maxLength={255}
              placeholder="trader@example.com"
              className="w-full bg-background border border-border rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Save my spot"}
          </button>
        </form>
      </div>
    </>
  )
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      <div className="w-full max-w-[420px] relative z-10 flex flex-col">
        <div className="mb-6 self-start">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} weight="regular" className="mr-2" />
            Back to Home
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="bg-card border border-border rounded-3xl p-8 shadow-xl h-[400px]" />
          }
        >
          <WaitlistForm />
        </Suspense>
      </div>
    </div>
  )
}
