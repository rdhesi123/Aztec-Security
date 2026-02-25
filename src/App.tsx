import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Services from './pages/Services';
import About from './pages/About';

gsap.registerPlugin(ScrollTrigger);

const NoiseOverlay = () => (
  <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-5" style={{ mixBlendMode: 'overlay' }}>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolledStyle = scrolled || !isHome;

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between w-[90%] max-w-4xl ${isScrolledStyle ? 'bg-[#F4F2EE]/80 backdrop-blur-xl border border-[#1E2A38]/10 text-[#1E2A38] shadow-lg' : 'bg-transparent text-[#F4F2EE] border-transparent'}`}>
      <Link to="/" className="font-heading font-bold text-xl tracking-tight">Aztec Security</Link>
      <div className="hidden md:flex items-center gap-8 font-subheading text-sm font-medium">
        <Link to="/services" className="hover:-translate-y-[1px] transition-transform">Services</Link>
        <Link to="/about" className="hover:-translate-y-[1px] transition-transform">About</Link>
      </div>
      <button className={`magnetic-btn px-5 py-2 rounded-full font-heading font-semibold text-sm transition-colors ${isScrolledStyle ? 'bg-[#D95C2B] text-[#F4F2EE]' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'}`}>
        <span className="bg-layer"></span>
        <span className="content">Get Quote</span>
      </button>
    </nav>
  );
};

const Hero = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" alt="Modern Vancouver Home" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#1E2A38]/80 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-5xl w-full">
        <h1 className="flex flex-col">
          <span className="font-heading font-bold text-4xl md:text-6xl text-[#F4F2EE] tracking-tight hero-text">Protection built into</span>
          <span className="font-drama italic text-7xl md:text-[10rem] leading-[0.8] text-[#D95C2B] mt-2 hero-text">Architecture.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-[#F4F2EE]/80 max-w-xl font-subheading font-light hero-text">
          Aztec Security — professional low voltage security and alarm systems for new homes across Greater Vancouver, BC.
        </p>
        <div className="mt-10 hero-text">
          <button className="magnetic-btn bg-[#D95C2B] text-[#F4F2EE] px-8 py-4 rounded-full font-heading font-semibold tracking-wide flex items-center gap-2">
            <span className="bg-layer"></span>
            <span className="content">Request a free quote</span>
            <ArrowRight className="w-5 h-5 content" />
          </button>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = ["Access Control", "CCTV Surveillance", "Intrusion Detection"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F4F2EE] rounded-[2rem] p-8 shadow-sm border border-[#1E2A38]/5 h-80 flex flex-col relative overflow-hidden">
      <h3 className="font-heading font-bold text-xl text-[#1E2A38]">Licensed Experts</h3>
      <p className="font-subheading text-sm text-[#141414]/60 mt-2">Certified low voltage integration.</p>
      <div className="flex-1 relative mt-8">
        {items.map((item, idx) => {
          const offset = (idx - activeIndex + items.length) % items.length;
          const isVisible = offset < 3;
          return (
            <div
              key={item}
              className="absolute w-full bg-white border border-[#1E2A38]/10 rounded-xl p-4 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                top: isVisible ? `${offset * 20}px` : '100%',
                transform: `scale(${1 - offset * 0.05})`,
                opacity: isVisible ? 1 - offset * 0.3 : 0,
                zIndex: 10 - offset
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-data text-xs text-[#1E2A38] font-medium">{item}</span>
                <div className="w-2 h-2 rounded-full bg-[#D95C2B]" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const messages = [
    "INITIATING PRE-WIRE PROTOCOL...",
    "ROUGH-IN COMPLETE. VERIFYING DROPS.",
    "COMMISSIONING ALARM PANEL...",
    "SYSTEM ACTIVE. HANDOVER READY."
  ];
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    let currentText = "";
    let charIndex = 0;
    const targetText = messages[msgIndex];

    const typeInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        currentText += targetText[charIndex];
        setText(currentText);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [msgIndex]);

  return (
    <div className="bg-[#F4F2EE] rounded-[2rem] p-8 shadow-sm border border-[#1E2A38]/5 h-80 flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-xl text-[#1E2A38]">End-to-end Integration</h3>
        <div className="flex items-center gap-2 bg-[#1E2A38]/10 px-3 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D95C2B] animate-pulse" />
          <span className="font-data text-[10px] text-[#1E2A38] uppercase font-semibold">Live Feed</span>
        </div>
      </div>
      <p className="font-subheading text-sm text-[#141414]/60 mt-2">Seamless new build execution.</p>
      <div className="flex-1 mt-8 bg-[#141414] rounded-xl p-4 border border-[#1E2A38]/10 font-data text-xs text-[#D95C2B] leading-relaxed overflow-hidden">
        <p className="text-[#F4F2EE]/40 mb-2">{`> AZTEC_SYS_LOG v2.4`}</p>
        <p>{`> ${text}`}<span className="animate-pulse">_</span></p>
      </div>
    </div>
  );
};

const CursorProtocolScheduler = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(cursorRef.current, { x: 0, y: 100, opacity: 0 });
      tl.to(cursorRef.current, { x: 120, y: 30, opacity: 1, duration: 1, ease: "power2.out" });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onStart: () => setActiveDay(3) });
      tl.to(cursorRef.current, { x: 150, y: 120, duration: 0.8, ease: "power2.inOut", delay: 0.5 });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
      tl.to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.2 });
      tl.to({}, { duration: 0.5, onComplete: () => setActiveDay(null) });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F4F2EE] rounded-[2rem] p-8 shadow-sm border border-[#1E2A38]/5 h-80 flex flex-col relative overflow-hidden">
      <h3 className="font-heading font-bold text-xl text-[#1E2A38]">24/7 Monitored Systems</h3>
      <p className="font-subheading text-sm text-[#141414]/60 mt-2">Always-on protection.</p>
      <div className="flex-1 mt-8 relative">
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => (
            <div key={i} className={`aspect-square rounded-md flex items-center justify-center font-data text-xs transition-colors duration-300 ${activeDay === i ? 'bg-[#D95C2B] text-white' : 'bg-white text-[#1E2A38]/40 border border-[#1E2A38]/10'}`}>
              {d}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
           <div className="px-4 py-2 rounded-full border border-[#1E2A38]/20 text-xs font-heading font-semibold text-[#1E2A38] bg-white">
             Schedule Install
           </div>
        </div>
        <svg ref={cursorRef} className="absolute top-0 left-0 w-6 h-6 z-10 drop-shadow-md" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.75 21.36L11.44 17.02C11.68 16.8 11.99 16.68 12.32 16.68H19.5C20.18 16.68 20.55 15.89 20.1 15.38L5.5 3.21Z" fill="#141414"/>
        </svg>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <DiagnosticShuffler />
      <TelemetryTypewriter />
      <CursorProtocolScheduler />
    </div>
  </section>
);

const Philosophy = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".philosophy-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.from(".philosophy-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 80%"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy-section relative w-full py-32 bg-[#141414] overflow-hidden text-[#F4F2EE]">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1506526615714-7220e210137b?q=80&w=2069&auto=format&fit=crop" alt="Concrete Texture" className="w-full h-full object-cover philosophy-bg scale-110" referrerPolicy="no-referrer" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16">
        <p className="font-subheading text-xl md:text-2xl text-[#F4F2EE]/60 mb-8 max-w-2xl philosophy-text">
          Most security contractors focus on retrofitting systems after the fact, offering one-size-fits-all installs.
        </p>
        <p className="font-drama italic text-5xl md:text-7xl leading-tight philosophy-text">
          We focus on building <span className="text-[#D95C2B]">protection</span> into the structure from day one.
        </p>
      </div>
    </section>
  );
};

const ProtocolSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card') as HTMLElement[];
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(20px)",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Site Assessment & Pre-Wire",
      desc: "Planning during construction. We map out every drop, sensor, and panel location before the drywall goes up.",
      Visual: () => (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-48 h-48 animate-[spin_20s_linear_infinite]">
            <div className="absolute inset-0 border border-[#1E2A38]/20 rounded-full" />
            <div className="absolute inset-4 border border-[#1E2A38]/40 rounded-full" />
            <div className="absolute inset-8 border border-[#D95C2B]/60 rounded-full border-dashed" />
            <div className="absolute inset-1/2 w-2 h-2 -ml-1 -mt-1 bg-[#1E2A38] rounded-full" />
          </div>
        </div>
      )
    },
    {
      num: "02",
      title: "Low Voltage Rough-In",
      desc: "Precision cabling and device installation. Clean runs, labeled wires, and architectural alignment.",
      Visual: () => (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <div className="grid grid-cols-8 gap-2 w-64 h-64 opacity-20">
            {Array.from({length: 64}).map((_, i) => <div key={i} className="bg-[#1E2A38] rounded-sm" />)}
          </div>
          <div className="absolute top-0 bottom-0 w-full flex flex-col justify-center animate-[pulse_3s_ease-in-out_infinite]">
             <div className="w-full h-0.5 bg-[#D95C2B] shadow-[0_0_15px_#D95C2B]" />
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Commissioning & Handover",
      desc: "System testing, network integration, and client onboarding. A fully operational fortress.",
      Visual: () => (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-64 h-32 stroke-[#D95C2B]" fill="none" strokeWidth="2" viewBox="0 0 200 100">
            <path className="animate-[dash_2s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" d="M0,50 L50,50 L60,20 L70,80 L80,50 L200,50" />
          </svg>
          <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
        </div>
      )
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#1E2A38] py-24">
      <div className="max-w-5xl mx-auto px-8 md:px-16 mb-16">
        <h2 className="font-heading font-bold text-4xl text-[#F4F2EE]">Installation Protocol</h2>
      </div>
      <div className="relative">
        {steps.map((step, i) => (
          <div key={i} className="protocol-card sticky top-24 h-[70vh] w-full max-w-5xl mx-auto px-8 md:px-16 mb-24 flex items-center">
            <div className="bg-[#F4F2EE] w-full h-full rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 shadow-2xl overflow-hidden border border-white/10">
              <div className="flex-1 flex flex-col justify-center">
                <span className="font-data text-6xl text-[#1E2A38]/20 font-bold mb-6">{step.num}</span>
                <h3 className="font-heading font-bold text-3xl text-[#1E2A38] mb-4">{step.title}</h3>
                <p className="font-subheading text-lg text-[#141414]/70 max-w-md">{step.desc}</p>
              </div>
              <div className="flex-1 bg-[#141414]/5 rounded-[2rem] relative overflow-hidden">
                <step.Visual />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const GetStarted = () => (
  <section className="py-32 bg-[#F4F2EE] text-center px-8">
    <div className="max-w-3xl mx-auto">
      <h2 className="font-heading font-bold text-5xl md:text-7xl text-[#1E2A38] tracking-tight mb-6">Get Protected</h2>
      <p className="font-subheading text-xl text-[#141414]/70 mb-12">
        Specializing in new home construction across Greater Vancouver.<br/>
        Secure your property from the ground up.
      </p>
      <button className="magnetic-btn bg-[#D95C2B] text-[#F4F2EE] px-10 py-5 rounded-full font-heading font-semibold text-lg tracking-wide inline-flex items-center gap-3 shadow-lg shadow-[#D95C2B]/20">
        <span className="bg-layer"></span>
        <span className="content">Request a free quote</span>
        <ArrowRight className="w-5 h-5 content" />
      </button>
      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-data text-[#1E2A38]/50">
        <span>Licensed & Insured</span>
        <span>·</span>
        <span>Greater Vancouver</span>
        <span>·</span>
        <span>New Home Specialists</span>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#141414] text-[#F4F2EE] rounded-t-[4rem] pt-24 pb-12 px-8 md:px-16 mt-[-4rem] relative z-10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-2">
        <h3 className="font-heading font-bold text-2xl mb-4">Aztec Security</h3>
        <p className="font-subheading text-[#F4F2EE]/60 max-w-sm">
          Professional low voltage security and alarm systems for new homes across Greater Vancouver, BC.
        </p>
      </div>
      <div>
        <h4 className="font-data text-xs text-[#F4F2EE]/40 uppercase mb-6">Navigation</h4>
        <ul className="space-y-3 font-subheading text-[#F4F2EE]/80">
          <li><Link to="/services" className="hover:text-[#D95C2B] transition-colors">Services</Link></li>
          <li><Link to="/about" className="hover:text-[#D95C2B] transition-colors">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#D95C2B] transition-colors">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-data text-xs text-[#F4F2EE]/40 uppercase mb-6">Legal</h4>
        <ul className="space-y-3 font-subheading text-[#F4F2EE]/80">
          <li><a href="#" className="hover:text-[#D95C2B] transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-[#D95C2B] transition-colors">Terms of Service</a></li>
          <li><a href="#" className="hover:text-[#D95C2B] transition-colors">Licensing</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3 bg-[#1E2A38]/50 px-4 py-2 rounded-full border border-white/5">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-data text-xs text-[#F4F2EE]/70">AZTEC SECURITY ONLINE</span>
      </div>
      <p className="font-subheading text-sm text-[#F4F2EE]/40">© {new Date().getFullYear()} Aztec Security. All rights reserved.</p>
    </div>
  </footer>
);

const Home = () => (
  <>
    <Hero />
    <Features />
    <Philosophy />
    <ProtocolSection />
    <GetStarted />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-[#F4F2EE] selection:bg-[#D95C2B] selection:text-white flex flex-col">
        <NoiseOverlay />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
