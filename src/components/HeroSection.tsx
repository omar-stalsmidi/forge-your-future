import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import heroImage from "@/assets/hero-construction.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Star, Zap } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const stats = [
  { icon: Users, value: "500+", label: "Members" },
  { icon: Star, value: "Free", label: "To Join" },
  { icon: Zap, value: "24/7", label: "Community" },
];

/* Rotating metallic ring */
function MetalRing({ radius = 2.2, tube = 0.06 }: { radius?: number; tube?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.z += delta * 0.1;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 32, 100]} />
      <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.2} />
    </mesh>
  );
}

/* Floating glass-like sphere */
function GlassSphere({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.35, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.5}
          chromaticAberration={0.3}
          anisotropy={0.5}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.2}
          ior={1.5}
          color="#d4a017"
          transmission={0.95}
        />
      </mesh>
    </Float>
  );
}

/* Floating particles */
function Particles({ count = 60 }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#d4a017" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* Main 3D Scene */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffd699" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#d4a017" />

      {/* Orbiting rings */}
      <MetalRing radius={2.5} tube={0.04} />
      <group rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <MetalRing radius={3} tube={0.03} />
      </group>
      <group rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <MetalRing radius={3.5} tube={0.025} />
      </group>

      {/* Glass spheres */}
      <GlassSphere position={[1.8, 1.2, 0]} />
      <GlassSphere position={[-2, -0.8, 1]} />
      <GlassSphere position={[0.5, -1.5, -1]} />

      {/* Particles */}
      <Particles />

      <Environment preset="city" />
    </>
  );
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Construction site at sunset with cranes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
      </div>

      {/* 3D Canvas overlay — right side */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ pointerEvents: "none" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase text-sm font-bold tracking-[0.2em]">
              Free Community
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-6"
          >
            <span className="text-foreground block">STOP BUILDING</span>
            <span className="text-foreground block">SOMEONE ELSE'S</span>
            <span className="text-gradient block mt-1">FUTURE.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
          >
            The blueprint for tradesmen who are done waiting.
            <span className="text-foreground font-semibold"> Learn to launch, grow, and scale </span>
            a trades business that actually works for you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl">
                Join Forge — It's Free <ArrowRight className="ml-2 !size-5" />
              </Button>
            </a>
            <a href="#who">
              <Button variant="heroOutline" size="xl">
                See If It's For You
              </Button>
            </a>
          </motion.div>

          {/* Social proof stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-8 items-center"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
