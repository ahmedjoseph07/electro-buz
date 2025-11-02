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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Recharts
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminDashboard() {
    const { user } = useAppSelector((s) => s.auth);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [orderFilter, setOrderFilter] = useState("1month");
    const router = useRouter();
    const [openAddModal, setOpenAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        featured: false,
    });


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

    if (!isAdmin) return null;

    // --- Dummy Analytics Data ---
    const salesData = [
        { month: "Jan", sales: 2400 },
        { month: "Feb", sales: 3200 },
        { month: "Mar", sales: 1800 },
        { month: "Apr", sales: 4000 },
        { month: "May", sales: 3000 },
        { month: "Jun", sales: 3700 },
    ];

    const productData = [
        { name: "Electronics", count: 45 },
        { name: "Fashion", count: 30 },
        { name: "Home", count: 22 },
        { name: "Books", count: 15 },
    ];

    // --- Add Product Handler ---
    const handleAddProduct = async () => {
        if (!newProduct.title || !newProduct.price || !newProduct.category) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("/api/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...newProduct}),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Product added successfully!");
                setOpenAddModal(false);
                setNewProduct({
                    title: "",
                    description: "",
                    price: "",
                    category: "",
                    stock: "",
                    featured: false,
                });
            } else {
                toast.warning(data.message);
            }
        } catch (err) {
            toast.error("Server error while adding product");
        }
    };

    return (
        <div className="mt-20 p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-600">Manage products, orders, and users efficiently.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Orders", value: "120", desc: "Orders this month" },
                    { title: "Pending Orders", value: "35", desc: "Awaiting approval" },
                    { title: "Total Products", value: "45", desc: "Active store items" },
                    { title: "Total Users", value: "250", desc: "Registered users" },
                ].map((item, idx) => (
                    <Card key={idx} className="bg-white border border-cyan-200">
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                <Line type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border border-cyan-200">
                    <CardHeader>
                        <CardTitle>Products by Category</CardTitle>
                        <CardDescription>Inventory distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={productData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#0891b2" radius={[5, 5, 0, 0]} />
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
                                <SelectItem value="1month">Last 1 Month</SelectItem>
                                <SelectItem value="3months">Last 3 Months</SelectItem>
                                <SelectItem value="6months">Last 6 Months</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <ScrollArea className="h-[400px] w-full">
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
                                {[...Array(10)].map((_, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>#ORD{1000 + idx}</TableCell>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>৳{(idx + 1) * 500}</TableCell>
                                        <TableCell>
                                            <Badge>
                                                {idx % 2 === 0 ? "Pending" : "Approved"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </TabsContent>

                {/* Products Table */}
                <TabsContent value="products" className="pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Manage Products</h2>
                        <div className="flex gap-2">
                            <Button onClick={() => setOpenAddModal(true)} ><Plus /> Add Product</Button>
                            <Button>Feature Product</Button>
                        </div>
                    </div>

                    {/* Add Product Modal */}
                    <Dialog open={openAddModal} onOpenChange={setOpenAddModal}> 
                        <DialogContent className="max-w-md rounded-2xl border border-cyan-200 shadow-lg">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-cyan-700">
                                    Add New Product
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 mt-4">
                                {/* Title */}
                                <div>
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
                                <div>
                                    <Label className="text-sm text-gray-700">Description</Label>
                                    <Textarea
                                        className="border-cyan-500 focus:border-0"
                                        rows={3}
                                        placeholder="Enter a short description"
                                        value={(newProduct as any).description || ""}
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

                                {/* Category (shadcn Select) */}
                                <div className="border-cyan-500 focus:border-0">
                                    <Label className="text-sm text-gray-700">Category</Label>

                                    <Select

                                        value={newProduct.category}
                                        onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}
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

                                {/* Image Upload */}
                                <div>
                                    <Label className="text-sm text-gray-700">Product Image</Label>
                                    <Input
                                        className="border-cyan-500 focus:border-0"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () =>
                                                    setNewProduct({
                                                        ...newProduct,
                                                        image: reader.result as string,
                                                    });
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    {newProduct.image && (
                                        <img
                                            src={newProduct.image}
                                            alt="Preview"
                                            className="mt-2 w-24 h-24 object-cover rounded-md border"
                                        />
                                    )}
                                </div>

                                {/* Featured */}
                                <div className="flex items-center gap-2">
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

                            <DialogFooter className="mt-6">
                                <Button onClick={handleAddProduct} className="w-full">
                                    Save Product
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>


                    {/* Table */}
                    <ScrollArea className="h-[400px] w-full">
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
                                {[...Array(10)].map((_, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>Product {idx + 1}</TableCell>
                                        <TableCell>৳{(idx + 1) * 100}</TableCell>
                                        <TableCell>Category {idx % 3}</TableCell>
                                        <TableCell>{Math.floor(Math.random() * 50)}</TableCell>
                                        <TableCell>
                                            <Button size="sm">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </TabsContent>

                {/* Users Table */}
                <TabsContent value="users" className="pt-4">
                    <ScrollArea className="h-[400px] w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[...Array(10)].map((_, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>User {idx + 1}</TableCell>
                                        <TableCell>user{idx}@example.com</TableCell>
                                        <TableCell>
                                            <Badge>
                                                {idx % 2 === 0 ? "user" : "admin"}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
}
