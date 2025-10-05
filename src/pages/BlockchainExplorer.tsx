import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blocks, Search, Clock, Hash, User, Zap } from "lucide-react";

interface Block {
  id: number;
  hash: string;
  timestamp: string;
  verifier: string;
  transactions: number;
  status: "confirmed" | "pending";
}

const mockBlocks: Block[] = [
  {
    id: 12547,
    hash: "0xa1b2c3d4e5f6789012345678901234567890abcd",
    timestamp: "2024-01-15T10:30:00Z",
    verifier: "ScanIt Node Alpha",
    transactions: 42,
    status: "confirmed"
  },
  {
    id: 12546,
    hash: "0xb2c3d4e5f6789012345678901234567890abcde1",
    timestamp: "2024-01-15T10:25:00Z",
    verifier: "ScanIt Node Beta",
    transactions: 38,
    status: "confirmed"
  },
  {
    id: 12545,
    hash: "0xc3d4e5f6789012345678901234567890abcde12f",
    timestamp: "2024-01-15T10:20:00Z",
    verifier: "ScanIt Node Gamma",
    transactions: 51,
    status: "pending"
  }
];

export default function BlockchainExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

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
              <span className="holographic-text">Blockchain Explorer</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the immutable ledger of content authenticity verifications
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
            {/* Blockchain Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Recent Blocks</h2>
              
              <div className="space-y-4">
                {mockBlocks.map((block, index) => (
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
                    Select a block to view detailed information
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