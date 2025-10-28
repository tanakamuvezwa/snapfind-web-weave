import { Search, Plus, Flame, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';

const wantedRequests = [
  { id: 1, title: 'Looking for MacBook Pro M1', description: 'Need 16GB RAM, any color', matches: 3, icon: '💻', time: '2d ago' },
  { id: 2, title: 'Need a bicycle', description: 'Mountain bike, good condition', matches: 5, icon: '🚴', time: '1w ago' },
  { id: 3, title: 'Gaming chair wanted', description: 'Ergonomic, under $200', matches: 2, icon: '🪑', time: '3d ago' },
];

const matches = [
  { id: 1, title: 'MacBook Pro M1 16GB 512GB', price: '$1,299', seller: 'Tech Store', distance: '3km', icon: '💻', confidence: 95 },
  { id: 2, title: 'MacBook Pro M1 2020', price: '$1,150', seller: 'John M.', distance: '5km', icon: '💻', confidence: 88 },
  { id: 3, title: 'MacBook Pro M1 Like New', price: '$1,400', seller: 'Sarah K.', distance: '2km', icon: '💻', confidence: 92 },
];

export default function Wanted() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  const handleCreateRequest = () => {
    toast.success('Feature coming soon!');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Wanted Requests</h1>
            <p className="text-muted-foreground">
              Create requests and get notified when matches appear
            </p>
          </div>
          <Button
            size={isDesktop ? 'default' : 'icon'}
            className="bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30"
            onClick={handleCreateRequest}
          >
            <Plus className="h-5 w-5" />
            {isDesktop && <span className="ml-2">New Request</span>}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${isDesktop ? 'grid-cols-12' : 'grid-cols-1'}`}>
        {/* Your Requests */}
        <div className={isDesktop ? 'col-span-5' : ''}>
          <h2 className="text-xl font-bold mb-4">Your Requests</h2>
          <div className="space-y-4">
            {wantedRequests.map((request) => (
              <div key={request.id} className="glass-card-hover p-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl flex-shrink-0">{request.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{request.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {request.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-primary">
                        <Flame className="h-4 w-4" />
                        <span className="font-medium">{request.matches} matches</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{request.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {wantedRequests.length === 0 && (
              <div className="glass-card p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  No wanted requests yet
                </p>
                <Button
                  variant="outline"
                  onClick={handleCreateRequest}
                >
                  Create Your First Request
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Matches */}
        <div className={isDesktop ? 'col-span-7' : ''}>
          <h2 className="text-xl font-bold mb-4">Recent Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matches.map((match) => (
              <button
                key={match.id}
                className="glass-card-hover p-4 text-left"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl flex-shrink-0">{match.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 line-clamp-2">{match.title}</h3>
                    <p className="text-xl font-bold text-primary">{match.price}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Seller:</span>
                    <span>{match.seller}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span>{match.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Match:</span>
                    <span className="text-primary font-semibold">{match.confidence}%</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full mt-4 bg-primary hover:bg-primary-glow"
                >
                  Contact Seller
                </Button>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
