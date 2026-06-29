"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, Product } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Scissors,
  ChevronLeft,
  ShoppingBag,
  Star,
  Check,
  ChevronRight,
  Info,
  Ruler,
  Loader2
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: ProductPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { products, addToCart } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<{ name: string; priceModifier: number } | null>(null);
  const [sizeMode, setSizeMode] = useState<"standard" | "custom">("standard");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  
  // Custom measurements in inches
  const [chest, setChest] = useState<number>(40);
  const [shoulder, setShoulder] = useState<number>(18);
  const [sleeve, setSleeve] = useState<number>(24);
  const [length, setLength] = useState<number>(38);
  const [neck, setNeck] = useState<number>(15);

  const [qty, setQty] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  // Load the product details on mount / parameter resolve
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedFabric(foundProduct.fabrics[0]);
    }
  }, [id, products]);

  if (!product || !selectedColor || !selectedFabric) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 text-center bg-brand-white">
          <LoaderSpinner />
        </div>
        <Footer />
      </>
    );
  }

  const finalUnitPrice = product.price + selectedFabric.priceModifier;
  const totalPrice = finalUnitPrice * qty;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      product,
      quantity: qty,
      selectedColor,
      selectedSize: sizeMode === "standard" ? selectedSize : "Custom",
      customMeasurements:
        sizeMode === "custom"
          ? { chest, shoulder, sleeve, length, neck }
          : null,
      selectedFabric
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-brand-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-brand-charcoal/50">
            <Link href="/" className="hover:text-brand-brown">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/catalog" className="hover:text-brand-brown">Browse Catalog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-brown">{product.name}</span>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-charcoal/60 hover:text-brand-brown mb-8"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Collections
          </Link>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Left: Product Visual Representation */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Main visual preview */}
              <div className="aspect-[4/5] bg-white border border-brand-linen rounded-2xl overflow-hidden relative shadow-xs group">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute inset-2 border border-dashed border-brand-tuscan/40 rounded-xl pointer-events-none" />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="rounded-full bg-brand-brown text-brand-white text-[9px] font-bold px-2.5 py-0.5 tracking-wider uppercase shadow-md">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-0.5 text-xs text-brand-tuscan font-bold bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full border border-brand-linen/40 shadow-xs">
                    <Star className="h-3.5 w-3.5 fill-brand-tuscan" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>

              {/* Toggled Tabs: Description / Reviews */}
              <div className="bg-white border border-brand-linen rounded-2xl overflow-hidden shadow-xs">
                <div className="flex border-b border-brand-linen bg-stone-50/50">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center border-r border-brand-linen transition-colors ${
                      activeTab === "description"
                        ? "text-brand-brown bg-white border-b-2 border-b-brand-tuscan"
                        : "text-brand-charcoal/50 hover:text-brand-brown"
                    }`}
                  >
                    Product Story
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-colors ${
                      activeTab === "reviews"
                        ? "text-brand-brown bg-white border-b-2 border-b-brand-tuscan"
                        : "text-brand-charcoal/50 hover:text-brand-brown"
                    }`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === "description" ? (
                    <div className="space-y-4">
                      <p className="text-xs text-brand-charcoal/80 leading-relaxed font-sans">
                        {product.description}
                      </p>
                      <div className="text-xs text-brand-charcoal/60 space-y-2 border-t border-brand-linen pt-4">
                        <p className="font-bold text-brand-brown">Bespoke Production Timeline:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Sizing verification: 24 - 48 Hours</li>
                          <li>Cutting & Sewing: 3 - 5 Days</li>
                          <li>Embroidery Studio Stitching: 2 - 3 Days</li>
                          <li>Express Global Delivery: 3 - 5 Days</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {product.reviews.length === 0 ? (
                        <p className="text-xs text-brand-charcoal/50 text-center py-6">
                          No reviews yet for this design. Be the first to write one!
                        </p>
                      ) : (
                        product.reviews.map((rev) => (
                          <div key={rev.id} className="pb-4 border-b border-brand-linen/60 last:pb-0 last:border-0 space-y-1">
                            <div className="flex justify-between items-center">
                              <p className="text-xs font-bold text-brand-brown">{rev.name}</p>
                              <span className="text-[10px] text-brand-charcoal/40">{rev.date}</span>
                            </div>
                            <div className="flex items-center text-brand-tuscan">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-brand-tuscan shrink-0" />
                              ))}
                            </div>
                            <p className="text-xs text-brand-charcoal/70 leading-relaxed italic">
                              "{rev.comment}"
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right: Customization Widgets */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Tunic details */}
              <div className="space-y-1">
                <h1 className="font-serif text-2xl font-bold text-brand-brown">
                  {product.name}
                </h1>
                <p className="text-xl font-bold text-brand-brown">
                  €{product.price} <span className="text-xs text-brand-charcoal/50 font-normal">base price</span>
                </p>
              </div>

              {/* Color Picker */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-brown">
                  1. Choose Thread / Fabric Color:{" "}
                  <span className="text-brand-tuscan font-bold lowercase">({selectedColor.name})</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`h-9 w-9 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-brand-tuscan scale-[1.08] shadow-sm"
                          : "border-brand-linen hover:border-brand-brown-light"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Fabric Picker */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-brown">
                  2. Select Fabric Option:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.fabrics.map((fabric) => (
                    <button
                      key={fabric.name}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`text-left p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedFabric.name === fabric.name
                          ? "border-brand-tuscan bg-brand-tuscan/5 text-brand-brown font-bold"
                          : "border-brand-linen bg-white text-brand-charcoal hover:bg-stone-50"
                      }`}
                    >
                      <p className="text-brand-brown">{fabric.name}</p>
                      <p className="text-[10px] text-brand-charcoal/50 mt-0.5">
                        {fabric.priceModifier === 0
                          ? "Standard pricing"
                          : `+ €${fabric.priceModifier} custom fabric fee`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizing Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-brand-linen pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-brown flex items-center gap-1">
                    <Scissors className="h-4 w-4 text-brand-sage" />
                    3. Select Tailoring Sizing:
                  </h3>
                  <div className="flex rounded-lg border border-brand-linen bg-stone-50 p-0.5">
                    <button
                      onClick={() => setSizeMode("standard")}
                      className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${
                        sizeMode === "standard"
                          ? "bg-white text-brand-brown shadow-xs"
                          : "text-brand-charcoal/50"
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => setSizeMode("custom")}
                      className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${
                        sizeMode === "custom"
                          ? "bg-white text-brand-brown shadow-xs"
                          : "text-brand-charcoal/50"
                      }`}
                    >
                      Bespoke Fit
                    </button>
                  </div>
                </div>

                {/* Standard size selectors */}
                {sizeMode === "standard" ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-10 w-12 rounded-lg border text-xs font-bold transition-all ${
                            selectedSize === size
                              ? "border-brand-brown bg-brand-brown text-brand-white"
                              : "border-brand-linen hover:border-brand-brown-light"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-brand-charcoal/50 flex items-center gap-1">
                      <Info className="h-3 w-3 shrink-0" />
                      Fits true to standard European/UK size guides. Fits length ranges 5'8\" to 6'2\".
                    </p>
                  </div>
                ) : (
                  /* Custom tailoring input grid */
                  <div className="space-y-4 bg-brand-linen/10 border border-brand-linen rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-brand-tuscan mb-2">
                      <Ruler className="h-4.5 w-4.5" />
                      <p className="text-[11px] font-bold uppercase tracking-wider">
                        Enter Custom Tailor Measurements (Inches)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-brown mb-1">Chest</label>
                        <input
                          type="number"
                          value={chest}
                          onChange={(e) => setChest(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 text-xs font-bold text-center border border-brand-linen rounded-lg bg-white focus:outline-brand-tuscan"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-brown mb-1">Shoulder</label>
                        <input
                          type="number"
                          value={shoulder}
                          onChange={(e) => setShoulder(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 text-xs font-bold text-center border border-brand-linen rounded-lg bg-white focus:outline-brand-tuscan"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-brown mb-1">Sleeve</label>
                        <input
                          type="number"
                          value={sleeve}
                          onChange={(e) => setSleeve(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 text-xs font-bold text-center border border-brand-linen rounded-lg bg-white focus:outline-brand-tuscan"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-brown mb-1">Length</label>
                        <input
                          type="number"
                          value={length}
                          onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 text-xs font-bold text-center border border-brand-linen rounded-lg bg-white focus:outline-brand-tuscan"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-brown mb-1">Neck</label>
                        <input
                          type="number"
                          value={neck}
                          onChange={(e) => setNeck(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 text-xs font-bold text-center border border-brand-linen rounded-lg bg-white focus:outline-brand-tuscan"
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-brand-charcoal/50">
                      * If unsure, take measurements directly from your best-fitting native attire laid flat on a table.
                    </p>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-4 border-t border-brand-linen">
                <span className="text-xs font-bold text-brand-brown uppercase">Quantity:</span>
                <div className="flex items-center border border-brand-linen rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 text-brand-charcoal hover:text-brand-tuscan"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-brand-charcoal">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 text-brand-charcoal hover:text-brand-tuscan"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1 text-right">
                  <span className="text-xs text-brand-charcoal/50">Total Estimation:</span>
                  <p className="text-2xl font-bold text-brand-brown">€{totalPrice}</p>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white shadow-md transition-all duration-300 ${
                    isAdded
                      ? "bg-brand-sage hover:bg-brand-sage-dark"
                      : "bg-brand-tuscan hover:bg-brand-tuscan-dark"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4.5 w-4.5" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4.5 w-4.5" />
                      <span>Place Custom Stitch Order</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

function LoaderSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-10 w-10 text-brand-tuscan animate-spin" />
      <p className="text-xs font-bold text-brand-brown uppercase tracking-wider">
        Loading Stitch Details...
      </p>
    </div>
  );
}
