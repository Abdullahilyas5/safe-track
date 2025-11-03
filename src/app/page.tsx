'use client';

import Image from "next/image";
import landImage from "@/../public/jdkfsjksj.avif";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-4 max-h-screen bg-[#F9FAFB] px-6 md:px-20 py-16 overflow-hidden">
      
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Welcome to <span className="text-[#65A30D]">SafeTrack</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          SafeTrack helps parents stay connected and ensures children are safe wherever they go — 
          <span className="text-[#65A30D] font-semibold"> real-time tracking</span> that brings you 
          <span className="text-[#4d7c0f] font-medium"> peace of mind</span>.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button 
            onClick={()=>router.push('/Signup')}
            size="lg"
            className="bg-[#65A30D] hover:bg-[#4d7c0f] text-white text-lg px-8 py-5 rounded-xl shadow-md transition-transform hover:scale-[1.03]"
          >
            Sign up
          </Button>

          <Button 
            size="lg" 
            onClick={()=>router.push('/Signin')}
            variant="outline" 
            className="border-[#65A30D] text-[#65A30D] hover:bg-[#ecf9e5] text-lg px-8 py-5 rounded-xl transition-transform hover:scale-[1.03]"
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 relative w-full h-80 md:h-[85vh] mt-12 md:mt-0 rounded-[2rem] overflow-hidden shadow-2xl">
        <Image
          src={landImage}
          alt="SafeTrack child safety illustration"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Optional overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB]/30 to-transparent"></div>
      </div>
    </section>
  );
}
