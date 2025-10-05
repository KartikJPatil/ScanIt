import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Scan, 
  Blocks, 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Eye,
  Lock
} from "lucide-react";
import heroNeuralBg from "@/assets/hero-neural-bg.jpg";
import aiBrainIso from "@/assets/ai-brain-iso.jpg";
import blockchainCube from "@/assets/blockchain-cube.jpg";
import securityShield from "@/assets/security-shield.jpg";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Detection",
    description: "State-of-the-art neural networks with 94%+ accuracy in distinguishing AI-generated from human-written content.",
    image: aiBrainIso
  },
  {
    icon: Blocks,
    title: "Blockchain Verification",
    description: "Immutable records on distributed ledger ensuring permanent provenance and transparent verification history.",
    image: blockchainCube
  },
  {
    icon: Shield,
    title: "Zero Trust Security",
    description: "End-to-end encryption and cryptographic verification protecting data integrity and user privacy.",
    image: securityShield
  }
];

const stats = [
  { label: "Verifications Processed", value: "2.1M+", icon: Scan },
  { label: "Accuracy Rate", value: "94.2%", icon: Eye },
  { label: "Blockchain Records", value: "450K+", icon: Blocks },
  { label: "Enterprise Partners", value: "120+", icon: Lock }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroNeuralBg} 
            alt="Neural Network Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 neural-background opacity-20" />
        
        {/* Content */}
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Badge */}
            <Badge 
              variant="outline" 
              className="mb-8 px-4 py-2 text-sm border-primary/30 bg-background/50 backdrop-blur-sm animate-hologram-flicker"
            >
              <Zap className="w-4 h-4 mr-2" />
              AI + Blockchain Powered Framework
            </Badge>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="holographic-text">Redefining</span>
              <br />
              <span className="text-foreground">Digital Truth</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              The future of content authenticity. Detect AI-generated content with precision 
              and create immutable verification records on the blockchain.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/verify">
                <Button 
                  size="lg" 
                  className="neon-border bg-gradient-primary hover:shadow-neon transition-all duration-300 px-8 py-4 text-lg"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Start Verification
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/explorer">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 hover:bg-primary/10 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Blocks className="w-5 h-5 mr-2" />
                  Explore Blockchain
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Next-Generation</span> Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on cutting-edge AI and blockchain infrastructure to deliver 
              unparalleled accuracy and transparency in content verification.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="glass-panel p-8 text-center hover:shadow-neural transition-all duration-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Image */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Icon & Title */}
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Learn More */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10 group-hover:border-primary/60 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-gradient-neural">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Seamless <span className="holographic-text">Verification Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to verify content authenticity and create permanent records.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Submit Content",
                description: "Upload or paste your text content for analysis through our secure interface."
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Advanced neural networks process and analyze content patterns with precision."
              },
              {
                step: "03",
                title: "Blockchain Record",
                description: "Verification results are permanently stored on the immutable blockchain ledger."
              }
            ].map((item, index) => (
              <div 
                key={item.step}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mb-6 mx-auto animate-neural-pulse">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <Card className="glass-panel p-12 md:p-16 text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-8">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Secure <span className="holographic-text">Digital Truth?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join the future of content authenticity verification. 
                Experience the power of AI and blockchain working together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/verify">
                  <Button 
                    size="lg"
                    className="neon-border bg-gradient-primary hover:shadow-neon transition-all duration-300 px-8 py-4 text-lg"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Get Started Now
                  </Button>
                </Link>
                
                <Link to="/about">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:bg-primary/10 px-8 py-4 text-lg"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}