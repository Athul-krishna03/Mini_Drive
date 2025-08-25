import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validation/registerValidation";
import { useRegister } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, ArrowRight } from "lucide-react"
import { useState } from "react"

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    phone: string;
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: yupResolver(registerSchema),
    });

    const { mutate: registerFn, isPending, isError, error } = useRegister();

    const onSubmit = (data: RegisterForm) => {
        registerFn(data);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Left side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 items-center justify-center p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-20 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-white rounded-full"></div>
                </div>
                
                <div className="text-center text-white space-y-6 relative z-10">
                    <h2 className="text-4xl font-bold">Welcome to Our Platform</h2>
                    <p className="text-xl opacity-90 max-w-md">
                        Create your account today and unlock access to all our premium features and services.
                    </p>
                    <div className="flex justify-center space-x-4 pt-8">
                        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
                <div className="w-full max-w-md space-y-8 relative z-10">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
                        <p className="text-slate-600">Join and Start Your Journey</p>
                    </div>

                    {/* Register Card */}
                    <Card className="border-0 shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-semibold text-center text-slate-800">
                                Sign Up
                            </CardTitle>
                            <CardDescription className="text-center text-slate-600">
                                Fill in your details to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-700 font-medium">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            {...register("name")}
                                            className="pl-10 h-12 border-slate-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <span className="w-4 h-4 text-red-500">⚠</span>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

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
                                            className="pl-10 h-12 border-slate-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <span className="w-4 h-4 text-red-500">⚠</span>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-slate-700 font-medium">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            {...register("phone")}
                                            className="pl-10 h-12 border-slate-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <span className="w-4 h-4 text-red-500">⚠</span>
                                            {errors.phone.message}
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
                                            placeholder="Create a strong password"
                                            {...register("password")}
                                            className="pl-10 pr-12 h-12 border-slate-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 bg-white"
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
                                            <span className="w-4 h-4 text-red-500">⚠</span>
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                                    By creating an account, you agree to our{" "}
                                    <a href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                                        Privacy Policy
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isPending ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account
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
                                            {error?.message || "Registration failed. Please try again."}
                                        </p>
                                    </div>
                                )}
                            </form>

                            {/* Sign In Link */}
                            <div className="pt-4 border-t border-slate-200">
                                <p className="text-center text-sm text-slate-600">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-semibold text-green-600 hover:text-green-700 transition-colors"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trust Indicators */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Secure Registration
                            </span>
                            <span>•</span>
                            <span>Data Protected</span>
                            <span>•</span>
                            <span>GDPR Compliant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}