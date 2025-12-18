import { Link, useLocation } from 'react-router-dom';
import { Search, BookOpen, Bell } from 'lucide-react';
import logo from '@/assets/logo.png';

const navItems = [
  { path: '/', label: 'ค้นหา', icon: Search },
  { path: '/topics', label: 'หัวข้อ', icon: BookOpen },
  { path: '/changes', label: 'อัปเดตล่าสุด', icon: Bell },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="เงินเทอร์โบ" className="h-10 w-auto" />
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || 
                (path !== '/' && location.pathname.startsWith(path));
              
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}
