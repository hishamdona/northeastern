"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useApp, Order } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Scissors,
  CheckCircle,
  Clock,
  Shirt,
  Flame,
  Truck,
  Package,
  Calendar,
  CreditCard,
  User,
  ExternalLink,
  ChevronRight,
  Search,
  ChevronLeft
} from "lucide-react";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderTrack({ params }: TrackPageProps) {
  const { id } = use(params);
  const { orders } = useApp();

  const [order, setOrder] = useState<Order | null>(null);
  const [searchId, setSearchId] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Load the order from global state context
  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id, orders]);

  // Stage timeline definition mapping
  const timelineStages = [
    {
      key: "pending",
      title: "Order Placed",
      desc: "Tailoring details recorded in studio database.",
      icon: Calendar
    },
    {
      key: "tailoring",
      title: "Cutting & Sewing",
      desc: "Our master tailors are cutting fabrics to your sizing specifications.",
      icon: Scissors
    },
    {
      key: "embroidery",
      title: "Embroidery Studio",
      desc: "Detailed motif embroidery in progress on the Ricoma setup.",
      icon: Shirt
    },
    {
      key: "shipped",
      title: "Shipped out",
      desc: "Attire is packaged and handed over for global transit.",
      icon: Truck
    },
    {
      key: "delivered",
      title: "Delivered",
      desc: "Package delivered safely to destination.",
      icon: Package
    }
  ];

  const getStageIndex = (status: Order["shippingDetails"]["status"]) => {
    switch (status) {
      case "pending": return 0;
      case "tailoring": return 1;
      case "embroidery": return 2;
      case "shipped": return 3;
      case "delivered": return 4;
      default: return 0;
    }
  };

  const currentStageIndex = order ? getStageIndex(order.shippingDetails.status) : 0;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-brand-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {order ? (
            <div className="space-y-8">
              
              {/* Order Confirmation Banner */}
              <div className="bg-brand-brown text-brand-white border border-brand-brown-light rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-tuscan/15 blur-2xl" />
                
                <div className="space-y-2 z-10">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-tuscan bg-brand-tuscan/10 px-2 py-0.5 rounded">
                    ★ Premium Bespoke Flow
                  </span>
                  <h1 className="font-serif text-xl md:text-2xl font-bold">
                    Tailoring ID: {order.id}
                  </h1>
                  <p className="text-xs text-brand-white/70">
                    Placed on: {order.date} | Est. Delivery: {order.shippingDetails.estimatedDelivery || "10 Days"}
                  </p>
                </div>

                <div className="flex flex-col gap-2 z-10 shrink-0">
                  <span className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold ${
                    order.paymentDetails.status === "paid"
                      ? "bg-brand-sage text-white"
                      : "bg-brand-tuscan text-white animate-pulse"
                  }`}>
                    {order.paymentDetails.status === "paid" ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Payment Verified</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-3.5 w-3.5" />
                        <span>Awaiting Bank Approval</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Dynamic Stitch Progress Timeline */}
              <div className="bg-white border border-brand-linen rounded-3xl p-6 md:p-8 shadow-xs space-y-8">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown flex items-center gap-1.5">
                  <Scissors className="h-4.5 w-4.5 text-brand-sage animate-spin-slow" />
                  Tailoring & Production Status Timeline
                </h3>

                {/* Progress Steps layout */}
                <div className="relative pl-8 md:pl-0 md:flex md:justify-between md:items-start space-y-8 md:space-y-0">
                  {/* Background connector line */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-brand-linen md:left-0 md:right-0 md:top-[18px] md:h-0.5 md:w-full -z-10" />

                  {/* Dynamic coloring for filled line */}
                  <div
                    className="absolute left-[15px] top-2 w-0.5 bg-brand-tuscan transition-all duration-500 md:left-0 md:top-[18px] md:h-0.5 -z-10"
                    style={{
                      height: typeof window !== "undefined" && window.innerWidth < 768
                        ? `${(currentStageIndex / 4) * 100}%`
                        : "0.5px",
                      width: typeof window !== "undefined" && window.innerWidth >= 768
                        ? `${(currentStageIndex / 4) * 100}%`
                        : "0.5px"
                    }}
                  />

                  {timelineStages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isCompleted = idx < currentStageIndex;
                    const isActive = idx === currentStageIndex;
                    const isUpcoming = idx > currentStageIndex;

                    return (
                      <div
                        key={stage.key}
                        className="relative flex md:flex-col md:items-center md:text-center gap-4 md:gap-2 flex-1 group"
                      >
                        {/* Circle Indicator */}
                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                          isCompleted
                            ? "bg-brand-sage border-brand-sage text-white scale-[1.05]"
                            : isActive
                              ? "bg-brand-tuscan border-brand-tuscan text-white scale-[1.15] ring-4 ring-brand-tuscan/20 shadow-md"
                              : "bg-white border-brand-linen text-brand-charcoal/30"
                        }`}>
                          <StageIcon className="h-4 w-4" />
                        </div>

                        {/* Text */}
                        <div className="space-y-1 md:max-w-[140px]">
                          <p className={`text-xs font-bold tracking-wide transition-colors ${
                            isActive
                              ? "text-brand-tuscan"
                              : isCompleted
                                ? "text-brand-sage-dark"
                                : "text-brand-charcoal/50"
                          }`}>
                            {stage.title}
                          </p>
                          <p className="text-[10px] text-brand-charcoal/50 leading-relaxed max-w-[150px] mx-auto hidden md:block">
                            {stage.desc}
                          </p>
                          <p className="text-[10px] text-brand-charcoal/60 leading-relaxed md:hidden">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Courier info sub-block if status is shipped */}
                {order.shippingDetails.status === "shipped" && order.shippingDetails.trackingNumber && (
                  <div className="bg-stone-50 border border-brand-linen rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-brand-sage/20 text-brand-sage rounded-full">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-brown uppercase tracking-wider">
                          Transit Courier Details
                        </p>
                        <p className="text-[10px] text-brand-charcoal/60 mt-0.5">
                          Courier Partner: <span className="font-bold text-brand-brown">{order.shippingDetails.courier || "DHL Express"}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[10px] text-brand-charcoal/40 uppercase font-semibold">Tracking Number</p>
                      <span className="text-xs font-bold text-brand-brown tracking-wider block">
                        {order.shippingDetails.trackingNumber}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Info & Customized Dimensions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Custom Sizing summary */}
                <div className="bg-white border border-brand-linen rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown flex items-center gap-1.5 border-b border-brand-linen pb-3">
                    <Scissors className="h-4.5 w-4.5 text-brand-tuscan" />
                    Sizing Measurements Record
                  </h3>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="space-y-3">
                        <p className="text-xs font-bold text-brand-brown truncate">{item.product.name}</p>
                        
                        {item.customMeasurements ? (
                          <div className="grid grid-cols-5 gap-2 text-center">
                            <div className="bg-brand-linen/15 rounded-lg p-2">
                              <span className="block text-[8px] text-brand-charcoal/50 uppercase font-bold">Chest</span>
                              <span className="text-xs font-bold text-brand-brown">{item.customMeasurements.chest}"</span>
                            </div>
                            <div className="bg-brand-linen/15 rounded-lg p-2">
                              <span className="block text-[8px] text-brand-charcoal/50 uppercase font-bold">Shoulder</span>
                              <span className="text-xs font-bold text-brand-brown">{item.customMeasurements.shoulder}"</span>
                            </div>
                            <div className="bg-brand-linen/15 rounded-lg p-2">
                              <span className="block text-[8px] text-brand-charcoal/50 uppercase font-bold">Sleeve</span>
                              <span className="text-xs font-bold text-brand-brown">{item.customMeasurements.sleeve}"</span>
                            </div>
                            <div className="bg-brand-linen/15 rounded-lg p-2">
                              <span className="block text-[8px] text-brand-charcoal/50 uppercase font-bold">Length</span>
                              <span className="text-xs font-bold text-brand-brown">{item.customMeasurements.length}"</span>
                            </div>
                            <div className="bg-brand-linen/15 rounded-lg p-2">
                              <span className="block text-[8px] text-brand-charcoal/50 uppercase font-bold">Neck</span>
                              <span className="text-xs font-bold text-brand-brown">{item.customMeasurements.neck}"</span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-brand-linen/15 rounded-lg p-3.5 text-xs text-brand-brown flex justify-between">
                            <span>Sizing Standard:</span>
                            <span className="font-bold">Standard European Size {item.selectedSize}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery and invoice summary */}
                <div className="bg-white border border-brand-linen rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown flex items-center gap-1.5 border-b border-brand-linen pb-3">
                    <User className="h-4.5 w-4.5 text-brand-sage" />
                    Delivery Summary
                  </h3>

                  <div className="text-xs space-y-2.5 text-brand-charcoal/70">
                    <div className="flex justify-between">
                      <span className="font-bold text-brand-brown">Recipient Name:</span>
                      <span>{order.customerDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-brand-brown">Destination Address:</span>
                      <span className="text-right max-w-[200px] truncate">{order.customerDetails.address}, {order.customerDetails.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-brand-brown">Phone Contact:</span>
                      <span>{order.customerDetails.phone}</span>
                    </div>
                    
                    <div className="pt-2.5 border-t border-brand-linen/50 flex justify-between items-center text-xs">
                      <span className="font-bold text-brand-brown flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-brand-sage" /> Invoice Receipt
                      </span>
                      {order.paymentDetails.invoiceUrl ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading simulated invoice receipt: ${order.id}.pdf`);
                          }}
                          className="text-brand-tuscan font-bold hover:underline inline-flex items-center gap-0.5"
                        >
                          Download PDF <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-brand-charcoal/40 font-semibold">Not generated</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Redirect switch links */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-brand-linen/60">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-charcoal/60 hover:text-brand-brown"
                >
                  <ChevronLeft className="h-4 w-4" /> Continue Catalog Browsing
                </Link>
                <div className="text-xs text-brand-charcoal/50 text-center sm:text-right">
                  <span>To view updates from the tailor, click on </span>
                  <Link href="/admin" className="font-bold text-brand-tuscan hover:underline">
                    Admin Dashboard
                  </Link>
                </div>
              </div>

            </div>
          ) : (
            /* Order Lookup Form */
            <div className="bg-white border border-brand-linen rounded-3xl p-8 shadow-xs text-center max-w-md mx-auto space-y-6">
              <div className="p-4 bg-brand-linen/30 rounded-full text-brand-tuscan max-w-max mx-auto">
                <Search className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-brand-brown">Look Up Tracking</h2>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                  Enter your custom stitch tracking code (e.g., NES-2026-9401) to trace the production pipeline of your traditional attire.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. NES-2026-9401"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full p-2.5 text-xs text-center border border-brand-linen rounded-xl focus:outline-brand-tuscan font-semibold"
                />
                
                <button
                  onClick={() => {
                    const match = orders.find((o) => o.id.toLowerCase() === searchId.trim().toLowerCase());
                    if (match) {
                      setOrder(match);
                      setIsSearched(true);
                    } else {
                      alert("Order ID not found in simulated database. Please try NES-2026-9401");
                    }
                  }}
                  className="w-full rounded-xl bg-brand-brown hover:bg-brand-brown-light text-brand-white py-3 text-xs font-bold shadow-md transition-colors"
                >
                  Search Database Record
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
