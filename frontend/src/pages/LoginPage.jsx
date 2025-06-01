import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onError = (errors) => {
      if (errors.fullName) {
        return toast.error(errors.fullName.message);
      }
      if (errors.email) {
        return toast.error(errors.email.message);
      }
      if (errors.password) {
        return toast.error(errors.password.message);
      }
    };

    const onSubmit = (data) => {
      login(data)
    };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Login Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="my-6 w-[50%]"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative mt-1 z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
            </div>
          </div>

          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative mt-1 z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-7"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
              </>
            ) : (
              "Login Account"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="flex text-base-content/60">
            Don&apos;t have an account?&nbsp;
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default LoginPage;
