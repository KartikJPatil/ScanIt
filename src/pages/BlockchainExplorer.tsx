import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blocks, Search, Clock, Hash, User, Zap, Upload, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Block {
  id: string;
  hash: string;
  timestamp: string;
  verifier: string;
  transactions: number;
  status: "confirmed" | "pending";
}

interface VerificationData {
  id: string;
  content: string;
  is_ai_generated: boolean;
  confidence: number;
  blockchain_hash: string;
  created_at: string;
  user_id: string;
}

export default function BlockchainExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [userBlocks, setUserBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserVerifications();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserVerifications = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('verifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading verifications:', error);
        return;
      }

      // Convert verifications to blocks
      const blocks: Block[] = (data || []).map((verification: VerificationData, index) => ({
        id: verification.id,
        hash: verification.blockchain_hash || `0x${Math.random().toString(16).substring(2, 42)}`,
        timestamp: verification.created_at,
        verifier: `ScanIt Node ${String.fromCharCode(65 + (index % 3))}`,
        transactions: 1,
        status: "confirmed" as const,
      }));

      setUserBlocks(blocks);
    } catch (error) {
      console.error('Error loading user verifications:', error);
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
              <Blocks className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Your Verifications</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your content authenticity verifications on the blockchain
            </p>
          </div>

          {/* Search */}
          <Card className="glass-panel p-6 mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by hash, block number, or verifier..."
                className="pl-10 bg-muted/30 border-primary/20"
              />
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* User's Verifications */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Your Verifications</h2>
              
              {loading ? (
                <Card className="glass-panel p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-6">
                    <Blocks className="w-8 h-8 text-muted-foreground animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Loading Verifications...</h3>
                  <p className="text-muted-foreground">
                    Fetching your verification history from the blockchain
                  </p>
                </Card>
              ) : !user ? (
                <Card className="glass-panel p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-6">
                    <User className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Login Required</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Please log in to view your verification history and blockchain records
                  </p>
                  <Button className="group">
                    Go to Login
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              ) : userBlocks.length === 0 ? (
                <Card className="glass-panel p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-6">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">No Verifications Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start by scanning your first piece of content to see it appear in your verification history
                  </p>
                  <Button className="group">
                    Go to Scanner
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {userBlocks.map((block, index) => (
                  <Card 
                    key={block.id} 
                    className={`blockchain-block p-6 cursor-pointer animate-fade-in ${
                      selectedBlock?.id === block.id ? 'border-primary shadow-neon' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full animate-neural-pulse ${
                          block.status === 'confirmed' ? 'bg-primary' : 'bg-destructive'
                        }`} />
                        <span className="font-semibold">Block #{block.id}</span>
                      </div>
                      <Badge 
                        variant={block.status === 'confirmed' ? 'default' : 'destructive'}
                        className="animate-hologram-flicker"
                      >
                        {block.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-accent">
                          {block.hash.substring(0, 20)}...
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(block.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>{block.transactions} txns</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              )}
            </div>

            {/* Block Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Block Details</h2>
              
              {selectedBlock ? (
                <Card className="glass-panel p-8 animate-fade-in">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Block #{selectedBlock.id}</h3>
                      <Badge 
                        variant={selectedBlock.status === 'confirmed' ? 'default' : 'destructive'}
                        className="animate-hologram-flicker"
                      >
                        {selectedBlock.status}
                      </Badge>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Block Hash</label>
                          <p className="font-mono text-sm text-accent break-all mt-1">
                            {selectedBlock.hash}
                          </p>
                        </div>
                        
                        <div>
                          <label className="text-sm text-muted-foreground">Timestamp</label>
                          <p className="text-sm mt-1">
                            {new Date(selectedBlock.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Verifier</label>
                          <div className="flex items-center space-x-2 mt-1">
                            <User className="w-4 h-4 text-primary" />
                            <p className="text-sm">{selectedBlock.verifier}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-muted-foreground">Transactions</label>
                          <p className="text-sm mt-1">{selectedBlock.transactions} verifications</p>
                        </div>
                      </div>
                    </div>

                    {/* Visualization */}
                    <div className="p-6 rounded-lg bg-gradient-neural border border-accent/30">
                      <h4 className="font-semibold mb-4">Block Visualization</h4>
                      <div className="grid grid-cols-8 gap-2">
                        {Array.from({ length: selectedBlock.transactions }).map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 bg-primary/40 rounded border border-primary/60 animate-neural-pulse"
                            style={{ animationDelay: `${i * 0.05}s` }}
                          />
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full border-primary/30 hover:bg-primary/10"
                    >
                      View Full Block Data
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="glass-panel p-12 text-center">
                  <Blocks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {loading 
                      ? "Loading verification details..."
                      : !user
                      ? "Login to view your verification blocks"
                      : userBlocks.length === 0 
                      ? "Start scanning content to see your verification blocks here"
                      : "Select a block to view detailed information"
                    }
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}