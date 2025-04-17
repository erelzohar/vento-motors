import React from 'react';

export function Testimonials() {
  return (
    <section className="relative py-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">מה הלקוחות אומרים</h2>
          <div className="h-1 w-24 bg-sunset mx-auto rounded-full"></div>
        </div>

        <div className="relative widget-container overflow-hidden">
          <div className="elfsight-app-cc630dad-0dd6-4e7c-97a3-1efe801504b1 w-full" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
}