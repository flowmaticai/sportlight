import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Athlete <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real athletes, real results. See how our coaching has helped athletes achieve their goals and reach new heights.
          </p>
        </div>

        {/* Testimonials content to be added */}
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-2xl p-12">
            <p className="text-gray-500 text-lg">
              Athlete success stories will be added here.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;