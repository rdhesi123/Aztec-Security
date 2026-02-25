import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1E2A38] tracking-tight mb-8">About Aztec</h1>
          <p className="font-subheading text-xl text-[#141414]/70 mb-6 leading-relaxed">
            We are a team of licensed low voltage technicians specializing in new home construction across Greater Vancouver, BC.
          </p>
          <p className="font-subheading text-lg text-[#141414]/60 mb-8 leading-relaxed">
            Our philosophy is simple: security should be built into the architecture, not added as an afterthought. We work directly with builders, architects, and homeowners to design and install systems that are invisible, reliable, and impenetrable.
          </p>
          <div className="grid grid-cols-2 gap-8 border-t border-[#1E2A38]/10 pt-8">
            <div>
              <div className="font-heading font-bold text-4xl text-[#D95C2B] mb-2">15+</div>
              <div className="font-subheading text-sm text-[#141414]/60 uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="font-heading font-bold text-4xl text-[#D95C2B] mb-2">500+</div>
              <div className="font-subheading text-sm text-[#141414]/60 uppercase tracking-wider">Homes Secured</div>
            </div>
          </div>
        </div>
        <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1541888087525-ef745f18f6fc?q=80&w=2070&auto=format&fit=crop" 
            alt="Technician working on a security panel" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A38]/80 to-transparent mix-blend-multiply" />
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
            <h3 className="font-heading font-bold text-xl mb-2">Licensed & Insured</h3>
            <p className="font-subheading text-sm text-white/80">
              Fully certified for low voltage integration in British Columbia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
