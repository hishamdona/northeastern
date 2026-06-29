"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  ShoppingBag,
  Heart,
  User,
  Sliders,
  X,
  Trash2,
  Plus,
  Minus,
  Scissors,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    userRole,
    setUserRole,
    wishlist = []
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.price + item.selectedFabric.priceModifier) * item.quantity,
    0
  );

  const handleRoleToggle = () => {
    const nextRole = userRole === "customer" ? "admin" : "customer";
    setUserRole(nextRole);
    if (nextRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-brand-brown hover:opacity-90 transition-opacity">
                  NORTHEASTERN
                </span>
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-brand-tuscan -mt-1 uppercase">
                  Stitch Co. • Est. 2024
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    pathname === "/"
                      ? "text-brand-tuscan border-b-2 border-brand-tuscan pb-1"
                      : "text-brand-charcoal/70 hover:text-brand-brown"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/catalog"
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    pathname === "/catalog"
                      ? "text-brand-tuscan border-b-2 border-brand-tuscan pb-1"
                      : "text-brand-charcoal/70 hover:text-brand-brown"
                  }`}
                >
                  Browse Attire
                </Link>
                <Link
                  href="/track/NES-2026-9401"
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    pathname.startsWith("/track")
                      ? "text-brand-tuscan border-b-2 border-brand-tuscan pb-1"
                      : "text-brand-charcoal/70 hover:text-brand-brown"
                  }`}
                >
                  Track Order
                </Link>
                {userRole === "admin" && (
                  <Link
                    href="/admin"
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      pathname === "/admin"
                        ? "text-brand-tuscan border-b-2 border-brand-tuscan pb-1"
                        : "text-brand-charcoal/70 hover:text-brand-brown"
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </nav>
            </div>

            {/* Quick Actions & Role Switch */}
            <div className="flex items-center gap-4">
              {/* Role Toggle Switch Badge */}
              <button
                onClick={handleRoleToggle}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm transition-all duration-300 ${
                  userRole === "admin"
                    ? "bg-brand-brown text-brand-white hover:bg-brand-brown-light"
                    : "bg-brand-sage text-brand-white hover:bg-brand-sage-dark"
                }`}
              >
                {userRole === "admin" ? (
                  <>
                    <Sliders className="h-3 w-3" />
                    <span>Admin Mode</span>
                  </>
                ) : (
                  <>
                    <User className="h-3 w-3" />
                    <span>Customer Mode</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                className="relative rounded-full p-2 text-brand-charcoal/80 hover:bg-brand-linen hover:text-brand-brown transition-colors"
                title="Wishlist"
              >
                <Heart className="h-5.5 w-5.5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-tuscan text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Toggle Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full p-2 text-brand-charcoal/80 hover:bg-brand-linen hover:text-brand-brown transition-colors"
                title="Cart"
              >
                <ShoppingBag className="h-5.5 w-5.5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-sage text-[9px] font-bold text-white">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-brand-linen/50 bg-brand-white/80 py-2">
          <Link
            href="/"
            className={`flex flex-col items-center text-xs font-semibold ${
              pathname === "/" ? "text-brand-tuscan" : "text-brand-charcoal/60"
            }`}
          >
            <span>Home</span>
          </Link>
          <Link
            href="/catalog"
            className={`flex flex-col items-center text-xs font-semibold ${
              pathname === "/catalog" ? "text-brand-tuscan" : "text-brand-charcoal/60"
            }`}
          >
            <span>Browse</span>
          </Link>
          <Link
            href="/track/NES-2026-9401"
            className={`flex flex-col items-center text-xs font-semibold ${
              pathname.startsWith("/track") ? "text-brand-tuscan" : "text-brand-charcoal/60"
            }`}
          >
            <span>Track</span>
          </Link>
          {userRole === "admin" && (
            <Link
              href="/admin"
              className={`flex flex-col items-center text-xs font-semibold ${
                pathname === "/admin" ? "text-brand-tuscan" : "text-brand-charcoal/60"
              }`}
            >
              <span>Admin</span>
            </Link>
          )}
        </div>
      </header>

      {/* Cart Slider Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-charcoal/45 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md transform bg-brand-white shadow-2xl transition-all duration-300 ease-in-out border-l border-brand-linen flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-6 border-b border-brand-linen flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-brand-brown" />
                  <h2 className="font-serif text-lg font-bold text-brand-brown">
                    Your Shopping Bag
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-md p-1.5 text-brand-charcoal/50 hover:bg-brand-linen hover:text-brand-brown transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                    <div className="p-4 bg-brand-linen/40 rounded-full text-brand-sage">
                      <Scissors className="h-10 w-10" />
                    </div>
                    <p className="text-sm font-semibold text-brand-charcoal/60">
                      Your bag is empty. Explore our heritage designs to begin.
                    </p>
                    <Link
                      href="/catalog"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-tuscan hover:text-brand-tuscan-dark transition-colors"
                    >
                      Browse Catalog <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 bg-brand-white border border-brand-linen rounded-xl shadow-xs"
                    >
                      {/* Image representation */}
                      <div className="h-20 w-16 bg-brand-linen/30 rounded-lg flex items-center justify-center text-[10px] text-brand-brown font-bold border border-brand-linen/50 text-center p-1 uppercase">
                        {item.product.category}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-brand-brown truncate">
                          {item.product.name}
                        </h4>
                        
                        <div className="mt-1 space-y-0.5">
                          <p className="text-xs text-brand-charcoal/70 flex items-center gap-1.5">
                            <span
                              className="inline-block h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name} | Size: {item.selectedSize}
                          </p>
                          <p className="text-[10px] text-brand-charcoal/50">
                            Fabric: {item.selectedFabric.name}
                          </p>
                          {item.customMeasurements && (
                            <span className="inline-flex items-center gap-1 rounded bg-brand-tuscan/10 text-[9px] font-semibold text-brand-tuscan px-1.5 py-0.5 mt-1">
                              <Scissors className="h-2.5 w-2.5" />
                              Custom Tailored Fit
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          {/* Qty controller */}
                          <div className="flex items-center border border-brand-linen rounded-md bg-stone-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-brand-tuscan"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-brand-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-brand-tuscan"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-brand-brown">
                              €{(item.product.price + item.selectedFabric.priceModifier) * item.quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-brand-charcoal/40 hover:text-red-500 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="border-t border-brand-linen p-6 bg-brand-linen/10 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm text-brand-charcoal/70">
                      <span>Subtotal</span>
                      <span>€{cartSubtotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-brand-charcoal/70">
                      <span>Tailoring & Stitches</span>
                      <span className="text-brand-sage font-semibold">Included</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold text-brand-brown pt-2 border-t border-brand-linen/40">
                      <span>Total Estimate</span>
                      <span>€{cartSubtotal}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-tuscan py-3 text-sm font-bold text-white shadow-md hover:bg-brand-tuscan-dark transition-all duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="text-[10px] text-center text-brand-charcoal/50">
                    Handmade in the studio. Shipping timeline estimates are calculated at checkout.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
