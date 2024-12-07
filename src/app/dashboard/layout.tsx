'use client';

import { Button } from "@/components/ui/button";
import { Home, Monitor, ShoppingCart, PlusCircle, Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true);
            }
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const navigation = [
        { name: 'Monitoramento', href: '/dashboard', icon: Monitor },
        { name: 'Transações', href: '/dashboard/transacoes', icon: ShoppingCart },
        { name: 'Máquinas', href: '/dashboard/machines', icon: Home },
        { name: 'Nova Máquina', href: '/dashboard/cadastrarmaquinas', icon: PlusCircle },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed md:relative z-20 h-full transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-64' : 'w-0 md:w-16'} 
                    ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                    bg-gray-800 text-white
                `}
            >
                <div className="flex h-full flex-col overflow-y-auto">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h2 className={`font-bold text-xl ${!isSidebarOpen && 'md:hidden'}`}>
                            Dashboard
                        </h2>
                        <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-white hover:text-gray-200"
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>

                    <nav className="flex-1 space-y-1 px-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={`
                                            w-full justify-start gap-4 mb-1
                                            ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'}
                                            ${!isSidebarOpen && 'md:justify-center md:p-3'}
                                        `}
                                        onClick={() => isMobile && setIsSidebarOpen(false)}
                                    >
                                        <Icon className={`h-5 w-5 ${!isSidebarOpen && 'md:h-6 md:w-6'}`} />
                                        <span className={!isSidebarOpen ? 'md:hidden' : ''}>
                                            {item.name}
                                        </span>
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center px-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="text-gray-800 dark:text-white"
                    >
                        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                    <div className="flex-1 flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}