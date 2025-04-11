"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMagicLink, setShowMagicLink] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (showMagicLink) {
        await handleMagicLinkSignIn(email);
      } else {
        await handleEmailSignIn(email, password);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    const { error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: true,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => router.push("/dashboard"),
        onError: (ctx) => setError(ctx.error.message || "Sign in failed"),
      }
    );

    if (error) {
      setError(error.message || "Sign in failed");
    }
  };

  const handleMagicLinkSignIn = async (email: string) => {
    const { error } = await authClient.signIn.magicLink(
      {
        email,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          // Show success message to user
          setError("Check your email for the magic link!");
        },
        onError: (ctx) =>
          setError(ctx.error.message || "Magic link sign in failed"),
      }
    );

    if (error) {
      setError(error.message || "Magic link sign in failed");
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push("/dashboard"),
          onError: (ctx) => setError(ctx.error.message || "Sign in failed"),
        }
      );

      if (error) {
        setError(error.message || "Sign in failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push("/dashboard"),
          onError: (ctx) => setError(ctx.error.message || "Sign in failed"),
        }
      );

      if (error) {
        setError(error.message || "Sign in failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signIn.social(
        {
          provider: "apple",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push("/dashboard"),
          onError: (ctx) => setError(ctx.error.message || "Sign in failed"),
        }
      );

      if (error) {
        setError(error.message || "Sign in failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl space-y-8 bg-[#0f1117] p-8 rounded-lg shadow-md border border-white/10">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <rect width="24" height="24" rx="4" fill="currentColor" />
            </svg>
            Next / Drizzle / Better-auth.
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="text-sm text-gray-400">
            Login with your GitHub or Google account
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGithubSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-white/10 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            Login with GitHub
          </button>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-white/10 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Login with Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#0f1117] text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {!showMagicLink && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowMagicLink(!showMagicLink)}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              {showMagicLink
                ? "Use password instead"
                : "Use magic link instead"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : showMagicLink
              ? "Send Magic Link"
              : "Sign In"}
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link
            href="/sign-up"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign up
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-purple-400 hover:text-purple-300"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
