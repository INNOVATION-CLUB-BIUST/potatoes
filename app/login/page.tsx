import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6 md:p-10 overflow-hidden font-pixel-circle">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/image5.png"
          alt="Background"
          fill
          priority
          className="object-cover blur-[10px] opacity-100 scale-110" // High blur, low opacity for aesthetic
        />
        <div className="absolute inset-0" /> {/* Layer to soften the image further */}
      </div>

      <div className="relative w-full max-w-lg z-10">
        <LoginForm />
      </div>
    </div>
  )
}
