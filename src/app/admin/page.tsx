"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp, Order, Product } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sliders,
  ShoppingBag,
  TrendingUp,
  Scissors,
  Truck,
  Users,
  CheckCircle,
  Clock,
  Printer,
  Edit,
  Trash2,
  PlusCircle,
  X,
  AlertOctagon,
  ChevronRight,
  Package
} from "lucide-react";

export default function AdminDashboard() {
  const {
    orders,
    products,
    updateOrderStatus,
    addMockProduct,
    editMockProduct,
    deleteMockProduct,
    userRole,
    setUserRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<"orders" | "products" | "analytics">("orders");
  
  // States for Order edits
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [courier, setCourier] = useState("DHL Express");
  const [trackingNo, setTrackingNo] = useState("");

  // States for Product forms
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product form fields
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState<"Kaftan" | "Senator" | "Agbada" | "Native">("Kaftan");
  const [pPrice, setPPrice] = useState<number>(150);
  const [pDesc, setPDesc] = useState("");
  
  // Analytics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentDetails.status === "paid" ? o.total : 0), 0);
  const pendingRevenue = orders.reduce((sum, o) => sum + (o.paymentDetails.status === "pending" ? o.total : 0), 0);
  const activeSewerSlots = orders.filter((o) => ["tailoring", "embroidery"].includes(o.shippingDetails.status)).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pDesc || pPrice <= 0) return;

    addMockProduct({
      name: pName,
      category: pCategory,
      price: pPrice,
      description: pDesc,
      images: ["/images/kaftan-beige.webp"],
      colors: [
        { name: "Obsidian Black", hex: "#111827" },
        { name: "Cream White", hex: "#FFFBEB" }
      ],
      fabrics: [
        { name: "Polished Cotton", priceModifier: 0 },
        { name: "Pure Linen", priceModifier: 30 }
      ],
      sizes: ["S", "M", "L", "XL"],
      featured: false,
      stock: 15
    });

    // Reset Form
    setPName("");
    setPDesc("");
    setPPrice(150);
    setIsAddingProduct(false);
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    editMockProduct(editingProduct);
    setEditingProduct(null);
  };

  const handlePrintSlip = (order: Order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsContent = order.items
      .map(
        (item) => `
      <div style="border-bottom: 1px dashed #ccc; padding: 10px 0;">
        <h3 style="margin: 0;">${item.product.name} (Qty: ${item.quantity})</h3>
        <p style="margin: 5px 0; font-size: 13px;">Color: ${item.selectedColor.name} | Fabric: ${item.selectedFabric.name}</p>
        ${
          item.customMeasurements
            ? `
          <table style="width: 100%; font-size: 12px; border-collapse: collapse; margin-top: 5px;">
            <tr style="background: #f5f5f5;">
              <th style="padding: 4px; border: 1px solid #ddd;">Chest</th>
              <th style="padding: 4px; border: 1px solid #ddd;">Shoulder</th>
              <th style="padding: 4px; border: 1px solid #ddd;">Sleeve</th>
              <th style="padding: 4px; border: 1px solid #ddd;">Length</th>
              <th style="padding: 4px; border: 1px solid #ddd;">Neck</th>
            </tr>
            <tr>
              <td style="padding: 4px; border: 1px solid #ddd; text-align: center;">${item.customMeasurements.chest}"</td>
              <td style="padding: 4px; border: 1px solid #ddd; text-align: center;">${item.customMeasurements.shoulder}"</td>
              <td style="padding: 4px; border: 1px solid #ddd; text-align: center;">${item.customMeasurements.sleeve}"</td>
              <td style="padding: 4px; border: 1px solid #ddd; text-align: center;">${item.customMeasurements.length}"</td>
              <td style="padding: 4px; border: 1px solid #ddd; text-align: center;">${item.customMeasurements.neck}"</td>
            </tr>
          </table>
        `
            : `<p style="margin: 5px 0; font-size: 13px;">Sizing: Standard Size ${item.selectedSize}</p>`
        }
      </div>
    `
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Packing Slip - ${order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #333; }
            h2 { border-bottom: 2px solid #333; padding-bottom: 8px; }
          </style>
        </head>
        <body>
          <h2>Northeastern Stitch Co. - Tailoring Packing Slip</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Date:</strong> ${order.date}</p>
          <p><strong>Customer:</strong> ${order.customerDetails.name} (${order.customerDetails.email})</p>
          <p><strong>Delivery Location:</strong> ${order.customerDetails.address}, ${order.customerDetails.city}, ${order.customerDetails.country}</p>
          <p><strong>Notes:</strong> ${order.customerDetails.instructions || "None"}</p>
          
          <h3 style="margin-top: 30px; border-bottom: 1px solid #333; padding-bottom: 4px;">Items for Cut & Sewing:</h3>
          ${itemsContent}
          
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Guard Clause for Admin access restriction
  if (userRole !== "admin") {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 bg-brand-white">
          <div className="bg-white border border-brand-linen rounded-3xl p-8 shadow-md max-w-md text-center space-y-6">
            <div className="p-4 bg-red-50 text-red-500 rounded-full max-w-max mx-auto">
              <AlertOctagon className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-brand-brown">Access Restriction</h2>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                You are currently browsing in **Customer Mode**. The admin dashboard holds workspace order queues, fabric adjustments, and revenue metrics.
              </p>
            </div>

            <div className="border-t border-brand-linen pt-6">
              <button
                onClick={() => setUserRole("admin")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-brown hover:bg-brand-brown-light text-brand-white py-3.5 text-xs font-bold shadow-md transition-colors"
              >
                <Sliders className="h-4 w-4" />
                <span>Toggle Admin Mode Control</span>
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-brand-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown">
                Studio Workspace Manager
              </h1>
              <p className="text-xs font-semibold text-brand-sage uppercase tracking-wider mt-1">
                Monitor stitching queues, adjust inventory, and review analytics
              </p>
            </div>

            {/* Dashboard Tabs Toggle */}
            <div className="flex rounded-lg border border-brand-linen bg-white p-0.5 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeTab === "orders" ? "bg-brand-brown text-brand-white shadow" : "text-brand-charcoal/60 hover:text-brand-brown"
                }`}
              >
                Stitching Queue ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeTab === "products" ? "bg-brand-brown text-brand-white shadow" : "text-brand-charcoal/60 hover:text-brand-brown"
                }`}
              >
                Attire Catalog ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeTab === "analytics" ? "bg-brand-brown text-brand-white shadow" : "text-brand-charcoal/60 hover:text-brand-brown"
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Tab 1: Stitching Queue Orders */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              
              {/* Analytics strip for queue */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-brand-linen rounded-2xl p-4 flex items-center gap-4 shadow-xs">
                  <div className="p-3 bg-brand-sage/20 text-brand-sage rounded-full"><Scissors className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Active Sewing Jobs</span>
                    <p className="text-xl font-bold text-brand-brown">{activeSewerSlots} Orders</p>
                  </div>
                </div>
                <div className="bg-white border border-brand-linen rounded-2xl p-4 flex items-center gap-4 shadow-xs">
                  <div className="p-3 bg-brand-tuscan/20 text-brand-tuscan rounded-full"><Clock className="h-5 w-5 animate-pulse" /></div>
                  <div>
                    <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Awaiting Bank Verify</span>
                    <p className="text-xl font-bold text-brand-brown">
                      {orders.filter((o) => o.paymentDetails.status === "pending").length} Orders
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-brand-linen rounded-2xl p-4 flex items-center gap-4 shadow-xs">
                  <div className="p-3 bg-brand-brown/20 text-brand-brown rounded-full"><TrendingUp className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Paid Tunic Queue</span>
                    <p className="text-xl font-bold text-brand-brown">€{totalRevenue}</p>
                  </div>
                </div>
              </div>

              {/* Orders Queue Table List */}
              <div className="bg-white border border-brand-linen rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 text-xs font-bold text-brand-brown border-b border-brand-linen uppercase tracking-wider">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Attires Ordered</th>
                        <th className="p-4">Production Stage</th>
                        <th className="p-4">Total Price</th>
                        <th className="p-4">Timeline Update</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-brand-linen/60 text-brand-charcoal">
                      {orders.map((order) => (
                        <React.Fragment key={order.id}>
                          <tr className={`hover:bg-brand-linen/10 transition-colors ${
                            expandedOrderId === order.id ? "bg-brand-linen/10" : ""
                          }`}>
                            <td className="p-4 font-bold text-brand-brown">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                                }
                                className="hover:underline flex items-center gap-1 text-left"
                              >
                                {order.id}
                                <ChevronRight className={`h-3 w-3 transform transition-transform ${
                                  expandedOrderId === order.id ? "rotate-90" : ""
                                }`} />
                              </button>
                            </td>
                            <td className="p-4">
                              <p className="font-bold">{order.customerDetails.name}</p>
                              <p className="text-[10px] text-brand-charcoal/50">{order.customerDetails.country}</p>
                            </td>
                            <td className="p-4 font-semibold text-brand-brown">
                              {order.items.length} Attire(s)
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase ${
                                order.shippingDetails.status === "delivered"
                                  ? "bg-brand-sage text-white"
                                  : order.shippingDetails.status === "shipped"
                                    ? "bg-blue-600 text-white"
                                    : order.shippingDetails.status === "embroidery"
                                      ? "bg-brand-tuscan text-white animate-pulse"
                                      : "bg-brand-brown text-white"
                              }`}>
                                {order.shippingDetails.status}
                              </span>
                            </td>
                            <td className="p-4 font-bold">€{order.total}</td>
                            <td className="p-4">
                              <div className="relative">
                                <select
                                  value={order.shippingDetails.status}
                                  onChange={(e) =>
                                    updateOrderStatus(
                                      order.id,
                                      e.target.value as Order["shippingDetails"]["status"]
                                    )
                                  }
                                  className="border border-brand-linen bg-white rounded-lg p-1.5 text-xs text-brand-brown focus:outline-brand-tuscan cursor-pointer"
                                >
                                  <option value="pending">Placed (Pending)</option>
                                  <option value="tailoring">Cutting & Sewing</option>
                                  <option value="embroidery">Embroidery Studio</option>
                                  <option value="shipped">Hand to Courier (Shipped)</option>
                                  <option value="delivered">Delivered Successfully</option>
                                </select>
                              </div>
                            </td>
                          </tr>

                          {/* Expanded Order Custom Details Row */}
                          {expandedOrderId === order.id && (
                            <tr>
                              <td colSpan={6} className="bg-stone-50/50 p-6 border-t border-brand-linen/60">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                  
                                  {/* Custom dimensions or size selection details */}
                                  <div className="md:col-span-6 space-y-3">
                                    <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-brown flex items-center gap-1">
                                      <Scissors className="h-4 w-4 text-brand-sage" /> Custom Sizing Specifications
                                    </h4>

                                    <div className="bg-white border border-brand-linen rounded-xl p-4 space-y-3 shadow-xs">
                                      {order.items.map((item, idx) => (
                                        <div key={item.id} className="pb-3 border-b border-brand-linen/40 last:pb-0 last:border-0">
                                          <p className="font-bold text-brand-brown text-xs">{item.product.name} (Size: {item.selectedSize})</p>
                                          
                                          {item.customMeasurements ? (
                                            <div className="grid grid-cols-5 gap-2 text-center mt-2">
                                              <div className="bg-brand-linen/10 rounded p-1.5">
                                                <span className="block text-[8px] text-brand-charcoal/50">Chest</span>
                                                <span className="font-bold text-brand-brown">{item.customMeasurements.chest}"</span>
                                              </div>
                                              <div className="bg-brand-linen/10 rounded p-1.5">
                                                <span className="block text-[8px] text-brand-charcoal/50">Shoulder</span>
                                                <span className="font-bold text-brand-brown">{item.customMeasurements.shoulder}"</span>
                                              </div>
                                              <div className="bg-brand-linen/10 rounded p-1.5">
                                                <span className="block text-[8px] text-brand-charcoal/50">Sleeve</span>
                                                <span className="font-bold text-brand-brown">{item.customMeasurements.sleeve}"</span>
                                              </div>
                                              <div className="bg-brand-linen/10 rounded p-1.5">
                                                <span className="block text-[8px] text-brand-charcoal/50">Length</span>
                                                <span className="font-bold text-brand-brown">{item.customMeasurements.length}"</span>
                                              </div>
                                              <div className="bg-brand-linen/10 rounded p-1.5">
                                                <span className="block text-[8px] text-brand-charcoal/50">Neck</span>
                                                <span className="font-bold text-brand-brown">{item.customMeasurements.neck}"</span>
                                              </div>
                                            </div>
                                          ) : (
                                            <p className="text-[10px] text-brand-charcoal/60 mt-1">
                                              Standard European Size guidelines apply. No custom measures required.
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Shipment Details input (DHL Courier details) */}
                                  <div className="md:col-span-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                      <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-brown flex items-center gap-1">
                                        <Truck className="h-4 w-4 text-brand-tuscan" /> Shipping Logistics Update
                                      </h4>
                                      
                                      <button
                                        onClick={() => handlePrintSlip(order)}
                                        className="inline-flex items-center gap-1 bg-brand-linen/40 hover:bg-brand-linen/60 text-brand-brown px-3 py-1.5 rounded-lg font-bold"
                                        title="Print work invoice details for sewers"
                                      >
                                        <Printer className="h-3.5 w-3.5" /> Print Packing Slip
                                      </button>
                                    </div>

                                    {/* Courier Partner Form */}
                                    <div className="bg-white border border-brand-linen rounded-xl p-4 shadow-xs space-y-3">
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal mb-1">Courier Carrier</label>
                                        <input
                                          type="text"
                                          value={courier}
                                          onChange={(e) => setCourier(e.target.value)}
                                          placeholder="e.g. DHL Express, FedEx"
                                          className="w-full p-2 border border-brand-linen rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal mb-1">Tracking Number</label>
                                        <input
                                          type="text"
                                          value={trackingNo}
                                          onChange={(e) => setTrackingNo(e.target.value)}
                                          placeholder="e.g. DHL-980018-NES"
                                          className="w-full p-2 border border-brand-linen rounded-lg"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          updateOrderStatus(order.id, "shipped", courier, trackingNo);
                                          alert("Logistics tracking details synced to Customer timeline!");
                                        }}
                                        className="w-full bg-brand-tuscan text-white hover:bg-brand-tuscan-dark font-bold py-2 rounded-lg"
                                      >
                                        Sync Courier Info to Client
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Attire Catalog Product Management */}
          {activeTab === "products" && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown">
                  Studio Catalog Items
                </h3>
                
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="inline-flex items-center gap-1.5 bg-brand-sage hover:bg-brand-sage-dark text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  <PlusCircle className="h-4 w-4" /> Add Product Style
                </button>
              </div>

              {/* Add Product Modal Form */}
              {isAddingProduct && (
                <div className="bg-stone-50 border border-brand-linen rounded-2xl p-6 relative shadow-inner">
                  <button
                    onClick={() => setIsAddingProduct(false)}
                    className="absolute top-4 right-4 text-brand-charcoal/40 hover:text-brand-brown"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown mb-4">
                    Create Bespoke Product Silhouette
                  </h4>

                  <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-brand-charcoal mb-1">Style Name</label>
                      <input
                        type="text"
                        required
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                        placeholder="e.g. Royal Gold Agbada"
                        className="w-full p-2 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-charcoal mb-1">Category Type</label>
                      <select
                        value={pCategory}
                        onChange={(e) => setPCategory(e.target.value as any)}
                        className="w-full p-2 border border-brand-linen rounded-lg bg-white"
                      >
                        <option value="Kaftan">Kaftan</option>
                        <option value="Senator">Senator Wear</option>
                        <option value="Agbada">Agbada</option>
                        <option value="Native">Native Silhouette</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-brand-charcoal mb-1">Base Price (€)</label>
                      <input
                        type="number"
                        required
                        value={pPrice}
                        onChange={(e) => setPPrice(Number(e.target.value))}
                        className="w-full p-2 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block font-bold text-brand-charcoal mb-1">Style Description</label>
                      <textarea
                        rows={2}
                        required
                        value={pDesc}
                        onChange={(e) => setPDesc(e.target.value)}
                        placeholder="Detail materials, embroidery borders, fits guidelines..."
                        className="w-full p-2.5 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingProduct(false)}
                        className="border border-brand-linen px-4 py-2 rounded-lg font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-brand-brown text-white hover:bg-brand-brown-light px-5 py-2 rounded-lg font-bold"
                      >
                        Create Style
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Edit Product sub-form */}
              {editingProduct && (
                <div className="bg-amber-50/50 border border-brand-tuscan/30 rounded-2xl p-6 relative shadow-inner">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="absolute top-4 right-4 text-brand-charcoal/40 hover:text-brand-brown"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown mb-4">
                    Modify Product Style: {editingProduct.name}
                  </h4>

                  <form onSubmit={handleEditProductSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-brand-charcoal mb-1">Style Name</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full p-2 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-charcoal mb-1">Base Price (€)</label>
                      <input
                        type="number"
                        required
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full p-2 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-charcoal mb-1">Stock Level Slots</label>
                      <input
                        type="number"
                        required
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                        className="w-full p-2 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block font-bold text-brand-charcoal mb-1">Description</label>
                      <textarea
                        rows={2}
                        required
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full p-2.5 border border-brand-linen rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="border border-brand-linen px-4 py-2 rounded-lg font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-brand-tuscan text-white hover:bg-brand-tuscan-dark px-5 py-2 rounded-lg font-bold"
                      >
                        Save Adjustments
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table list */}
              <div className="bg-white border border-brand-linen rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 text-xs font-bold text-brand-brown border-b border-brand-linen uppercase tracking-wider">
                        <th className="p-4">Design Item</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Base Cost</th>
                        <th className="p-4">Fabric Variants</th>
                        <th className="p-4">Stock Slots</th>
                        <th className="p-4 text-center">Manage</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-brand-linen/60 text-brand-charcoal">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-brand-linen/10 transition-colors">
                          <td className="p-4 font-bold text-brand-brown flex items-center gap-2">
                            <span className="h-8 w-7 rounded bg-brand-linen/30 border border-brand-linen/50 flex items-center justify-center text-[8px] uppercase tracking-tighter">
                              {p.category}
                            </span>
                            <span className="truncate max-w-[160px]">{p.name}</span>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex rounded-full bg-brand-brown/10 text-brand-brown px-2 py-0.5 text-[9px] font-bold uppercase">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold">€{p.price}</td>
                          <td className="p-4 text-[10px] text-brand-charcoal/70">
                            {p.fabrics.map((f) => f.name).join(", ")}
                          </td>
                          <td className="p-4 font-semibold">{p.stock} Slots</td>
                          <td className="p-4 text-center space-x-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="inline-flex items-center justify-center p-1.5 border border-brand-linen bg-white hover:bg-stone-50 text-brand-sage rounded-lg"
                              title="Edit item pricing and details"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                  deleteMockProduct(p.id);
                                }
                              }}
                              className="inline-flex items-center justify-center p-1.5 border border-brand-linen bg-white hover:bg-red-50 text-red-500 rounded-lg"
                              title="Delete from studio catalog"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: Sales Analytics Dashboard */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              
              {/* Stat boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="bg-white border border-brand-linen rounded-2xl p-5 shadow-xs">
                  <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Processed Revenue</span>
                  <p className="text-2xl font-serif font-bold text-brand-brown mt-1">€{totalRevenue}</p>
                  <span className="text-[9px] text-brand-sage font-bold">★ Verified Clear Receipts</span>
                </div>
                <div className="bg-white border border-brand-linen rounded-2xl p-5 shadow-xs">
                  <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Escrow / Pending</span>
                  <p className="text-2xl font-serif font-bold text-brand-brown mt-1">€{pendingRevenue}</p>
                  <span className="text-[9px] text-brand-tuscan font-bold">★ Awaiting Bank Transfer</span>
                </div>
                <div className="bg-white border border-brand-linen rounded-2xl p-5 shadow-xs">
                  <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Order Conversions</span>
                  <p className="text-2xl font-serif font-bold text-brand-brown mt-1">
                    {orders.length} Completed
                  </p>
                  <span className="text-[9px] text-brand-sage font-bold">★ 100% completion rate</span>
                </div>
                <div className="bg-white border border-brand-linen rounded-2xl p-5 shadow-xs">
                  <span className="text-[10px] text-brand-charcoal/50 uppercase font-bold">Customer Retention</span>
                  <p className="text-2xl font-serif font-bold text-brand-brown mt-1">94.2%</p>
                  <span className="text-[9px] text-brand-sage font-bold">★ Diaspora Loyalty</span>
                </div>
              </div>

              {/* Best sellers chart list representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Best sellers metrics */}
                <div className="bg-white border border-brand-linen rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown border-b border-brand-linen pb-3">
                    Top Tailored Silhouettes
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-brand-brown">
                        <span>Royal Agbadas</span>
                        <span>42% of Sales</span>
                      </div>
                      <div className="h-2 w-full bg-brand-linen/40 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-tuscan rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-brand-brown">
                        <span>Senator Wears</span>
                        <span>35% of Sales</span>
                      </div>
                      <div className="h-2 w-full bg-brand-linen/40 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-sage rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-brand-brown">
                        <span>Heritage Kaftans</span>
                        <span>18% of Sales</span>
                      </div>
                      <div className="h-2 w-full bg-brand-linen/40 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-brown rounded-full" style={{ width: "18%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-brand-brown">
                        <span>Native geometric suits</span>
                        <span>5% of Sales</span>
                      </div>
                      <div className="h-2 w-full bg-brand-linen/40 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-charcoal rounded-full" style={{ width: "5%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country distribution metrics */}
                <div className="bg-white border border-brand-linen rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown border-b border-brand-linen pb-3">
                    Diaspora Order Destinies
                  </h3>

                  <div className="space-y-3.5 text-xs text-brand-charcoal">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-tuscan" />
                        <span className="font-semibold text-brand-brown">United Kingdom</span>
                      </div>
                      <span className="font-bold">48 Orders</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-sage" />
                        <span className="font-semibold text-brand-brown">Germany & France</span>
                      </div>
                      <span className="font-bold">32 Orders</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-brown" />
                        <span className="font-semibold text-brand-brown">United States & Canada</span>
                      </div>
                      <span className="font-bold">25 Orders</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-charcoal" />
                        <span className="font-semibold text-brand-brown">Netherlands & Ireland</span>
                      </div>
                      <span className="font-bold">14 Orders</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
