import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Shield, Brain, Blocks, Github, ExternalLink } from "lucide-react";
import securityShield from "@/assets/security-shield.jpg";
import aiBrainIso from "@/assets/ai-brain-iso.jpg";
import blockchainCube from "@/assets/blockchain-cube.jpg";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "AI Research Lead",
    bio: "Former researcher at MIT AI Lab, specializing in content authenticity detection."
  },
  {
    name: "Marcus Rodriguez",
    role: "Blockchain Architect", 
    bio: "Ethereum core contributor with 8+ years in distributed systems."
  },
  {
    name: "Elena Vasquez",
    role: "Security Engineer",
    bio: "Cybersecurity expert with focus on cryptographic verification systems."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <Info className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">About ScanIt</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pioneering the future of digital trust through AI-powered content verification 
              and immutable blockchain records
            </p>
          </div>

          {/* Mission */}
          <section className="mb-20">
            <Card className="glass-panel p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 holographic-text">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In an era where AI-generated content is becoming indistinguishable from human creation, 
                ScanIt serves as the definitive source of truth. We combine cutting-edge artificial 
                intelligence with immutable blockchain technology to create an open, transparent, 
                and verifiable system for content authenticity.
              </p>
            </Card>
          </section>

          {/* Technology Stack */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 holographic-text">
              Technology Foundation
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* AI Detection */}
              <Card className="glass-panel p-8 text-center hover:shadow-neural transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={aiBrainIso} 
                    alt="AI Brain" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Advanced AI</h3>
                </div>
                <p className="text-muted-foreground">
                  State-of-the-art neural networks trained on diverse datasets 
                  to detect AI-generated content with 94%+ accuracy.
                </p>
              </Card>

              {/* Blockchain */}
              <Card className="glass-panel p-8 text-center hover:shadow-neural transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={blockchainCube} 
                    alt="Blockchain Cube" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Blocks className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">Blockchain</h3>
                </div>
                <p className="text-muted-foreground">
                  Immutable verification records stored on distributed ledger 
                  ensuring transparency and permanent provenance tracking.
                </p>
              </Card>

              {/* Security */}
              <Card className="glass-panel p-8 text-center hover:shadow-neural transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={securityShield} 
                    alt="Security Shield" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Zero Trust</h3>
                </div>
                <p className="text-muted-foreground">
                  End-to-end encryption and cryptographic verification 
                  ensuring data integrity and user privacy.
                </p>
              </Card>
            </div>
          </section>

          {/* Team */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 holographic-text">
              Leadership Team
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card 
                  key={member.name} 
                  className="glass-panel p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Open Source */}
          <section>
            <Card className="glass-panel p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
                  <Github className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-6 holographic-text">
                  Open Source Commitment
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  ScanIt is built on the principles of transparency and community collaboration. 
                  Our codebase is fully open source, enabling researchers, developers, and 
                  organizations worldwide to contribute, audit, and build upon our work.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                  <Button 
                    size="lg"
                    className="neon-border bg-gradient-primary hover:shadow-neon"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Documentation
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}