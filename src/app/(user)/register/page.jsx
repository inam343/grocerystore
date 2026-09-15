"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaLeaf, FaCheck } from "react-icons/fa";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        "https://server-production-8923.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Account created! Redirecting to login…");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "bg-red-400", w: "w-1/3" };
    if (p.length < 10) return { label: "Fair", color: "bg-yellow-400", w: "w-2/3" };
    return { label: "Strong", color: "bg-green-500", w: "w-full" };
  };
  const strength = passwordStrength();

  const fields = [
    {
      id: "email",
      label: "Email address",
      type: "email",
      placeholder: "you@example.com",
      icon: <FaEnvelope size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />,
    },
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "Pick a username",
      icon: <FaUser size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[440px] animate-fadeInUp">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header band */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 pt-8 pb-10">
            <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mx-auto mb-4">
              <FaLeaf size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white text-center">Create account</h1>
            <p className="text-green-100 text-sm text-center mt-1">
              Join thousands of happy shoppers
            </p>
          </div>

          <div className="px-8 pt-8 pb-8 -mt-4 bg-white rounded-t-3xl">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                <span>⚠️</span> {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
                <FaCheck size={13} /> {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ id, label, type, placeholder, icon }) => (
                <div key={id}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {label}
                  </label>
                  <div className="relative">
                    {icon}
                    <input
                      type={type}
                      name={id}
                      value={formData[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FaLock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                {strength && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.w}`} />
                    </div>
                    <p className={`text-xs mt-1 font-medium ${strength.color.replace("bg-", "text-")}`}>
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <FaLock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    required
                    className={`input-field pl-10 pr-10 ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "border-red-300 focus:border-red-400"
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? "border-green-400"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <FaCheck size={12} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
          <span>🔒 Privacy protected</span>
          <span>🌿 Free to join</span>
          <span>✉️ No spam</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
