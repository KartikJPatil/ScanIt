import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, BarChart3, Clock, TrendingUp } from "lucide-react";

const models = [
  {
    name: "FastDetectGPT",
    id: "fastdetectgpt",
    category: "Speed Optimized",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30",
    description: "Optimized for real-time detection with minimal computational overhead",
    features: [
      "Ultra-fast processing (< 100ms)",
      "Statistical token probability analysis",
      "Lightweight transformer architecture",
      "Optimized for batch processing"
    ],
    technicalDetails: {
      architecture: "Distilled BERT with custom probability layers",
      trainingData: "500M+ human/AI text pairs",
      accuracy: "85-92%",
      speed: "~50ms per 1000 tokens"
    },
    useCases: [
      "Real-time content moderation",
      "High-volume document processing",
      "API endpoints requiring fast response",
      "Mobile and edge device deployment"
    ]
  },
  {
    name: "DetectGPT",
    id: "detectgpt",
    category: "Gold Standard",
    icon: Target,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    description: "Industry-leading accuracy using advanced curvature-based analysis",
    features: [
      "Curvature-based detection algorithm",
      "Self-supervised perturbation analysis",
      "Multi-layer linguistic feature extraction",
      "Robust against adversarial attacks"
    ],
    technicalDetails: {
      architecture: "Transformer with curvature analysis layers",
      trainingData: "1B+ diverse text samples",
      accuracy: "92-97%",
      speed: "~200ms per 1000 tokens"
    },
    useCases: [
      "Academic research verification",
      "Legal document authentication",
      "High-stakes content validation",
      "Forensic text analysis"
    ]
  },
  {
    name: "GTLR",
    id: "gtlr",
    category: "Advanced Analysis",
    icon: Brain,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    description: "Graph-based Text Language Recognition with transformer architecture",
    features: [
      "Graph neural network integration",
      "Semantic relationship mapping",
      "Multi-modal text analysis",
      "Context-aware pattern recognition"
    ],
    technicalDetails: {
      architecture: "Hybrid Graph-Transformer with attention mechanisms",
      trainingData: "2B+ multilingual text corpus",
      accuracy: "90-95%",
      speed: "~300ms per 1000 tokens"
    },
    useCases: [
      "Creative content analysis",
      "Multi-language detection",
      "Complex document structures",
      "Semantic authenticity verification"
    ]
  }
];

export default function ModelDetails() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">AI Detection Models</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the three advanced AI models powering ScanIt's multi-layered content authenticity framework
            </p>
          </div>

          {/* Consensus Overview */}
          <Card className="glass-panel p-8 mb-12">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Consensus-Based Detection</h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mx-auto">
                ScanIt employs a sophisticated majority voting system where all three models analyze content independently. 
                The final decision is determined by consensus, with overall confidence calculated based on model agreement 
                and individual confidence scores. This approach significantly reduces false positives and increases reliability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Higher Accuracy</h3>
                  <p className="text-sm text-muted-foreground">Majority voting reduces individual model biases and errors</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Reduced False Positives</h3>
                  <p className="text-sm text-muted-foreground">Multiple perspectives minimize incorrect classifications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Balanced Performance</h3>
                  <p className="text-sm text-muted-foreground">Optimizes both speed and accuracy across different use cases</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Model Details */}
          <div className="space-y-8">
            {models.map((model, index) => {
              const IconComponent = model.icon;
              return (
                <Card key={model.id} className="glass-panel p-8 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full ${model.bgColor} flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 ${model.color}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{model.name}</h2>
                          <Badge className={`${model.bgColor} ${model.color} ${model.borderColor}`}>
                            {model.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-lg">{model.description}</p>

                    {/* Features & Technical Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                          <span>Key Features</span>
                        </h3>
                        <ul className="space-y-3">
                          {model.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full ${model.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Specifications */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-foreground">Architecture:</span>
                            <p className="text-sm text-muted-foreground">{model.technicalDetails.architecture}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-foreground">Training Data:</span>
                            <p className="text-sm text-muted-foreground">{model.technicalDetails.trainingData}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium text-foreground">Accuracy:</span>
                              <p className="text-sm text-muted-foreground">{model.technicalDetails.accuracy}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-foreground">Speed:</span>
                              <p className="text-sm text-muted-foreground">{model.technicalDetails.speed}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Optimal Use Cases</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {model.useCases.map((useCase, idx) => (
                          <div key={idx} className={`p-3 rounded-lg ${model.bgColor} ${model.borderColor} border`}>
                            <span className="text-sm font-medium">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Performance Comparison */}
          <Card className="glass-panel p-8 mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">Performance Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Model</th>
                    <th className="text-center py-3 px-4">Speed</th>
                    <th className="text-center py-3 px-4">Accuracy</th>
                    <th className="text-center py-3 px-4">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id} className="border-b border-border/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${model.color.replace('text-', 'bg-')}`} />
                          <span className="font-medium">{model.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">{model.technicalDetails.speed}</td>
                      <td className="text-center py-4 px-4">{model.technicalDetails.accuracy}</td>
                      <td className="text-center py-4 px-4">{model.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}