import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Eye, Calendar, TrendingUp } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Report {
  id: string;
  created_at: string;
  content: string;
  is_ai_generated: boolean;
  confidence: number;
  blockchain_hash: string | null;
}

export default function Reports() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    accuracy: 0,
    thisMonth: 0
  });

  if (!user) {
    navigate('/auth');
    return null;
  }

  useEffect(() => {
    loadUserReports();
  }, [user]);

  const loadUserReports = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('verifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reports:', error);
        return;
      }

      setReports(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const thisMonth = data?.filter(report => {
        const reportDate = new Date(report.created_at);
        const now = new Date();
        return reportDate.getMonth() === now.getMonth() && 
               reportDate.getFullYear() === now.getFullYear();
      }).length || 0;
      
      const avgConfidence = total > 0 
        ? data.reduce((sum, report) => sum + report.confidence, 0) / total 
        : 0;
      
      setStats({
        total,
        accuracy: Math.round(avgConfidence * 10) / 10,
        thisMonth
      });
    } catch (error) {
      console.error('Error loading user reports:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Verification Reports</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete history of all content verifications with blockchain provenance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-panel p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{stats.total}</h3>
              <p className="text-muted-foreground">Total Verifications</p>
            </Card>
            
            <Card className="glass-panel p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{stats.accuracy}%</h3>
              <p className="text-muted-foreground">Avg Confidence</p>
            </Card>
            
            <Card className="glass-panel p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{stats.thisMonth}</h3>
              <p className="text-muted-foreground">This Month</p>
            </Card>
          </div>

          {/* Reports Timeline */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Recent Verifications</h2>
              <Button variant="outline" className="border-primary/30">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-neural-pulse text-primary text-xl">Loading your reports...</div>
              </div>
            ) : reports.length === 0 ? (
              <Card className="glass-panel p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No verifications yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start verifying content to see your reports here.
                </p>
                <Button onClick={() => navigate('/verify')}>
                  Start Verification
                </Button>
              </Card>
            ) : (
              reports.map((report, index) => (
              <Card key={report.id} className="glass-panel p-6 hover:shadow-neural transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-primary animate-neural-pulse" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(report.created_at).toLocaleString()}
                        </span>
                      </div>
                      <Badge 
                        variant={report.is_ai_generated ? "destructive" : "default"}
                        className="animate-hologram-flicker"
                      >
                        {report.is_ai_generated ? "AI Generated" : "Human Written"}
                      </Badge>
                    </div>

                    {/* Content Preview */}
                    <div className="p-4 rounded-lg bg-muted/20 border border-primary/10">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {report.content}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div>
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-primary transition-all duration-500"
                                style={{ width: `${report.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{report.confidence}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Blockchain Hash</span>
                          <p className="text-sm font-mono text-accent mt-1">
                            {report.blockchain_hash ? `${report.blockchain_hash.substring(0, 20)}...` : 'Not available'}
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="border-primary/30">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}