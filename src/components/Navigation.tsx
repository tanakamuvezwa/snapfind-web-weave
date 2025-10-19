import { Home, Camera, Search, PlusCircle, MessageCircle, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/camera', icon: Camera, label: 'Capture' },
  { to: '/results', icon: Search, label: 'Results' },
  { to: '/listing', icon: PlusCircle, label: 'List Item' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/wanted', icon: Heart, label: 'Wanted' },
];

export function Navigation() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  if (isDesktop) {
    return (
      <aside className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10 flex flex-col z-50">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            SnapFind
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Visual Local Search</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'hover:bg-secondary hover:text-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground text-center">
            Hyper-local classifieds
          </p>
        </div>
      </aside>
    );
  }

  // Mobile bottom navigation
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 z-50">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('h-6 w-6', isActive && 'animate-scale-in')} />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
