import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to your ${APP_NAME} account`,
};

export default function LoginPage() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      {/* Mobile logo */}
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-2xl font-bold text-indigo-600">{APP_NAME}</h1>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-500 mt-2">
          Sign in to your account to continue
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
