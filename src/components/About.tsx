import React from 'react';
import { Award, Target, Users, Heart, CheckCircle } from 'lucide-react';

const About = () => {
  const achievements = [
    "美國肌力與體能協會 - 體能訓練專家認證 (NSCA-CSCS)",
    "美國運動醫學學院 - 私人教練認證 (ACSM-CPT)",
    "香港浸會大學體育及康樂管理學士",
    "澳洲伊迪斯科文大學碩士 - 運動科學 肌力及體適能專項",
    "香港手球代表隊"
  ];

  const values = [
    {
      icon: Target,
      title: "Performance Excellence",
      description: "We're committed to helping every athlete reach their highest potential through proven training methodologies."
    },
    {
      icon: Users,
      title: "Personalized Approach",
      description: "Every athlete is unique. We create customized training programs that fit your specific goals and needs."
    },
    {
      icon: Heart,
      title: "Passion for Sports",
      description: "Our love for athletics drives everything we do. We believe in the transformative power of sport."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Our track record speaks for itself - 95% of our athletes see measurable performance improvements."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meet Your <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Coach</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about the passion, expertise, and dedication behind Sportlight Athletic Coaching.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Coach Profile */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 mr-6 border-4 border-white/20 flex items-center justify-center">
                  <span className="text-white/60 text-xs">Photo</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">袁晞彥教練 (Mo Sir)</h3>
                  <p className="text-orange-100">SPORTlight創辦人</p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 text-orange-50">
                "作為前香港手球代表隊成員，我深深明白成功不僅僅是天賦，更需要正確的訓練方法、心態和堅持不懈的努力。
                憑藉運動科學的專業知識和豐富的實戰經驗，我創立了SPORTlight，希望幫助新一代運動員實現他們的夢想，
                發揮最大潛能。"
              </p>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                    <span className="text-orange-50">{achievement}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-orange-300/30">
                <p className="text-orange-100 text-sm">
                  香港浸會大學持續進修學院 - 體適能導師證書課程講師
                </p>
              </div>
            </div>
          </div>

          {/* Coach Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="w-full h-[450px] lg:h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="/WhatsApp%20Image%202025-09-26%20at%2009.05.38_a2e2068f.jpg" 
                  alt="Mo Sir - Lead Coach" 
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">XXX</div>
                  <div className="text-gray-600 text-sm">Stat placeholder</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">X+</div>
                  <div className="text-gray-600 text-sm">Stat placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <value.icon size={24} className="text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto text-gray-300">
            To empower athletes of all levels to unlock their full potential through expert coaching, 
            personalized training programs, and unwavering support. We believe that with the right guidance, 
            every athlete can achieve greatness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;