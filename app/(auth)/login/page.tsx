import AuthForm from "@/modules/auth/client/auth-form";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <AuthForm fromType="LOGIN" />
    </div>
  );
}
