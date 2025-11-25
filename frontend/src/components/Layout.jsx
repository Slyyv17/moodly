import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
    return (
        <div
            
            className="relative min-h-screen bg-[#120F22] text-white pry-ff">
            <main className="pb-24">
                <Outlet /> {/* renders nested routes */}
            </main>
            <BottomNav />
        </div>
    );
}
