import React from 'react';
import { ArrowRight, Shield, Cpu, Network, Lock } from 'lucide-react';

const Services = () => {
  return (
    <div className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-3xl mb-16">
        <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1E2A38] tracking-tight mb-6">Our Services</h1>
        <p className="font-subheading text-xl text-[#141414]/70">
          Comprehensive low voltage security solutions designed for modern architecture. We integrate protection seamlessly into your new build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: <Shield className="w-8 h-8 text-[#D95C2B]" />,
            title: "Intrusion Detection",
            desc: "State-of-the-art alarm systems with perimeter protection, motion sensing, and glass break detection. Fully monitored 24/7."
          },
          {
            icon: <Cpu className="w-8 h-8 text-[#D95C2B]" />,
            title: "Access Control",
            desc: "Smart locks, biometric scanners, and keyless entry systems. Manage access to your property from anywhere in the world."
          },
          {
            icon: <Network className="w-8 h-8 text-[#D95C2B]" />,
            title: "CCTV Surveillance",
            desc: "High-definition IP camera networks with night vision, AI-powered object detection, and secure cloud or local storage."
          },
          {
            icon: <Lock className="w-8 h-8 text-[#D95C2B]" />,
            title: "Smart Home Integration",
            desc: "Tie your security system into your home automation. Control lighting, climate, and security from a single interface."
          }
        ].map((service, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#1E2A38]/5 hover:shadow-md transition-shadow">
            <div className="bg-[#F4F2EE] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#1E2A38] mb-4">{service.title}</h3>
            <p className="font-subheading text-[#141414]/70 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-[#1E2A38] rounded-[3rem] p-12 text-center text-[#F4F2EE]">
        <h2 className="font-heading font-bold text-4xl mb-6">Ready to secure your project?</h2>
        <p className="font-subheading text-lg text-[#F4F2EE]/70 mb-8 max-w-2xl mx-auto">
          Contact us today for a comprehensive site assessment and custom security proposal.
        </p>
        <button className="magnetic-btn bg-[#D95C2B] text-[#F4F2EE] px-8 py-4 rounded-full font-heading font-semibold tracking-wide inline-flex items-center gap-2">
          <span className="bg-layer"></span>
          <span className="content">Get a Quote</span>
          <ArrowRight className="w-5 h-5 content" />
        </button>
      </div>
    </div>
  );
};

export default Services;
