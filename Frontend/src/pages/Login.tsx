import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLogin } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { useState } from "react"

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    })
    const { mutate: login, isPending, isError, error } = useLogin()
    console.log(error);
    
    const onFormSubmit = async (values: { email: string; password: string }) => {
        login(values)
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
                <div className="w-full max-w-md space-y-8 relative z-10">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
                        <p className="text-slate-600">Sign in to your account to continue</p>
                    </div>

                    {/* Login Card */}
                    <Card className="border-0 shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-semibold text-center text-slate-800">
                                Sign In
                            </CardTitle>
                            <CardDescription className="text-center text-slate-600">
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 font-medium">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            {...register("email")}
                                            className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <span className="w-4 h-4 text-red-500">⚠</span>
                                            {errors.email.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-700 font-medium">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...register("password")}
                                            className="pl-10 pr-12 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <span className="w-4 h-4 text-red-500"></span>
                                            {errors.password.message?.toString()}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isPending ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                Sign In
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </span>
                                </Button>

                                {/* Error Message */}
                                {isError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm flex items-center gap-2">
                                            <span className="w-4 h-4 text-red-500">⚠</span>
                                            {(error as any)?.response.data.message || "Login failed. Please try again."}
                                        </p>
                                    </div>
                                )}
                            </form>

                            {/* Sign Up Link */}
                            <div className="pt-4 border-t border-slate-200">
                                <p className="text-center text-sm text-slate-600">
                                    Don't have an account?{" "}
                                    <a
                                        href="/register"
                                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Create one here
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trust Indicators */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Secure Login
                            </span>
                            <span>•</span>
                            <span>256-bit SSL Encryption</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 items-center justify-center p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 right-20 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
                </div>
                
                <div className="text-center text-white space-y-6 relative z-10">
                    <h2 className="text-4xl font-bold">Join Our Platform</h2>
                    <p className="text-xl opacity-90 max-w-md">
                        Experience secure and efficient file management with our cloud storage solution.
                    </p>
                    <div className="flex justify-center space-x-4 pt-8">
                        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}