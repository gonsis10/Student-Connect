import React from 'react';
import { ArrowRight, Users, Heart, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/ui/Navbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl font-custom">
            About Us
          </h1>
          <div className="h-1 w-20 bg-sky-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 font-custom">
            Connecting hearts and minds through meaningful conversations
          </p>
        </div>

        {/* Mission Card */}
        <Card className="mb-12 border-none shadow-lg bg-white/50 backdrop-blur">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Welcome to our Peer-to-Peer Video Chat app! Born during{' '}
              <span className="text-sky-500 font-semibold">nwHacks</span>, we&#39;re four passionate
              first-year students united by a vision to make meaningful connections more accessible.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              We recognize how daunting it can be to reach out, which is why we crafted this platform
              to empower students with anxiety to connect with others in a safe, supportive environment.
            </p>
          </CardContent>
        </Card>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-custom">Built for Connection</h3>
            <p className="text-gray-600">
              Facilitating one-on-one video chats with thoughtfully curated prompts for genuine conversations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-custom">Safe Space</h3>
            <p className="text-gray-600">
              Creating an experience that turns connection into a tool for growth and comfort.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center mb-6">
            <Coffee className="h-6 w-6 text-sky-400 mr-3" />
            <h2 className="text-2xl font-semibold font-custom">Built with Purpose</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-sky-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Created during an intense 2-day hackathon – fueled by coffee, collaboration, and a shared vision.</p>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-sky-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Designed to prioritize simplicity, accessibility, and meaningful interaction.</p>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-sky-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Focused on helping students overcome social barriers with thoughtful tools and empathetic design.</p>
            </li>
          </ul>
        </div>

        {/* Footer Quote */}
        <div className="text-center">
          <p className="text-lg text-gray-600 italic font-custom">
            &#34;Together, we aim to inspire connection, understanding, and community in an increasingly disconnected world.&#34;
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;