import React from 'react';
import { User, Users, Monitor, Clock, MapPin, CheckCircle, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: User,
      title: "1-on-1 Personal Training",
      description: "Personalized coaching tailored to your specific goals and athletic needs",
      features: [
        "Customized training programs",
        "Technique refinement",
        "Performance analysis",
        "Injury prevention",
        "Nutrition guidance"
      ],
      price: "TBD",
      duration: "60 minutes",
      location: "In-person",
      popular: false
    },
    {
      icon: Users,
      title: "Team Classes",
      description: "High-energy team training sessions with sport-specific conditioning",
      features: [
        "Small team training (4-8 athletes)",
        "General sport-specific conditioning",
        "Team building exercises",
        "Competitive environment",
        "Peer motivation"
      ],
      price: "Price TBD",
      duration: "45 minutes",
      location: "Studio & Outdoor",
      popular: false
    },
    {
      icon: Users,
      title: "Runner's S&C",
      description: "Specialized strength & conditioning program for long distance runners",
      features: [
        "Running-specific strength training",
        "Injury prevention protocols", 
        "Running economy improvement",
        "Core stability & mobility work",
        "Performance tracking"
      ],
      price: "Price TBD",
      duration: "60 minutes",
      location: "Studio & Outdoor",
      popular: false
    },
    {
      icon: Monitor,
      title: "Online Programs - Coming soon",
      description: "",
      features: [],
      price: "",
      duration: "",
      location: "",
      popular: false
    }
  ];

  const additionalServices = [
    {
      title: "Service placeholder",
      description: "Service description placeholder",
      icon: "🔧"
    },
    {
      title: "Service placeholder",
      description: "Service description placeholder",
      icon: "🔧"
    },
    {
      title: "Service placeholder",
      description: "Service description placeholder",
      icon: "🔧"
    },
    {
      title: "Service placeholder",
      description: "Service description placeholder",
      icon: "🔧"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Training Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the training format that fits your schedule, goals, and learning style. 
            All programs are designed by certified coaches with proven results.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
              service.popular ? 'ring-2 ring-orange-500 transform scale-105' : ''
            }`}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={16} />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg mr-4">
                    <service.icon size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    {service.title === "Online Programs - Coming soon" ? (
                      <div className="text-3xl font-bold text-gray-600 mt-4">Coming Soon</div>
                    ) : (
                      <p className="text-orange-600 font-semibold">{service.price}</p>
                    )}
                  </div>
                </div>
                
                {service.title !== "Online Programs - Coming soon" && (
                  <p className="text-gray-600 mb-6">{service.description}</p>
                )}
                
                {service.title !== "Online Programs - Coming soon" && (
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {service.duration}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {service.location}
                    </div>
                  </div>
                )}
                
                {service.title !== "Online Programs - Coming soon" && (
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {service.title !== "Online Programs - Coming soon" && (
                  <button 
                    onClick={scrollToContact}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      service.popular 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Training?</h3>
            <p className="text-xl mb-6 opacity-90">
              Book your free consultation and let's create a training plan that works for you.
            </p>
            <button 
              onClick={scrollToContact}
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;