'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  CreditCard,
  FileText,
  Building,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/dashboard/clients', icon: Users },
    { name: 'Content Calendar', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { name: 'Content Library', href: '/dashboard/content', icon: FileText },
    { name: 'Templates', href: '/dashboard/templates', icon: FileText },
    { name: 'Agency', href: '/dashboard/agency', icon: Building },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-16 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                `sidebar-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className={cn(
            "bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-3",
            collapsed && "text-center"
          )}>
            {!collapsed && (
              <>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Upgrade to Pro
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Get unlimited clients
                </div>
                <Link href="/dashboard/billing">
                  <Button size="sm" className="w-full mt-3">
                    Upgrade
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}