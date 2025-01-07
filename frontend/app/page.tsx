import { Navbar } from "../components/Navbar";
import { Globe, Server } from "lucide-react";
import grid from "../public/Grid.png";
import AddConnection from "../components/AddConnection";
import Image from 'next/image'
import { FlipWords } from "@/components/ui/flip-words";


const Index = () => {

  const words = ["Manage", "Oversee", "Track"];

  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${grid.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div><svg
      xmlns="http://www.w3.org/2000/svg"
      width="1728"
      height="1180"
      viewBox="0 0 1728 1180"
      fill="currentColor"
      className="absolute w-full max-h-screen -top-72 pointer-events-none opacity-60"
    >
      <g filter="url(#filter0_f_226_149)">
        <path
          d="M2123.75 293.105C1333.23 688.128 703.641 515.327 508.724 374.099C452.243 349.269 313.169 228.867 73.6286 197.922C-225.797 159.242 110.578 663.582 380.092 782.356C649.606 901.131 1580.73 925.224 2029.92 784.99C2601.98 606.399 3111.92 -200.674 2123.75 293.105Z"
          fill="url(#paint0_radial_226_149)"
          fillOpacity="0.45"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_226_149"
          x="-342.14"
          y="-163"
          width="3323.17"
          height="1342.42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="149.181" result="effect1_foregroundBlur_226_149" />
        </filter>
        <radialGradient
          id="paint0_radial_226_149"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(2522.36 771.207) rotate(-178.79) scale(2230.36 879.25)"
        >
          <stop stopColor="#6248FF" />
          <stop offset="0.369278" stopColor="#E5FF48" />
          <stop offset="0.588842" stopColor="#FF48ED" />
          <stop offset="0.708333" stopColor="#48BDFF" />
          <stop offset="0.932292" stopColor="#6248FF" />
        </radialGradient>
      </defs>
    </svg>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
          <AddConnection />
            <div className="flex justify-center mb-8">
              <Image
                  src="/syseye.png"
                  alt="SysEye Logo"
                  width={100}
                  height={100}
                quality={100}
                />
            </div>
            
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                <FlipWords words={words} /> 
                 Your Global Infrastructure
              </h1>
            
            <p className="text-lg font-thin sm:text-xl text-gray-300">
              Real-time visualization of your system connections across the world
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
                <Server className="w-8 h-8 text-purple-500 mb-4 center" />
                <h3 className="text-xl font-semibold mb-2">Server Monitoring</h3>
                <p className="text-gray-400">Track server performance and health metrics in real-time</p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
                <Globe className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
                <p className="text-gray-400">Monitor systems across multiple regions and data centers</p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
                <Server className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Alerts</h3>
                <p className="text-gray-400">Instant notifications when systems need attention</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;