import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-hero-start to-hero-end px-4 py-12">
      <SignUp />
    </div>
  );
}
