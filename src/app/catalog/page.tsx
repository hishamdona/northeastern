"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Scissors,
  ArrowUpDown,
  Tag,
  Loader2
} from "lucide-react";

export default function Catalog() {
  const { products } = useApp();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFabricFilter, setSelectedFabricFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");

  // Extract all unique fabric types for the filter dropdown
  const allFabrics = useMemo(() => {
    const fabricsSet = new Set<string>();
    products.forEach((p) => {
      p.fabrics.forEach((f) => fabricsSet.add(f.name));
    });
    return ["All", ...Array.from(fabricsSet)];
  }, [products]);

  // Filter and sort the products list
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query matching name & description
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category selection
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Fabric filter selection
    if (selectedFabricFilter !== "All") {
      result = result.filter((p) =>
        p.fabrics.some((f) => f.name === selectedFabricFilter)
      );
    }

    // Sorting logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedFabricFilter, sortBy]);

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-brand-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-brand-brown sm:text-4xl">
              Browse Traditional Collections
            </h1>
            <p className="text-sm text-brand-charcoal/60">
              Each garment is handcrafted specifically to your orders. Select a style to choose standard sizes or enter custom tailors' measurements.
            </p>
          </div>

          {/* Search & Filter Control Bar */}
          <div className="bg-white border border-brand-linen rounded-2xl p-4 md:p-6 shadow-xs mb-8 space-y-4">
            
            {/* Search + Category Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search Kaftans, Senator, Agbada..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-linen bg-stone-50/50 text-sm focus:outline-none focus:border-brand-tuscan transition-colors"
                />
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                {["All", "Kaftan", "Senator", "Agbada", "Native"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                      selectedCategory === category
                        ? "bg-brand-brown text-brand-white shadow"
                        : "bg-brand-linen/10 text-brand-charcoal/60 hover:bg-brand-linen/30 hover:text-brand-brown"
                    }`}
                  >
                    {category === "All" ? "All Attires" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric & Sort options */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-linen/60">
              
              <div className="flex flex-wrap items-center gap-4">
                {/* Fabric Selector */}
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-brand-sage" />
                  <span className="text-xs font-bold text-brand-charcoal/70">Fabric Type:</span>
                  <div className="relative">
                    <select
                      value={selectedFabricFilter}
                      onChange={(e) => setSelectedFabricFilter(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-brand-linen bg-white text-xs font-semibold focus:outline-none focus:border-brand-tuscan"
                    >
                      {allFabrics.map((f) => (
                        <option key={f} value={f}>
                          {f === "All" ? "All Fabrics" : f}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-charcoal/50 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-brand-tuscan" />
                <span className="text-xs font-bold text-brand-charcoal/70">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-brand-linen bg-white text-xs font-semibold focus:outline-none focus:border-brand-tuscan"
                  >
                    <option value="default">Standard Order</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-charcoal/50 pointer-events-none" />
                </div>
              </div>

            </div>

          </div>

          {/* Results grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white border border-brand-linen rounded-2xl">
              <div className="p-4 bg-brand-linen/20 rounded-full text-brand-tuscan">
                <SlidersHorizontal className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-brown">No Attire Found</h3>
                <p className="text-xs text-brand-charcoal/60 mt-1 max-w-sm">
                  We couldn't find any designs matching your filters. Try clearing your search query or selecting a different category.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedFabricFilter("All");
                  setSortBy("default");
                }}
                className="rounded-lg bg-brand-brown text-brand-white px-4 py-2 text-xs font-bold hover:bg-brand-brown-light"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-linen bg-white transition-all duration-300 hover:shadow-md"
                >
                  {/* Category overlay label */}
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-brand-brown px-2 py-0.5 text-[8.5px] font-bold tracking-wider text-brand-white uppercase shadow-xs">
                    {product.category}
                  </span>

                  {/* Rating stamp */}
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-0.5 rounded-full bg-brand-white/80 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-brand-tuscan border border-brand-linen/40">
                    ★ {product.rating}
                  </span>

                  {/* Attire image container */}
                  <Link
                    href={`/product/${product.id}`}
                    className="aspect-[4/5] bg-brand-linen/25 relative overflow-hidden block group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* View Details overlay */}
                    <div className="absolute inset-0 bg-brand-brown/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-brand-white text-brand-brown text-xs font-bold px-4 py-2 rounded-xl shadow-md border border-brand-linen">
                        Tailor Your Fit
                      </span>
                    </div>
                  </Link>

                  {/* Info details */}
                  <div className="flex flex-1 flex-col p-4 bg-white space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-sm font-bold text-brand-brown group-hover:text-brand-tuscan transition-colors truncate">
                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <span className="text-sm font-bold text-brand-brown shrink-0">
                        €{product.price}
                      </span>
                    </div>

                    <p className="text-[11px] text-brand-charcoal/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color pins + button */}
                    <div className="pt-2 border-t border-brand-linen/50 flex items-center justify-between gap-2">
                      <div className="flex gap-1 overflow-x-hidden">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="h-2.5 w-2.5 rounded-full border border-brand-linen shrink-0"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                      <Link
                        href={`/product/${product.id}`}
                        className="text-[10px] font-bold text-brand-tuscan hover:text-brand-tuscan-dark transition-colors shrink-0"
                      >
                        Customize Options →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sizing Info Help Block */}
          <div className="mt-16 bg-brand-linen/25 border border-brand-linen rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="font-serif text-lg font-bold text-brand-brown flex items-center justify-center md:justify-start gap-1.5">
                <Scissors className="h-5 w-5 text-brand-tuscan" />
                Need Help with Traditional Sizing?
              </h3>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                Traditional attire calls for standard shoulder and length balances. You can choose standard sizing or enter custom measures during configuration. Check out our standard sizing helper or get assistance from our live WhatsApp sizing team.
              </p>
            </div>
            <a
              href="https://wa.me/447700900077"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors shrink-0"
            >
              Contact Sizing Team
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
