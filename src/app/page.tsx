"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Scissors,
  ChevronRight,
  Sparkles,
  MapPin,
  Maximize2,
  Compass,
  ArrowRight,
  Flame,
  Check
} from "lucide-react";

export default function Home() {
  const { products } = useApp();
  const featuredProducts = products.filter((p) => p.featured);
  const [activeRoomZone, setActiveRoomZone] = useState<string>("machine");

  const roomZones = [
    {
      id: "machine",
      title: "Ricoma Embroidery Machine",
      desc: "Our professional multi-needle setup, rendering precision patterns on custom Agbada robes and Kaftan lapels with exceptional accuracy."
    },
    {
      id: "threads",
      title: "The Thread Wall",
      desc: "An organized color system featuring hundreds of premium silk threads, ensuring perfect matching for traditional custom embroidery."
    },
    {
      id: "table",
      title: "Natural Wood Workstation",
      desc: "The cutting table where standard templates are resized, fabrics are inspected, and raw materials are prepared by hand."
    },
    {
      id: "decor",
      title: "Inspiration & Greenery",
      desc: "Plants and daily reminders: 'Create, Stitch, Inspire' to keep motivation high in every stitch crafted."
    }
  ];

  const brandSwatches = [
    { name: "Warm White", hex: "#FCFAF6", desc: "Base of elegance" },
    { name: "Sage Green", hex: "#8F9E8B", desc: "Organic accent color" },
    { name: "Natural Wood", hex: "#E6DFD3", desc: "Craftsmanship & grounding" },
    { name: "Black", hex: "#1C1917", desc: "Bold structural lines" },
    { name: "Linen", hex: "#F1ECE4", desc: "Traditional textile feel" }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-brand-white">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28 border-b border-brand-linen/60">
          {/* Subtle background graphics */}
          <div className="absolute top-1/4 right-0 -z-10 h-72 w-72 rounded-full bg-brand-sage/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-10 -z-10 h-80 w-80 rounded-full bg-brand-tuscan/5 blur-3xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Hero content */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-tuscan/15 px-4 py-1.5 text-xs font-bold text-brand-tuscan uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Now Booking Tailoring Slots</span>
                </div>
                
                <h1 className="font-serif text-4xl font-extrabold tracking-tight text-brand-brown sm:text-5xl lg:text-6xl leading-[1.1]">
                  Authentic Traditional Attire, <br />
                  <span className="text-brand-tuscan">Tailored for the Diaspora.</span>
                </h1>

                <p className="text-base text-brand-charcoal/70 font-sans max-w-xl leading-relaxed">
                  We build custom-fit Kaftans, Senator wears, and Royal Agbadas designed to carry heritage and withstand boundaries. Handcrafted in our studio, ordered directly online, and delivered worldwide.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/catalog"
                    className="flex items-center gap-2 rounded-xl bg-brand-brown hover:bg-brand-brown-light text-brand-white px-6 py-3.5 text-sm font-bold shadow-md transition-all duration-300 group"
                  >
                    <span>Browse Attire</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/track/NES-2026-9401"
                    className="flex items-center gap-2 rounded-xl border border-brand-linen bg-white text-brand-charcoal hover:bg-brand-linen/20 px-6 py-3.5 text-sm font-bold transition-all duration-300"
                  >
                    <Compass className="h-4 w-4 text-brand-sage" />
                    <span>Track Simulated Order</span>
                  </Link>
                </div>

                {/* Slogan metadata */}
                <div className="pt-6 border-t border-brand-linen flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-brand-tuscan animate-pulse" />
                  <span className="font-serif text-xs font-bold uppercase tracking-wider text-brand-brown/80">
                    Rooted in heritage. Driven by resilience. — Est. 2024
                  </span>
                </div>
              </div>

              {/* Hero visual component (Embroidered Stitch Panel Concept) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[380px] p-6 bg-white border border-brand-linen rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                  {/* Outer stitched border */}
                  <div className="absolute inset-2 border-2 border-dashed border-brand-tuscan/45 rounded-xl pointer-events-none" />

                  {/* Brand Patch Artwork Representation */}
                  <div className="relative h-64 bg-brand-brown-dark rounded-lg overflow-hidden flex flex-col justify-between p-6 text-brand-white shadow-inner">
                    {/* Glowing Sun vector rendering */}
                    <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-tuscan/20 blur-2xl" />
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="h-10 w-10 border border-brand-white/20 rounded-full flex items-center justify-center bg-brand-white/5 backdrop-blur-md">
                        <Scissors className="h-4 w-4 text-brand-tuscan" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-sage">
                        Authentic Stitch
                      </span>
                    </div>

                    <div className="z-10 space-y-2">
                      <h3 className="font-serif text-2xl font-bold tracking-wider text-brand-white">
                        Northeastern
                      </h3>
                      <p className="text-[10px] text-brand-white/60 leading-relaxed font-sans max-w-[240px]">
                        A tribute to heritage, designed like a woven textile patch showing how our stories are stitched together.
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-brand-white/10 pt-3 z-10">
                      <span className="text-[9px] tracking-wider font-semibold text-brand-tuscan">
                        EST. 2024
                      </span>
                      <span className="text-[9px] tracking-wider text-brand-white/50">
                        GLOBAL DELIVERY
                      </span>
                    </div>
                  </div>

                  {/* Highlight boxes */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="bg-brand-white border border-brand-linen rounded-xl p-3">
                      <p className="text-xs font-bold text-brand-brown">100% Bespoke</p>
                      <p className="text-[9px] text-brand-charcoal/50">Custom sizing input</p>
                    </div>
                    <div className="bg-brand-white border border-brand-linen rounded-xl p-3">
                      <p className="text-xs font-bold text-brand-brown">Europe & US</p>
                      <p className="text-[9px] text-brand-charcoal/50">Direct secure checkout</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Attire Catalog Preview */}
        <section className="py-20 bg-brand-white border-b border-brand-linen/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl font-extrabold text-brand-brown">
                  The Heritage Collections
                </h2>
                <p className="text-xs font-semibold text-brand-sage uppercase tracking-wider mt-1">
                  Bespoke traditional shapes tailored with structural precision
                </p>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand-tuscan hover:text-brand-tuscan-dark transition-colors mt-4 md:mt-0"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured Catalog Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-linen bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {/* Decorative stitches along top edge */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-tuscan via-brand-sage to-brand-brown" />

                  {/* Image container */}
                  <div className="aspect-[4/5] bg-brand-linen/25 relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
                      <span className="inline-flex items-center rounded-full bg-brand-brown text-brand-white text-[9px] font-bold px-2.5 py-0.5 tracking-wider uppercase shadow-sm">
                        {product.category}
                      </span>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-white/80 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-brand-tuscan border border-brand-linen/40">
                        ★ {product.rating}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-end bg-white/85 backdrop-blur-xs rounded-xl p-2 border border-brand-linen/40 shadow-xs">
                      <span className="text-[10px] font-bold text-brand-charcoal/70">
                        {product.stock > 0 ? `${product.stock} Slots Left` : "Fully Booked"}
                      </span>
                      <span className="text-[10px] font-bold text-brand-sage-dark">
                        Bespoke Custom
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-6 space-y-3 bg-white">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-base font-bold text-brand-brown group-hover:text-brand-tuscan transition-colors">
                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <span className="text-base font-bold text-brand-brown">
                        €{product.price}
                      </span>
                    </div>

                    <p className="text-xs text-brand-charcoal/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 border-t border-brand-linen flex items-center justify-between">
                      <div className="flex gap-1">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="h-3 w-3 rounded-full border border-brand-linen"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                      <Link
                        href={`/product/${product.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-brown hover:text-brand-tuscan transition-colors"
                      >
                        Customize Fits <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Woven Brand Story Feature */}
        <section className="py-20 bg-brand-linen/25 border-b border-brand-linen/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-brand-linen shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
              
              {/* Brand statement left */}
              <div className="p-8 md:p-12 md:col-span-7 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-8 bg-brand-tuscan rounded" />
                  <span className="font-serif text-sm font-bold uppercase tracking-wider text-brand-brown">
                    The Story Behind the Needle
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown leading-tight">
                  "Designed like a woven textile patch to show how all our stories are stitched together."
                </h3>
                
                <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-sans">
                  NORTHEASTERN is a tribute to the heritage and resilience of the African continent. Originating in Northern Nigeria and radiating outward, our clothing transcends physical maps. Every stitch we set is a thread pulling together diaspora communities in London, Paris, and Amsterdam back to our root craftsmanship.
                </p>

                <div className="flex gap-8 border-t border-brand-linen/70 pt-6 text-center">
                  <div>
                    <span className="block font-serif text-xl font-bold text-brand-tuscan">4.9/5</span>
                    <span className="text-[10px] font-bold text-brand-charcoal/50 uppercase">Customer Rating</span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl font-bold text-brand-tuscan">100%</span>
                    <span className="text-[10px] font-bold text-brand-charcoal/50 uppercase">Bespoke Fit</span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl font-bold text-brand-tuscan">Global</span>
                    <span className="text-[10px] font-bold text-brand-charcoal/50 uppercase">Express Delivery</span>
                  </div>
                </div>
              </div>

              {/* Graphic woven illustration right */}
              <div className="bg-brand-brown text-brand-white p-8 md:p-12 md:col-span-5 flex flex-col items-center justify-center text-center relative overflow-hidden border-t md:border-t-0 md:border-l border-brand-linen/30">
                {/* Woven circle styling representation */}
                <div className="relative h-60 w-60 rounded-full border-4 border-dashed border-brand-tuscan flex flex-col items-center justify-center p-6 bg-brand-brown-dark shadow-2xl">
                  {/* Decorative curved text simulation */}
                  <span className="absolute top-3 font-serif text-[10px] tracking-[0.3em] text-brand-tuscan uppercase font-bold">
                    * NORTHEASTERN *
                  </span>
                  
                  {/* Sun / Desert design */}
                  <div className="h-20 w-20 rounded-full border border-brand-white/10 flex items-center justify-center relative bg-brand-white/5 my-4">
                    <Scissors className="h-8 w-8 text-brand-tuscan" />
                  </div>

                  <p className="text-[10px] text-brand-white/80 max-w-[180px] leading-relaxed">
                    Rooted in heritage.<br />Driven by resilience.
                  </p>

                  <span className="absolute bottom-3 text-[9px] font-bold tracking-widest text-brand-sage uppercase">
                    EST. 2024
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5ft x 5ft Stitch Studio Interactive Section */}
        <section className="py-20 bg-brand-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="font-serif text-3xl font-extrabold text-brand-brown">
                Inside the Stitch Studio
              </h2>
              <p className="text-sm text-brand-charcoal/60">
                Our operations thrive in a dedicated 5ft x 5ft embroidery room designed for optimal productivity, organization, and calm creative focus.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* Studio Map Left */}
              <div className="lg:col-span-6 bg-brand-linen/25 border border-brand-linen rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-brand-brown uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-tuscan" />
                    Top-down Workshop Layout (5FT x 5FT)
                  </span>
                  <span className="text-[10px] font-bold text-brand-sage uppercase bg-brand-sage/10 px-2.5 py-0.5 rounded-full">
                    Optimal Space Layout
                  </span>
                </div>

                {/* Simulated room visual map grid */}
                <div className="relative aspect-square w-full max-w-[420px] mx-auto bg-stone-50 border-4 border-brand-brown rounded-2xl p-4 flex flex-col justify-between shadow-md">
                  {/* Stitched guidelines */}
                  <div className="absolute inset-0 border border-brand-linen/40 pointer-events-none" />
                  
                  {/* Left: Thread Wall */}
                  <button
                    onClick={() => setActiveRoomZone("threads")}
                    className={`absolute left-0 top-1/4 bottom-1/4 w-8 border border-l-0 rounded-r-md transition-all ${
                      activeRoomZone === "threads"
                        ? "bg-brand-sage text-white shadow"
                        : "bg-brand-linen/50 text-brand-brown hover:bg-brand-linen"
                    } flex items-center justify-center`}
                  >
                    <span className="text-[9px] font-bold uppercase origin-center -rotate-90 whitespace-nowrap">
                      Thread Wall
                    </span>
                  </button>

                  {/* Center Top: Ricoma Machine */}
                  <button
                    onClick={() => setActiveRoomZone("machine")}
                    className={`absolute top-0 left-1/4 right-1/4 h-12 border border-t-0 rounded-b-md transition-all ${
                      activeRoomZone === "machine"
                        ? "bg-brand-tuscan text-white shadow"
                        : "bg-brand-linen/50 text-brand-brown hover:bg-brand-linen"
                    } flex flex-col items-center justify-center`}
                  >
                    <span className="text-[9px] font-bold uppercase">Ricoma Machine</span>
                  </button>

                  {/* Middle Desk area */}
                  <button
                    onClick={() => setActiveRoomZone("table")}
                    className={`absolute top-[40%] left-[20%] right-[20%] bottom-[20%] border-2 border-brand-brown-light/40 rounded-xl transition-all ${
                      activeRoomZone === "table"
                        ? "bg-brand-brown text-white shadow"
                        : "bg-brand-linen/30 text-brand-brown hover:bg-brand-linen/60"
                    } flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">Worktable</span>
                  </button>

                  {/* Right side: Inspiration Decor */}
                  <button
                    onClick={() => setActiveRoomZone("decor")}
                    className={`absolute right-4 top-4 h-10 w-10 rounded-full transition-all ${
                      activeRoomZone === "decor"
                        ? "bg-emerald-600 text-white shadow"
                        : "bg-brand-linen/40 text-brand-brown hover:bg-brand-linen"
                    } flex items-center justify-center`}
                    title="Decor & Inspiration"
                  >
                    🌱
                  </button>

                  {/* Visual scale indicators */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[8px] font-bold text-brand-charcoal/50 uppercase border-t border-brand-linen pt-1">
                    <span>5 ft Width</span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="h-2 w-2" />
                      5 ft Length
                    </span>
                  </div>
                </div>
              </div>

              {/* Explainer Right */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-brand-tuscan uppercase tracking-wider">
                    Interactive Zone Explainer
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-brown">
                    {roomZones.find((z) => z.id === activeRoomZone)?.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-sans">
                    {roomZones.find((z) => z.id === activeRoomZone)?.desc}
                  </p>
                </div>

                {/* Color Swatch Grid directly matching brand palette */}
                <div className="pt-6 border-t border-brand-linen space-y-4">
                  <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-brown">
                    Studio Color Palette
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {brandSwatches.map((swatch) => (
                      <div
                        key={swatch.name}
                        className="flex items-center gap-3 p-2 border border-brand-linen rounded-xl bg-stone-50/50"
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-brand-linen shadow-inner shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div>
                          <p className="text-[10px] font-bold text-brand-brown truncate">{swatch.name}</p>
                          <p className="text-[9px] text-brand-charcoal/50 truncate">{swatch.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-sage text-brand-white px-5 py-3 text-xs font-bold shadow-sm hover:bg-brand-sage-dark transition-all duration-300"
                  >
                    <span>Tailor Your Design Now</span>
                    <Scissors className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
