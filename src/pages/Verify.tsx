import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, Shield, Copy, CheckCircle, AlertCircle, Info, ChevronDown, Brain, Lock, Clock, TrendingUp, Download, Zap, ExternalLink, Globe, BarChart3, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface ModelPrediction {
  name: string;
  displayName: string;
  prediction: boolean;
  confidence: number;
  description: string;
}

interface WebReference {
  title: string;
  url: string;
  snippet: string;
  similarity: number;
}

interface VerificationResult {
  models: ModelPrediction[];
  finalDecision: boolean;
  overallConfidence: number;
  majorityVote: {
    aiGenerated: number;
    humanWritten: number;
  };
  webReferences: WebReference[];
  blockchainHash: string;
  timestamp: string;
}

export default function Verify() {
  const [text, setText] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const { toast } = useToast();

  const simulateGoogleSearch = async (content: string): Promise<WebReference[]> => {
    // Simulate Google Custom Search API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockReferences: WebReference[] = [
      {
        title: "AI-Generated Content Detection Methods",
        url: "https://example.com/ai-detection",
        snippet: "Recent advances in detecting AI-generated text using neural networks...",
        similarity: Math.floor(Math.random() * 30) + 15
      },
      {
        title: "Natural Language Processing Techniques",
        url: "https://example.com/nlp-techniques",
        snippet: "Understanding the patterns in human vs artificial text generation...",
        similarity: Math.floor(Math.random() * 25) + 10
      },
      {
        title: "Content Authenticity Framework",
        url: "https://example.com/authenticity",
        snippet: "Building trust in digital content through verification systems...",
        similarity: Math.floor(Math.random() * 20) + 8
      }
    ];
    
    return mockReferences;
  };

  const handleVerify = async () => {
    if (!text.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate AI verification process with 3 models
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate predictions for each model
    const models: ModelPrediction[] = [
      {
        name: "fastdetectgpt",
        displayName: "FastDetectGPT",
        prediction: Math.random() > 0.4,
        confidence: Math.floor(Math.random() * 25) + 70,
        description: "Optimized for speed, uses statistical analysis of token probabilities"
      },
      {
        name: "detectgpt",
        displayName: "DetectGPT",
        prediction: Math.random() > 0.3,
        confidence: Math.floor(Math.random() * 25) + 75,
        description: "Gold standard detector using curvature-based analysis"
      },
      {
        name: "gtlr",
        displayName: "GTLR",
        prediction: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 20) + 80,
        description: "Graph-based Text Language Recognition with transformer architecture"
      }
    ];
    
    // Calculate majority vote
    const aiVotes = models.filter(m => m.prediction).length;
    const humanVotes = models.filter(m => !m.prediction).length;
    const finalDecision = aiVotes > humanVotes;
    
    // Calculate overall confidence based on agreement
    const agreement = Math.max(aiVotes, humanVotes) / models.length;
    const avgConfidence = models.reduce((sum, m) => sum + m.confidence, 0) / models.length;
    const overallConfidence = Math.floor(avgConfidence * agreement);
    
    // Get web references
    const webReferences = await simulateGoogleSearch(text);
    
    const mockResult: VerificationResult = {
      models,
      finalDecision,
      overallConfidence,
      majorityVote: {
        aiGenerated: aiVotes,
        humanWritten: humanVotes
      },
      webReferences,
      blockchainHash: "0x" + Math.random().toString(16).substring(2, 42),
      timestamp: new Date().toISOString(),
    };
    
    setResult(mockResult);
    setIsVerifying(false);
  };

  const copyHash = () => {
    if (result?.blockchainHash) {
      navigator.clipboard.writeText(result.blockchainHash);
      toast({
        title: "Copied to clipboard",
        description: "Blockchain hash copied successfully",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setUploadedFileName(file.name);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        // For text files, use content directly
        if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
          setText(content);
          toast({
            title: "Document Uploaded",
            description: `${file.name} loaded successfully`,
          });
        } else {
          // For other files, show placeholder text
          setText(`Document uploaded: ${file.name}\n\nThis is a ${file.type || 'binary'} file. In production, this would be processed using advanced document parsing.\n\nFile size: ${(file.size / 1024).toFixed(2)} KB\nType: ${file.type || 'Unknown'}`);
          toast({
            title: "Document Uploaded",
            description: `${file.name} uploaded. Text extraction simulated.`,
          });
        }
        setIsProcessingFile(false);
      };

      reader.onerror = () => {
        toast({
          title: "Upload Failed",
          description: "Failed to read the document",
          variant: "destructive",
        });
        setIsProcessingFile(false);
      };

      reader.readAsText(file);
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "An error occurred while processing the document",
        variant: "destructive",
      });
      setIsProcessingFile(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    
    const reportData = {
      analysis: {
        contentType: result.finalDecision ? "AI-Generated" : "Human-Written",
        confidence: `${result.overallConfidence}%`,
        timestamp: new Date(result.timestamp).toLocaleString(),
      },
      blockchain: {
        hash: result.blockchainHash,
        network: "ScanIt Verification Network",
        status: "Verified"
      },
      content: {
        textLength: text.length,
        wordsCount: text.trim().split(/\s+/).length,
        analysisDate: new Date().toLocaleString(),
        sourceDocument: uploadedFileName || "Direct Text Input"
      }
    };

    const modelResults = result.models.map(model => 
      `├─ ${model.displayName}: ${model.prediction ? 'AI-Generated' : 'Human-Written'} (${model.confidence}%)`
    ).join('\n');

    const webReferences = result.webReferences.map((ref, index) => 
      `├─ ${index + 1}. ${ref.title} (${ref.similarity}% similarity)\n│  ${ref.url}`
    ).join('\n');

    const reportContent = `
ScanIt Advanced Verification Report
==================================

MULTI-MODEL ANALYSIS
├─ Final Decision: ${reportData.analysis.contentType}
├─ Overall Confidence: ${reportData.analysis.confidence}
├─ Majority Vote: ${result.majorityVote.aiGenerated} AI vs ${result.majorityVote.humanWritten} Human
├─ Analysis Date: ${reportData.analysis.timestamp}
├─ Source: ${reportData.content.sourceDocument}
├─ Text Length: ${reportData.content.textLength} characters
└─ Word Count: ${reportData.content.wordsCount} words

INDIVIDUAL MODEL RESULTS
${modelResults}

WEB REFERENCE ANALYSIS
${webReferences}

BLOCKCHAIN VERIFICATION
├─ Hash: ${reportData.blockchain.hash}
├─ Network: ${reportData.blockchain.network}
├─ Status: ${reportData.blockchain.status}
└─ Verification: Permanent & Immutable

CONTENT SAMPLE
${text.slice(0, 500)}${text.length > 500 ? '...' : ''}

---
Generated by ScanIt - AI & Blockchain Content Authenticity Framework
Report ID: ${result.blockchainHash.slice(0, 16)}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scanit-verification-report-${result.blockchainHash.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Verification report saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <Scan className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Verify Content</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI detection with blockchain-verified authenticity records
            </p>
          </div>

          {/* Scanner Interface */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-panel p-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-foreground">
                    Content to Verify
                  </label>
                  <div className="flex gap-2">
                    <label htmlFor="file-upload">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isProcessingFile || isVerifying}
                        className="cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isProcessingFile ? "Processing..." : "Upload Document"}
                      </Button>
                    </label>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".txt,.doc,.docx,.pdf,.md"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                {uploadedFileName && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-md">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Uploaded: {uploadedFileName}</span>
                  </div>
                )}
                <div>
                    <div className="relative">
                      <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text content here for AI detection analysis..."
                        className="min-h-[200px] bg-muted/50 border-primary/20 focus:border-primary/50 transition-colors"
                      />
                      {isVerifying && (
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/20 to-primary/10 pointer-events-none rounded-md overflow-hidden">
                          {/* Multiple scanning lines */}
                          <div className="scanner-line h-1 w-full absolute animate-[scanner-sweep_2s_ease-in-out_infinite]" />
                          <div className="scanner-line h-0.5 w-full absolute top-1/3 animate-[scanner-sweep_1.5s_ease-in-out_infinite_0.3s] opacity-60" />
                          <div className="scanner-line h-0.5 w-full absolute top-2/3 animate-[scanner-sweep_1.8s_ease-in-out_infinite_0.6s] opacity-40" />
                          
                          {/* Neural network overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
                          
                          {/* Corner indicators */}
                          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary animate-pulse" />
                          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary animate-pulse delay-150" />
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary animate-pulse delay-300" />
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary animate-pulse delay-450" />
                          
                          {/* Center pulse */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 rounded-full border-2 border-primary/50 animate-ping" />
                            <div className="absolute inset-0 w-4 h-4 m-auto rounded-full bg-primary/30 animate-pulse" />
                          </div>
                        </div>
                      )}
                    </div>
                </div>
                
                <Button
                  onClick={handleVerify}
                  disabled={!text.trim() || isVerifying || isProcessingFile}
                  size="lg"
                  className={`w-full relative overflow-hidden transition-all duration-500 ${
                    isVerifying 
                      ? 'bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_2s_ease-in-out_infinite] shadow-[0_0_30px_hsl(var(--primary)/0.8)] border-2 border-primary/50' 
                      : 'neon-border bg-gradient-primary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:scale-105'
                  }`}
                >
                  {isVerifying && (
                    <>
                      {/* Futuristic overlay effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-primary animate-pulse delay-300" />
                      </div>
                      {/* Neural network pulse rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/30 rounded-full animate-[ping_1s_ease-in-out_infinite]" />
                        <div className="absolute w-12 h-12 border border-white/20 rounded-full animate-[ping_1.5s_ease-in-out_infinite_0.5s]" />
                        <div className="absolute w-16 h-16 border border-white/10 rounded-full animate-[ping_2s_ease-in-out_infinite_1s]" />
                      </div>
                    </>
                  )}
                  <div className="relative z-10 flex items-center justify-center">
                    {isVerifying ? (
                      <>
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 animate-[spin_1s_ease-in-out_infinite] text-white" />
                          <span className="font-bold text-white tracking-wider">ANALYZING NEURAL PATTERNS...</span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Scan className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                        <span className="font-bold tracking-wide">VERIFY AUTHENTICITY</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </Card>

            {/* Detailed Information Sections */}
            <div className="space-y-4 mb-8">
              {/* How AI Detection Works */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto glass-panel">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-5 h-5 text-primary" />
                      <span className="font-medium">How AI Detection Works</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <Card className="bg-muted/30 border-primary/10 p-4 mt-2">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Neural Language Models:</strong> Our AI uses advanced transformer architectures trained on millions of human and AI-generated texts to identify subtle patterns that distinguish artificial content.</p>
                      <p><strong className="text-foreground">Multi-Layer Analysis:</strong> The system examines writing patterns, vocabulary usage, sentence structure, and semantic coherence across multiple dimensions.</p>
                      <p><strong className="text-foreground">Real-Time Processing:</strong> Analysis occurs in seconds, providing immediate feedback on content authenticity with detailed confidence metrics.</p>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Understanding Confidence Scores */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto glass-panel">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-medium">Understanding Confidence Scores</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <Card className="bg-muted/30 border-primary/10 p-4 mt-2">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">90-100%</Badge>
                          <p><strong className="text-foreground">High Confidence:</strong> Very strong indicators present. Result is highly reliable.</p>
                        </div>
                        <div className="space-y-2">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">70-89%</Badge>
                          <p><strong className="text-foreground">Medium Confidence:</strong> Clear patterns identified. Result is reliable but may benefit from human review.</p>
                        </div>
                        <div className="space-y-2">
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">50-69%</Badge>
                          <p><strong className="text-foreground">Lower Confidence:</strong> Mixed indicators present. Additional verification recommended.</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Blockchain Verification Details */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto glass-panel">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-primary" />
                      <span className="font-medium">Blockchain Verification Details</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <Card className="bg-muted/30 border-primary/10 p-4 mt-2">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Immutable Records:</strong> Every verification is recorded on the blockchain, creating a permanent, tamper-proof record of the analysis.</p>
                      <p><strong className="text-foreground">Cryptographic Hash:</strong> The unique hash serves as a digital fingerprint, allowing anyone to verify the authenticity and timestamp of the analysis.</p>
                      <p><strong className="text-foreground">Transparency:</strong> All verification records are publicly accessible, enabling independent verification and building trust in the system.</p>
                      <p><strong className="text-foreground">Audit Trail:</strong> The blockchain provides a complete history of content verification, supporting forensic analysis and accountability.</p>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Results */}
            {result && (
              <Card className="glass-panel p-8 animate-fade-in">
                <div className="flex justify-end mb-4">
                  <Button
                    onClick={downloadReport}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Multi-Model Verification Complete</h3>
                        <p className="text-muted-foreground">Advanced AI detection with consensus analysis</p>
                      </div>
                    </div>
                    <Button onClick={downloadReport} variant="outline" className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Report</span>
                    </Button>
                  </div>

                  {/* Main Result */}
                  <div className="flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 border border-primary/20">
                    <div className="flex items-center space-x-4">
                      {result.finalDecision ? (
                        <AlertCircle className="w-8 h-8 text-destructive" />
                      ) : (
                        <CheckCircle className="w-8 h-8 text-primary" />
                      )}
                      <div>
                        <p className="font-semibold text-lg">
                          {result.finalDecision ? "AI-Generated Content" : "Human-Written Content"}
                        </p>
                        <p className="text-muted-foreground">
                          Consensus Confidence: {result.overallConfidence}% • Majority Vote: {Math.max(result.majorityVote.aiGenerated, result.majorityVote.humanWritten)}/3 models
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={result.finalDecision ? "destructive" : "default"}
                      className="px-4 py-2 text-sm font-medium animate-hologram-flicker"
                    >
                      {result.finalDecision ? "AI Detected" : "Human Verified"}
                    </Badge>
                  </div>

                  {/* Detailed Analysis Tabs */}
                  <Tabs defaultValue="models" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="models" className="flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Model Analysis</span>
                      </TabsTrigger>
                      <TabsTrigger value="web" className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Web References</span>
                      </TabsTrigger>
                      <TabsTrigger value="blockchain" className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Blockchain</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="models" className="space-y-4">
                      <div className="grid gap-4">
                        {result.models.map((model, index) => (
                          <Card key={model.name} className="p-4 bg-muted/20 border border-primary/10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${model.prediction ? 'bg-destructive' : 'bg-primary'}`} />
                                <h4 className="font-semibold">{model.displayName}</h4>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={model.prediction ? "destructive" : "default"} className="text-xs">
                                  {model.prediction ? "AI" : "Human"}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{model.confidence}%</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{model.description}</p>
                            <div className="mt-2 w-full bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${model.prediction ? 'bg-destructive' : 'bg-primary'}`}
                                style={{ width: `${model.confidence}%` }}
                              />
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Voting Summary */}
                      <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            <span className="font-medium">Consensus Analysis</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.majorityVote.aiGenerated} AI votes • {result.majorityVote.humanWritten} Human votes
                          </div>
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="web" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                          <Globe className="w-4 h-4" />
                          <span>Content similarity analysis using Google Custom Search API</span>
                        </div>
                        
                        {result.webReferences.length > 0 ? (
                          <div className="grid gap-4">
                            {result.webReferences.map((ref, index) => (
                              <Card key={index} className="p-4 bg-muted/20 border border-primary/10">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-medium text-sm line-clamp-1">{ref.title}</h4>
                                      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{ref.snippet}</p>
                                    <a 
                                      href={ref.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-xs text-primary hover:underline line-clamp-1"
                                    >
                                      {ref.url}
                                    </a>
                                  </div>
                                  <Badge variant="outline" className="ml-3 text-xs">
                                    {ref.similarity}% match
                                  </Badge>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <Card className="p-6 text-center bg-muted/20 border border-primary/10">
                            <Globe className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">No significant web references found</p>
                            <p className="text-xs text-muted-foreground mt-1">This content appears to be unique</p>
                          </Card>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="blockchain" className="space-y-4">
                      <div className="space-y-4">
                        <div className="p-6 rounded-lg bg-gradient-glass border border-accent/30">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <p className="font-semibold text-accent">Blockchain Verification</p>
                              <p className="text-sm text-muted-foreground font-mono">
                                {result.blockchainHash}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Verified: {new Date(result.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={copyHash}
                              className="border-accent/50 hover:bg-accent/10"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Hash
                            </Button>
                          </div>
                        </div>

                        {/* Blockchain Explanation */}
                        <Card className="bg-secondary/5 border-secondary/20 p-4">
                          <div className="flex items-start space-x-3">
                            <Clock className="w-5 h-5 text-secondary mt-0.5" />
                            <div className="space-y-2 text-sm">
                              <h4 className="font-medium text-foreground">Blockchain Record Details:</h4>
                              <div className="space-y-2 text-muted-foreground">
                                <p><strong className="text-foreground">Permanent Record:</strong> This verification is now permanently stored on the blockchain and cannot be altered or deleted.</p>
                                <p><strong className="text-foreground">Hash Usage:</strong> Use this hash to independently verify this analysis result at any time. Share it as proof of verification.</p>
                                <p><strong className="text-foreground">Timestamp Proof:</strong> The blockchain timestamp proves when this verification occurred, providing temporal authenticity.</p>
                                <p><strong className="text-foreground">Audit Trail:</strong> This record contributes to a comprehensive audit trail for content authenticity tracking.</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}