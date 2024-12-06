'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Settings,
    HelpCircle,
    Package,
    Users,
    Activity,
    LogOut,
    ChevronDown,
    PlusCircle,
    List,
    Menu,
    X
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/',
        color: 'text-sky-500',
    },
    {
        label: 'Atividade',
        icon: Activity,
        href: '/activity',
    },
    {
        label: 'Máquinas',
        icon: Package,
        color: 'text-pink-700',
        submenu: true,
        items: [
            {
                label: 'Listar Máquinas',
                icon: List,
                href: '/machines',
            },
            {
                label: 'Nova Máquina',
                icon: PlusCircle,
                href: '/cadastrarmaquinas',
            },
        ],
    },
    {
        label: 'Usuários',
        icon: Users,
        href: '/users',
        color: 'text-orange-700',
    },
    {
        label: 'Configurações',
        icon: Settings,
        href: '/settings',
    },
    {
        label: 'Ajuda',
        icon: HelpCircle,
        href: '/help',
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`flex flex-col h-full bg-[#111827] text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
            <div className="px-3 py-2 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <h1 className={`text-2xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        Vending<span className="text-primary">Pro</span>
                    </h1>
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-gray-200"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
            <div className="flex-1 px-3 py-2 overflow-y-auto">
                <div className="space-y-1">
                    {routes.map((route) => {
                        if (route.submenu) {
                            const isOpen = openSubmenu === route.label;
                            const isActive = route.items?.some(item => pathname === item.href);

                            return (
                                <div key={route.label} className="space-y-1">
                                    {isSidebarOpen ? (
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                'w-full justify-between',
                                                'text-sm group flex p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                                isActive || isOpen ? 'text-white bg-white/10' : 'text-zinc-400'
                                            )}
                                            onClick={() => toggleSubmenu(route.label)}
                                        >
                                            <div className="flex items-center">
                                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{route.label}</span>
                                            </div>
                                            <ChevronDown className={cn(
                                                'h-4 w-4 transition-transform',
                                                isOpen && 'transform rotate-180'
                                            )} />
                                        </Button>
                                    ) : (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        'w-full justify-between',
                                                        'text-sm group flex p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                                        isActive ? 'text-white bg-white/10' : 'text-zinc-400'
                                                    )}
                                                >
                                                    <route.icon className={cn('h-5 w-5', route.color)} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="space-y-1">
                                                    {route.items?.map((item) => {
                                                        const isItemActive = pathname === item.href;
                                                        return (
                                                            <Link
                                                                key={item.href}
                                                                href={item.href}
                                                                className={cn(
                                                                    'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                                                    isItemActive ? 'text-white bg-white/10' : 'text-zinc-400'
                                                                )}
                                                            >
                                                                <div className="flex items-center flex-1">
                                                                    <item.icon className="h-5 w-5 mr-3" />
                                                                    <span>{item.label}</span>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                    {isOpen && isSidebarOpen && (
                                        <div className="pl-6 space-y-1">
                                            {route.items?.map((item) => {
                                                const isItemActive = pathname === item.href;
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className={cn(
                                                            'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                                            isItemActive ? 'text-white bg-white/10' : 'text-zinc-400'
                                                        )}
                                                    >
                                                        <div className="flex items-center flex-1">
                                                            <item.icon className="h-5 w-5 mr-3" />
                                                            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={route.href}
                                href={route.href || '#'}
                                className={cn(
                                    'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                    pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                    <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{route.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="px-3 py-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
                    onClick={() => { }}
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Sair</span>
                </Button>
            </div>
        </div>
    );
}