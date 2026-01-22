import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Package,
    ShoppingCart,
    Users,
    DollarSign,
    TrendingUp,
    AlertCircle
} from "lucide-react";

export default function DashboardPage() {
    // Data Dummy sesuai Schema (Total menggunakan BigInt di DB, di sini kita tampilkan number)
    const stats = [
        {
            title: "Total Pendapatan",
            value: "Rp 12.500.000",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            description: "+15% dari bulan lalu",
        },
        {
            title: "Pesanan Masuk",
            value: "145",
            icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
            description: "25 pesanan perlu diproses",
        },
        {
            title: "Total Produk",
            value: "42",
            icon: <Package className="h-4 w-4 text-muted-foreground" />,
            description: "5 produk stok tipis",
        },
        {
            title: "Pelanggan",
            value: "892",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            description: "12 user baru hari ini",
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
            </div>

            {/* Grid Statistik Utama */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Placeholder untuk Chart (Bisa menggunakan Recharts nanti) */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Grafik Penjualan</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed mt-2">
                        <div className="flex flex-col items-center text-muted-foreground">
                            <TrendingUp className="h-10 w-10 mb-2" />
                            <span>Area Grafik Penjualan (Segera Hadir)</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Alert Stok atau Pesanan Terbaru */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Perhatian Stok</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Contoh item stok ready/preorder dari schema ProductStock */}
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-none">Macbook Pro M3</p>
                                    <p className="text-sm text-muted-foreground">Sisa stok: 2 unit</p>
                                </div>
                                <div className="ml-auto font-medium text-red-500">Kritis</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <Package className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-none">iPhone 15 Case</p>
                                    <p className="text-sm text-muted-foreground">Status: Pre-order</p>
                                </div>
                                <div className="ml-auto font-medium text-blue-500">PO</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}