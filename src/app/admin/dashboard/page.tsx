"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/reduxHook";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Edit, Plus, RefreshCcw, Save, SaveIcon, Trash, View, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import { ProductDoc } from "@/models/Product";
import Loader from "@/components/ui/loader";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { auth } from "@/lib/firebaseConfig";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

interface ProductState {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: "Microcontroller" | "Sensor" | "Actuator" | "Misc";
    stock: number;
    featured: boolean;
    features: string[];
    diagrams: string[];
    featuresInput: string;
    diagramsInput: string;
}


interface User {
    _id: string;
    displayName?: string;
    email: string;
    role: "user" | "admin";
}

interface OrderItem {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    _id: string;
    orderID: string;
    items: OrderItem[];
    total: number;
    customer: {
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };
    status: "pending" | "paid" | "approved" | "shipped" | "cancelled" | "delivered";
    createdAt: string;
}

interface SalesData { month: string; sales: number; }
interface CategoryData { category: string; stock: number; }


export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const { user } = useAppSelector((s) => s.auth);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [orderFilter, setOrderFilter] = useState("all");
    const router = useRouter();
    const [openAddModal, setOpenAddModal] = useState(false);


    // Analytics Data States
    const [refreshKey, setRefreshKey] = useState(0);
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);


    //-- Products State ---
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        featured: false,
        features: [] as string[],
        diagrams: [] as string[],
        featuresInput: "",
        diagramsInput: "",
    });

    const [products, setProducts] = useState<ProductState[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductState | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    //-- Users State ---
    const [users, setUsers] = useState<User[]>([]);

    //-- Orders State ---
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [openOrderModal, setOpenOrderModal] = useState(false);

    // --- Analytics State ---
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0,
        lastMonthRevenue: 0,
    });

    const cards = [
        { title: "Total Orders", value: stats.totalOrders, desc: "All-time orders", color: "#facc15" },
        { title: "Pending Orders", value: stats.pendingOrders, desc: "Awaiting approval", color: "#60a5fa" },
        { title: "Total Products", value: stats.totalProducts, desc: "Active store items", color: "#34d399" },
        { title: "Total Users", value: stats.totalUsers, desc: "Registered users", color: "#f87171" },
        { title: "Total Revenue", value: `৳${stats.totalRevenue.toLocaleString()}`, desc: "Overall earnings", color: "#a78bfa" },
        { title: "Last Month Revenue", value: `৳${stats.lastMonthRevenue.toLocaleString()}`, desc: "Earnings in previous month", color: "#fb923c" },
    ];

    //! Data Fetching Effects
    // Analytics Overview Data
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/overview`);
            const json = await res.json();
            setStats(json);
        };
        fetchData();
    }, [refreshKey]);

    // Sales & Category Data
    useEffect(() => {
        async function fetchData() {
            try {
                const [salesRes, catRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/sales`),
                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/category-stock`),
                ]);

                const [sales, categories] = await Promise.all([
                    salesRes.json(),
                    catRes.json(),
                ]);

                setSalesData(sales);
                setCategoryData(categories);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [refreshKey]);

    // Orders Data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`);
                setOrders(res.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Users Data 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                console.error("User not logged in");
                setLoading(false);
                return;
            }

            try {
                const token = await currentUser.getIdToken();
                const res = await axiosInstance(`/api/users`);
                setUsers(res.data.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    // Role Check
    useEffect(() => {
        const checkRole = async () => {
            if (!user?.uid) {
                router.push("/");
                return;
            }

            try {
                const res = await fetch(`/api/users/role?uid=${user.uid}`);
                const data = await res.json();

                if (data.role === "admin") {
                    setIsAdmin(true);
                } else {
                    router.push("/");
                }
            } catch {
                router.push("/");
            }
        };

        checkRole();
    }, [user, router]);

    // Products Data
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

                const data: ProductDoc[] = await res.data.data;

                // Map to plain objects
                const productsState: ProductState[] = data.map((p) => ({
                    _id: p._id,
                    title: p.title,
                    description: p.description,
                    price: p.price,
                    image: p.image,
                    category: p.category as ProductState["category"],
                    stock: p.stock,
                    featured: p.featured,
                    features: p.features || [],
                    diagrams: p.diagrams || [],
                    featuresInput: (p.features || []).join(","),
                    diagramsInput: (p.diagrams || []).join(","),  
                }));

                setProducts(productsState);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (!isAdmin) return null;
    if (loading) return <Loader />;

    // --- Refresh Data Handler ---
    const handleDataChange = () => setRefreshKey((prev) => prev + 1);

    // --- Add Product Handler ---
    const handleAddProduct = async () => {
        if (!newProduct.title || !newProduct.price || !newProduct.category) {
            toast.warning("Please fill all fields");
            return;
        }

        const featuresArray = newProduct.featuresInput
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        const diagramsArray = newProduct.diagramsInput
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newProduct,
                    features: featuresArray,
                    diagrams: diagramsArray,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Product added successfully!");
                setOpenAddModal(false);

                // Add the new product to state
                setProducts((prev) => [
                    ...prev,
                    {
                        _id: data.product._id,
                        title: data.product.title,
                        description: data.product.description,
                        price: data.product.price,
                        image: data.product.image,
                        category: data.product.category as ProductState["category"],
                        stock: data.product.stock,
                        featured: data.product.featured,
                        features: data.product.features || [],
                        diagrams: data.product.diagrams || [],
                        featuresInput: data.product.features.join(","),
                        diagramsInput: data.product.diagrams.join(","),
                    }
                ]);

                setNewProduct({
                    title: "",
                    description: "",
                    price: "",
                    image: "",
                    category: "",
                    stock: "",
                    featured: false,
                    features: [],
                    diagrams: [],
                    featuresInput: "",
                    diagramsInput: "",
                });
            } else {
                toast.warning(data.message);
            }
        } catch (err) {
            toast.error("Server error while adding product");
        }
    };


    const openEdit = (product: ProductState) => {
        setSelectedProduct({
            ...product,
            featuresInput: product.features?.join(",") || "",
            diagramsInput: product.diagrams?.join(",") || "",
        });
        console.log(selectedProduct)
        setOpenEditModal(true);
    };

    // --- Edit Product Handler ---
    const handleEditProduct = async () => {
        if (!selectedProduct) return;

        // Convert the comma-separated strings into arrays before sending
        const featuresArray = selectedProduct.featuresInput
            ?.split(",")
            .map((item) => item.trim()).filter(Boolean);

        const diagramsArray = selectedProduct.diagramsInput
            ?.split(",")
            .map((item) => item.trim()).filter(Boolean);


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/edit`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...selectedProduct,
                    features: featuresArray,
                    diagrams: diagramsArray,
                }),
            });

            const data = await res.json();
            console.log(data)

            if (res.ok) {
                toast.success(data.message);
                setProducts((prev) =>
                    prev.map((p) => (p._id === selectedProduct._id ? data.product : p))
                );
                setOpenEditModal(false);

                // Update selectedProduct with returned data from API
                setSelectedProduct({
                    ...data.product,
                    featuresInput: data.product.features?.join(",") || "",
                    diagramsInput: data.product.diagrams?.join(",") || "",
                });
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Update failed!");
            console.error(err);
        }
    };


    // --- Order Status Change Handler ---
    const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status: newStatus }),
            });
            const updatedOrder = await res.json();
            setOrders((prev) => prev.map((o) => (o.orderID === orderId ? updatedOrder : o)));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // --- Filtered Orders ---
    const filteredOrders = orders.filter((order) => {
        const now = new Date();
        const orderDate = new Date(order.createdAt);

        switch (orderFilter) {
            case "7days":
                return orderDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // last 7 days
            case "1month":
                return orderDate >= new Date(now.setMonth(now.getMonth() - 1)); // last 1 month
            case "6months":
                return orderDate >= new Date(now.setMonth(now.getMonth() - 5)); // last 6 months
            case "1year":
                return orderDate >= new Date(now.setFullYear(now.getFullYear() - 1)); // last 1 year
            case "all":
            default:
                return true; // show all orders
        }
    });

    return (
        <div className="mt-20 p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-600">Manage products, orders, and users efficiently.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((item, idx) => (
                    <div
                        key={idx}
                        className="relative transition-transform hover:-translate-y-1"
                    >
                        <Card
                            className="p-4 cursor-pointer border-4 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white"
                            style={{ backgroundColor: item.color + "20" }}
                        >
                            <CardHeader className="p-0 mb-2">
                                <CardTitle className="text-lg font-extrabold text-gray-800">
                                    {item.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-700">
                                    {item.desc}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-3xl font-black text-gray-900">{item.value}</p>
                            </CardContent>
                        </Card>

                    </div>
                ))}
            </div>

            <Button onClick={handleDataChange}><RefreshCcw /> Refresh Data</Button>
            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Sales Analytics */}
                <Card className="border border-cyan-200">
                    <CardHeader>
                        <CardTitle>Monthly Sales Analytics</CardTitle>
                        <CardDescription>Revenue performance (Last 6 months)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Products by Category */}
                <Card className="border border-cyan-200">
                    <CardHeader>
                        <CardTitle>Products by Category</CardTitle>
                        <CardDescription>Inventory distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="stock"
                                    fill="#0891b2"
                                    radius={[5, 5, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="orders" className="bg-white border border-cyan-200 rounded-xl p-4">
                <TabsList className="border-b pb-2 gap-4 flex flex-wrap">
                    <TabsTrigger className="cursor-pointer" value="orders">Orders</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="products">Products</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="users">Users</TabsTrigger>
                </TabsList>

                {/* Orders Table */}
                <TabsContent value="orders" className="pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Order List</h2>
                        <Select onValueChange={(v) => setOrderFilter(v)}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="cursor-pointer" value="all">Show All</SelectItem>
                                <SelectItem className="cursor-pointer" value="7days">Last 7 Days</SelectItem>
                                <SelectItem className="cursor-pointer" value="1month">Last 1 Month</SelectItem>
                                <SelectItem className="cursor-pointer" value="6months">Last 6 Months</SelectItem>
                                <SelectItem className="cursor-pointer" value="1year">Last 1 Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Order Details Modal */}
                    <Dialog open={openOrderModal} onOpenChange={setOpenOrderModal}>
                        <DialogContent className="max-w-md rounded-2xl border border-cyan-200 shadow-lg">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-cyan-700">
                                    Order Details: {selectedOrder?.orderID}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 mt-4">
                                {/* Customer Info */}
                                <div>
                                    <p>
                                        <strong>Name:</strong> {selectedOrder?.customer.name} <br />
                                        {selectedOrder?.customer.email && (
                                            <>
                                                <strong>Email:</strong> {selectedOrder.customer.email} <br />
                                            </>
                                        )}
                                        {selectedOrder?.customer.phone && (
                                            <>
                                                <strong>Phone:</strong> {selectedOrder.customer.phone} <br />
                                            </>
                                        )}
                                        {selectedOrder?.customer.address && (
                                            <>
                                                <strong>Address:</strong> {selectedOrder.customer.address}
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Items */}
                                <div>
                                    <h4 className="font-semibold mb-2">Items:</h4>
                                    <ul className="space-y-1">
                                        {selectedOrder?.items.map((item) => (
                                            <li key={item._id}>
                                                {item.title} - {item.quantity} x &#x09F3;{item.price} = &#x09F3;{item.quantity * item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Total */}
                                <p className="mt-4 font-semibold">Total: &#x09F3;{selectedOrder?.total}</p>
                            </div>

                            <DialogFooter className="mt-6">
                                <Button onClick={() => setOpenOrderModal(false)} variant="neutral" >
                                    <X />Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <div className="h-[400px] w-full overflow-auto border border-gray-200 rounded-md">
                        <div className="min-w-max">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-4">
                                                No orders found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <TableRow key={order.orderID + order._id}>
                                                <TableCell>{order.orderID}</TableCell>
                                                <TableCell>{order.customer.name}</TableCell>
                                                <TableCell>৳{order.total}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(v) => handleStatusChange(order.orderID, v as Order["status"])}
                                                    >
                                                        <SelectTrigger className="w-[120px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {["pending", "paid", "approved", "shipped", "cancelled", "delivered"].map((s) => (
                                                                <SelectItem key={s} value={s}>
                                                                    {s[0].toUpperCase() + s.slice(1)}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Button size="sm" onClick={() => { setSelectedOrder(order); setOpenOrderModal(true); }}>
                                                        <View /> View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>

                {/* Products Table */}
                <TabsContent value="products" className="pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Manage Products</h2>
                        <Button onClick={() => setOpenAddModal(true)}>
                            <Plus /> Add Product
                        </Button>
                    </div>

                    {/* Add Product Modal */}
                    <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
                        <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-200 shadow-lg">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-cyan-700">
                                    Add New Product
                                </DialogTitle>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {/* Title */}
                                <div className="col-span-1 md:col-span-2">
                                    <Label className="text-sm text-gray-700">Title</Label>
                                    <Input
                                        className="border-cyan-500 focus:border-0"
                                        placeholder="Enter product title"
                                        value={newProduct.title}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, title: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-span-1 md:col-span-2">
                                    <Label className="text-sm text-gray-700">Description</Label>
                                    <Textarea
                                        className="border-cyan-500 focus:border-0"
                                        rows={3}
                                        placeholder="Enter a short description"
                                        value={newProduct.description || ""}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, description: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <Label className="text-sm text-gray-700">Price</Label>
                                    <Input
                                        className="border-cyan-500 focus:border-0"
                                        type="number"
                                        placeholder="Enter price"
                                        value={newProduct.price}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, price: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <Label className="text-sm text-gray-700">Category</Label>
                                    <Select
                                        value={newProduct.category}
                                        onValueChange={(v) =>
                                            setNewProduct({ ...newProduct, category: v })
                                        }
                                    >
                                        <SelectTrigger className="border-cyan-500 focus:border-0">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Microcontroller">Microcontroller</SelectItem>
                                            <SelectItem value="Sensor">Sensor</SelectItem>
                                            <SelectItem value="Actuator">Actuator</SelectItem>
                                            <SelectItem value="Misc">Misc</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Stock */}
                                <div>
                                    <Label className="text-sm text-gray-700">Stock</Label>
                                    <Input
                                        className="border-cyan-500 focus:border-0"
                                        type="number"
                                        placeholder="Available quantity"
                                        value={newProduct.stock}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, stock: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Features */}
                                <div className="col-span-1 md:col-span-2">
                                    <Label className="text-sm text-gray-700">Features</Label>
                                    <Textarea
                                        className="border-cyan-500 focus:border-0"
                                        placeholder="Enter comma separated features (e.g. Bluetooth,WiFi,GPS)"
                                        rows={3}
                                        value={newProduct.featuresInput}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                featuresInput: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Diagrams */}
                                <div className="col-span-1 md:col-span-2">
                                    <Label className="text-sm text-gray-700">Diagram Image URLs</Label>
                                    <Textarea
                                        className="border-cyan-500 focus:border-0"
                                        placeholder="Enter comma separated URLs"
                                        rows={3}
                                        value={newProduct.diagramsInput}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                diagramsInput: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="col-span-1 md:col-span-2">
                                    <Label className="text-sm text-gray-700">Product Image</Label>
                                    <Input
                                        className="border-cyan-500 focus:border-0"
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const formData = new FormData();
                                            formData.append("file", file);
                                            formData.append(
                                                "upload_preset",
                                                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
                                            );
                                            formData.append("folder", "products");

                                            try {
                                                toast.loading("Uploading image...");
                                                const res = await fetch(
                                                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                                    { method: "POST", body: formData }
                                                );
                                                const data = await res.json();
                                                toast.dismiss();
                                                if (data.secure_url) {
                                                    setNewProduct((prev) => ({ ...prev, image: data.secure_url }));
                                                    toast.success("Image uploaded successfully!");
                                                } else toast.error("Upload failed!");
                                            } catch (err) {
                                                toast.dismiss();
                                                toast.error("Image upload failed!");
                                                console.error(err);
                                            }
                                        }}
                                    />

                                    {newProduct.image && (
                                        <div className="mt-3 flex items-center gap-3">
                                            <Image
                                                width={96}
                                                height={96}
                                                src={newProduct.image}
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded-md border border-cyan-200 shadow-sm"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    setNewProduct((prev) => ({ ...prev, image: "" }))
                                                }
                                            >
                                                <Trash /> Remove
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Featured */}
                                <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-2">
                                    <Checkbox
                                        checked={newProduct.featured}
                                        onCheckedChange={(v) =>
                                            setNewProduct({ ...newProduct, featured: Boolean(v) })
                                        }
                                    />
                                    <Label className="text-sm text-gray-700">
                                        Mark as Featured Product
                                    </Label>
                                </div>
                            </div>

                            <DialogFooter className="mt-6 sticky bottom-0 bg-white pt-3">
                                <Button onClick={handleAddProduct} className="w-full">
                                    <SaveIcon /> Add Product
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/*  Edit Product Modal */}
                    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
                        <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-200 shadow-lg">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-cyan-700">
                                    Edit Product
                                </DialogTitle>
                            </DialogHeader>

                            {selectedProduct && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {/* Title */}
                                    <div className="col-span-1 md:col-span-2">
                                        <Label>Title</Label>
                                        <Input
                                            className="border-cyan-500 focus:border-0"
                                            value={selectedProduct.title}
                                            onChange={(e) =>
                                                setSelectedProduct({ ...selectedProduct, title: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-1 md:col-span-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            className="border-cyan-500 focus:border-0"
                                            value={selectedProduct.description || ""}
                                            onChange={(e) =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <Label>Price</Label>
                                        <Input
                                            className="border-cyan-500 focus:border-0"
                                            type="number"
                                            value={selectedProduct.price}
                                            onChange={(e) =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    price: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <Label>Category</Label>
                                        <Select
                                            value={selectedProduct.category}
                                            onValueChange={(v) =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    category: v as ProductState["category"],
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Microcontroller">Microcontroller</SelectItem>
                                                <SelectItem value="Sensor">Sensor</SelectItem>
                                                <SelectItem value="Actuator">Actuator</SelectItem>
                                                <SelectItem value="Misc">Misc</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <Label>Stock</Label>
                                        <Input
                                            className="border-cyan-500 focus:border-0"
                                            type="number"
                                            value={selectedProduct.stock}
                                            onChange={(e) =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    stock: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Features */}
                                    <div className="col-span-1 md:col-span-2">
                                        <Label className="text-sm text-gray-700">Features</Label>
                                        <Textarea
                                            className="border-cyan-500 focus:border-0"
                                            placeholder="Enter comma separated features"
                                            rows={3}
                                            value={selectedProduct.featuresInput || ""}
                                            onChange={(e) =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    featuresInput: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Diagrams */}
                                    <div className="col-span-1 md:col-span-2">
                                        <Label className="text-sm text-gray-700">Diagram Image URLs</Label>
                                        <Textarea
                                            className="border-cyan-500 focus:border-0"
                                            placeholder="Enter comma separated diagram URLs"
                                            rows={3}
                                            value={selectedProduct.diagramsInput || ""}
                                            onChange={(e) =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    diagramsInput: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="col-span-1 md:col-span-2">
                                        <Label>Product Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                const formData = new FormData();
                                                formData.append("file", file);
                                                formData.append(
                                                    "upload_preset",
                                                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
                                                );
                                                formData.append("folder", "products");

                                                try {
                                                    toast.loading("Uploading image...");
                                                    const res = await fetch(
                                                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                                        { method: "POST", body: formData }
                                                    );
                                                    const data = await res.json();
                                                    toast.dismiss();
                                                    if (data.secure_url) {
                                                        setSelectedProduct((prev) =>
                                                            prev ? { ...prev, image: data.secure_url } : null
                                                        );
                                                        toast.success("Image updated successfully!");
                                                    } else toast.error("Upload failed!");
                                                } catch (err) {
                                                    toast.dismiss();
                                                    toast.error("Image upload failed!");
                                                    console.error(err);
                                                }
                                            }}
                                        />

                                        {selectedProduct.image && (
                                            <div className="mt-3 flex items-center gap-3">
                                                <Image
                                                    width={96}
                                                    height={96}
                                                    src={selectedProduct.image}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-md border border-cyan-200 shadow-sm"
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        setSelectedProduct((prev) =>
                                                            prev ? { ...prev, image: "" } : null
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Featured */}
                                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-2">
                                        <Checkbox
                                            checked={selectedProduct.featured}
                                            onCheckedChange={(v) =>
                                                setSelectedProduct((prev) =>
                                                    prev ? { ...prev, featured: Boolean(v) } : null
                                                )
                                            }
                                        />
                                        <Label>Mark as Featured Product</Label>
                                    </div>
                                </div>
                            )}

                            <DialogFooter className="mt-6 sticky bottom-0 bg-white pt-3">
                                <Button onClick={handleEditProduct} className="w-full">
                                    <Save /> Save Changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Product Table */}
                    <div className="h-[400px] w-full overflow-auto border border-gray-200 rounded-md">
                        <div className="min-w-max">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <TableRow key={product._id}>
                                                <TableCell>{product.title}</TableCell>
                                                <TableCell>৳{product.price}</TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell>{product.stock}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => openEdit(product)}
                                                    >
                                                        <Edit /> Edit
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button size="sm" variant="neutral">
                                                                <Trash /> Delete
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. The product will be permanently deleted.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={async () => {
                                                                        try {
                                                                            const res = await fetch(`/api/products/delete?id=${product._id}`, {
                                                                                method: "DELETE",
                                                                            });
                                                                            const data = await res.json();
                                                                            if (res.ok) {
                                                                                toast.success(data.message);
                                                                                setProducts(products.filter((p) => p._id !== product._id));
                                                                            } else toast.error(data.message);
                                                                        } catch {
                                                                            toast.error("Delete failed!");
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash /> Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-gray-500">
                                                No products found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>

                {/* Users Table */}
                <TabsContent value="users" className="pt-4">
                    <div className="h-[400px] w-full overflow-auto border border-gray-200 rounded-md">
                        <div className="min-w-max">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.displayName || "No Name"}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="neutral">
                                                    {user.role[0].toUpperCase() + user.role.slice(1)}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    );
}