import type React from 'react';
import FeatureCard from './FeatureCard';
import { GraduationCap, Clipboard, Handshake, ShieldCheck, BrainCircuit, Lightbulb } from 'lucide-react';

const featureCategories = [
  {
    icon: GraduationCap,
    title: '👨‍🎓 Student Features',
    features: [
      'Join live lectures',
      'Choose voice language',
      'View/download lessons',
      'Track assignments',
      'Live chat/comments on lessons',
      'Peer-to-peer discussion forums',
      'Course feedback & ratings',
    ],
  },
  {
    icon: Clipboard, // Corrected from ClipboardUser
    title: '🧑‍🏫 Lecturer Features',
    features: [
      'Create courses',
      'Host live sessions (video/audio)',
      'Upload materials',
      'Assignments/quizzes',
      'Moderate comments',
      'Track student performance',
      'Export grades',
    ],
  },
  {
    icon: Handshake,
    title: '🏢 Business/Partner Features',
    features: [
      'List scholarship or internship opportunities',
      'Sponsor data plans or courses',
      'Marketplace for verified learning tools',
      'Analytics dashboard for engagement',
    ],
  },
  {
    icon: ShieldCheck,
    title: '🔐 Admin Features',
    features: [
      'Add/manage institutions',
      'Verify lecturer accounts',
      'Control platform content',
      'Approve businesses',
      'Access analytics dashboard',
      'Domain-based login only (@klasafrica.com)',
    ],
  },
  {
    icon: BrainCircuit,
    title: '🤖 AI-Powered Features',
    description: ( // Changed to use description prop directly for complex content
      <>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li><strong>Live AI Voice Translation:</strong> Real-time voice change during live lectures (via Whisper + TTS)</li>
          <li><strong>Auto Transcription:</strong> Auto-generate transcripts of lectures</li>
          <li><strong>Smart Summaries:</strong> Convert long lectures into bullet-point summaries</li>
          <li><strong>Auto Language Switching:</strong> Translate content to student’s chosen language (voice/text)</li>
          <li><strong>Learning Analytics:</strong> Recommend courses, flag struggling students</li>
        </ul>
      </>
    ),
  },
  {
    icon: Lightbulb,
    title: '💡 Unique Selling Points',
    features: [
      'Built for African universities (language, network, cost-aware).',
      'Integrated AI tools to make learning easier.',
      'Connects students, lecturers, and businesses in one ecosystem.',
      'Admins secured by domain-based access only.',
    ],
  },
];

const FeatureHighlightsSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Explore <span className="text-primary">KlasAfrica</span>'s Comprehensive Features
        </h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Discover how KlasAfrica empowers students, lecturers, businesses, and administrators with cutting-edge tools and AI-driven solutions designed for the African educational landscape.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCategories.map((category) => (
            <FeatureCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={
                category.description ? category.description : (
                  <ul className="list-disc list-inside space-y-1">
                    {category.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightsSection;
