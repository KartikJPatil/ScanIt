import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scan, Shield, BarChart3, Blocks, Info, Brain, User, ChevronDown, Menu, Settings, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleVerifyClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/auth');
      toast({
        title: "Login Required",
        description: "Please log in to verify content.",
        variant: "default",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Main navigation items
  const mainNavItems = [
    { path: "/", label: "Home", icon: Shield },
    { path: "/explorer", label: "Explore", icon: Blocks }
  ];

  // Info dropdown items
  const infoItems = [
    { path: "/about", label: "About", icon: Info },
    { path: "/models", label: "Models", icon: Brain }
  ];

  // Auth-protected items
  const protectedNavItems = user ? [
    { path: "/verify", label: "Verify", icon: Scan },
    { path: "/reports", label: "Reports", icon: BarChart3 }
  ] : [
    { path: "/verify", label: "Verify", icon: Scan, onClick: handleVerifyClick }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold holographic-text">ScanIt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main nav items */}
            {mainNavItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button 
                  variant={location.pathname === path ? "default" : "ghost"}
                  size="sm" 
                  className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}

            {/* Info Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10">
                  <Info className="w-4 h-4" />
                  <span>Info</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-panel border-primary/20">
                {infoItems.map(({ path, label, icon: Icon }) => (
                  <DropdownMenuItem key={path} asChild>
                    <Link to={path} className="flex items-center space-x-2 w-full">
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Protected nav items */}
            {protectedNavItems.map(({ path, label, icon: Icon, onClick }) => (
              <Link key={path} to={path} onClick={onClick}>
                <Button 
                  variant={location.pathname === path ? "default" : "ghost"}
                  size="sm" 
                  className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-panel border-primary/20">
                <div className="flex flex-col space-y-4 mt-8">
                  {mainNavItems.map(({ path, label, icon: Icon }) => (
                    <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                      <Button 
                        variant={location.pathname === path ? "default" : "ghost"}
                        size="sm" 
                        className="w-full justify-start space-x-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </Button>
                    </Link>
                  ))}
                  
                  <div className="py-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Information</p>
                    {infoItems.map(({ path, label, icon: Icon }) => (
                      <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start space-x-2 ml-4">
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>

                  {protectedNavItems.map(({ path, label, icon: Icon, onClick }) => (
                    <Link key={path} to={path} onClick={(e) => {
                      setMobileOpen(false);
                      onClick?.(e);
                    }}>
                      <Button 
                        variant={location.pathname === path ? "default" : "ghost"}
                        size="sm" 
                        className="w-full justify-start space-x-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Start Verification - Always visible */}
            <Link to="/verify" onClick={handleVerifyClick}>
              <Button size="sm" className="neon-border bg-gradient-primary hover:shadow-neon transition-all duration-300">
                <span className="hidden sm:inline">Start Verification</span>
                <span className="sm:hidden">Verify</span>
              </Button>
            </Link>

            {user ? (
              /* Profile Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-panel border-primary/20">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2 w-full">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center space-x-2 w-full">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 w-full text-destructive">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login/Sign Up */
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <span className="hidden sm:inline">Login / Sign Up</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};