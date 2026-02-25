import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total Pendapatan", value: "Rp 12.500.000", icon: <DollarSign className="h-6 w-6 text-green-600" />, description: "+15% dari bulan lalu" },
    { title: "Pesanan Masuk", value: "145", icon: <ShoppingCart className="h-6 w-6 text-blue-600" />, description: "25 pesanan perlu diproses" },
    { title: "Total Produk", value: "42", icon: <Package className="h-6 w-6 text-purple-600" />, description: "5 produk stok tipis" },
    { title: "Pelanggan", value: "892", icon: <Users className="h-6 w-6 text-orange-600" />, description: "12 user baru hari ini" },
  ];

  return (
    <div className="flex-1 p-8 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

      {/* Grid Statistik Utama */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="flex flex-col justify-between p-4">
            <div className="flex items-center gap-3">
              {stat.icon}
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </div>
            <CardContent className="mt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Grafik Penjualan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed mt-2">
            <div className="flex flex-col items-center text-gray-400">
              <TrendingUp className="h-10 w-10 mb-2" />
              <span>Area Grafik Penjualan (Segera Hadir)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Perhatian Stok</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 bg-yellow-50 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Macbook Pro M3</p>
                <p className="text-xs text-gray-500">Sisa stok: 2 unit</p>
              </div>
              <div className="ml-auto text-red-500 font-medium">Kritis</div>
            </div>

            <div className="flex items-center gap-4 bg-blue-50 p-2 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">iPhone 15 Case</p>
                <p className="text-xs text-gray-500">Status: Pre-order</p>
              </div>
              <div className="ml-auto text-blue-500 font-medium">PO</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}