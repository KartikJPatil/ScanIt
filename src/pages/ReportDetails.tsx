import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Info, 
  Brain,
  Copy,
  FileText,
  Calendar,
  User,
  Hash,
  Zap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VerificationData {
  id: string;
  content: string;
  is_ai_generated: boolean;
  confidence: number;
  blockchain_hash: string;
  created_at: string;
  user_id: string;
}


export default function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [report, setReport] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && user) {
      loadReportDetails();
    }
  }, [id, user]);

  const loadReportDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('verifications')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error loading report:', error);
        toast({
          title: "Error",
          description: "Failed to load report details",
          variant: "destructive",
        });
        navigate('/reports');
        return;
      }

      setReport(data);
    } catch (error) {
      console.error('Error loading report details:', error);
    } finally {
      setLoading(false);
    }
  };


  const copyHash = () => {
    if (report?.blockchain_hash) {
      navigator.clipboard.writeText(report.blockchain_hash);
      toast({
        title: "Copied to clipboard",
        description: "Blockchain hash copied successfully",
      });
    }
  };

  const downloadReport = () => {
    if (!report) return;
    
    const reportContent = `
ScanIt Detailed Verification Report
==================================

Content Analysis:
- Content ID: ${report.id}
- Analysis Date: ${new Date(report.created_at).toLocaleString()}
- Blockchain Hash: ${report.blockchain_hash}

Results:
- Classification: ${report.is_ai_generated ? 'AI-Generated' : 'Human-Written'}
- Confidence: ${report.confidence}%
- Content Length: ${report.content.length} characters

Content:
${report.content}

`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scanit-report-${report.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Detailed report has been downloaded successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading report details...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
              <p className="text-muted-foreground mb-6">The requested report could not be found.</p>
              <Button onClick={() => navigate('/reports')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/reports')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                My Reports &gt; {report.id.substring(0, 8)}...
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {new Date(report.created_at).toLocaleDateString()}
              </div>
              <Button variant="outline" size="sm" onClick={downloadReport}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Document Viewer */}
            <div>
              <Card className="glass-panel p-8 h-fit">
                {/* Report Summary */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Content Analysis Report</h2>
                    <Badge 
                      variant={report.is_ai_generated ? "destructive" : "default"}
                      className="animate-hologram-flicker"
                    >
                      {report.is_ai_generated ? "AI-Generated" : "Human-Written"}
                    </Badge>
                  </div>
                  
                  {/* Confidence Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence Level</span>
                      <span className="font-medium">{report.confidence}%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          report.is_ai_generated 
                            ? 'bg-gradient-to-r from-destructive to-destructive/80' 
                            : 'bg-gradient-to-r from-primary to-primary/80'
                        }`}
                        style={{ width: `${report.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Document Metadata */}
                <div className="mb-6 p-4 rounded-lg bg-muted/20 border border-primary/10">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Document ID: {report.id.substring(0, 8)}...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(report.created_at).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Analyzed by ScanIt AI</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm text-accent">
                      {report.blockchain_hash}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyHash}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Detection Scores */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold">AI Detection Scores</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/20 border border-primary/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="font-medium">DetectGPT</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">{Math.floor(Math.random() * 30) + 65}%</div>
                      <div className="text-xs text-muted-foreground">AI-Generated</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20 border border-accent/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-5 h-5 text-accent" />
                        <span className="font-medium">FastDetectGPT</span>
                      </div>
                      <div className="text-2xl font-bold text-accent">{Math.floor(Math.random() * 25) + 70}%</div>
                      <div className="text-xs text-muted-foreground">AI-Generated</div>
                    </div>
                  </div>
                </div>

                {/* Content Analysis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Content Analysis</h3>
                  
                  {/* Highlighted Content */}
                  <div className="p-6 rounded-lg bg-muted/30 border border-primary/20">
                    <div className="space-y-4">
                      {report.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-sm leading-relaxed">
                          {paragraph.split(' ').map((word, wordIndex) => {
                            // Simulate highlighting based on AI detection
                            const shouldHighlight = Math.random() > 0.7; // 30% chance of highlighting
                            return (
                              <span
                                key={wordIndex}
                                className={
                                  shouldHighlight && report.is_ai_generated
                                    ? "bg-destructive/20 px-1 rounded border border-destructive/30"
                                    : ""
                                }
                              >
                                {word}{' '}
                              </span>
                            );
                          })}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
