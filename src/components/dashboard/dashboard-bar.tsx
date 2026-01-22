import { SidebarTrigger } from "../ui/sidebar";
import { UserNav } from "./user-nav";

export function DashboardBar() {
    return (
        <header className="flex h-14 items-center justify-between border-b px-4">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
                <UserNav />
            </div>
        </header>
    )
}