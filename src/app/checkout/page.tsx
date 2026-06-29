"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CreditCard,
  Building2,
  Lock,
  ShoppingBag,
  Scissors,
  CheckCircle,
  AlertTriangle,
  Receipt
} from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  const { cart, placeOrder } = useApp();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [instructions, setInstructions] = useState("");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("321");
  const [transferProofUploaded, setTransferProofUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.price + item.selectedFabric.priceModifier) * item.quantity,
    0
  );
  const shippingFee = country === "Nigeria" ? 15 : 35; // Global flat shipping
  const finalTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city) {
      alert("Please fill in all shipping details.");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing delays
    setTimeout(() => {
      const orderId = placeOrder({
        items: cart,
        customerDetails: {
          name,
          email,
          phone,
          address,
          city,
          country,
          instructions
        },
        paymentDetails: {
          method: paymentMethod,
          status: paymentMethod === "card" ? "paid" : "pending",
          transactionId:
            paymentMethod === "card"
              ? "ch_stripe_" + Math.random().toString(36).substr(2, 9)
              : "tx_bank_" + Math.random().toString(36).substr(2, 9)
        },
        total: finalTotal
      });

      setIsSubmitting(false);
      router.push(`/track/${orderId}`);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 text-center bg-brand-white space-y-4">
          <div className="p-4 bg-brand-linen/30 rounded-full text-brand-tuscan">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="font-serif text-xl font-bold text-brand-brown">Your Bag is Empty</h2>
          <p className="text-xs text-brand-charcoal/60 max-w-sm leading-relaxed">
            There are no custom garments configured for checkout. Please browse our collections to choose styles and tailor measurements.
          </p>
          <Link
            href="/catalog"
            className="rounded-xl bg-brand-brown hover:bg-brand-brown-light text-brand-white px-6 py-3 text-xs font-bold shadow-md transition-colors"
          >
            Explore Collections
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-brand-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown mb-8">
            Complete Custom Order Checkout
          </h1>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Left Column: Checkout Forms */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
              
              {/* Shipping Form Card */}
              <div className="bg-white border border-brand-linen rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-linen pb-3">
                  <span className="h-6 w-6 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-serif text-base font-bold text-brand-brown">
                    Studio Shipping Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Chinedu Okafor"
                      className="w-full p-2.5 text-xs border border-brand-linen rounded-xl focus:outline-brand-tuscan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. chinedu@example.com"
                      className="w-full p-2.5 text-xs border border-brand-linen rounded-xl focus:outline-brand-tuscan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +44 7700 900088"
                      className="w-full p-2.5 text-xs border border-brand-linen rounded-xl focus:outline-brand-tuscan"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street name, house number, apartment details"
                      className="w-full p-2.5 text-xs border border-brand-linen rounded-xl focus:outline-brand-tuscan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="London"
                      className="w-full p-2.5 text-xs border border-brand-linen rounded-xl focus:outline-brand-tuscan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">
                      Destination Country *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 text-xs border border-brand-linen bg-white rounded-xl focus:outline-brand-tuscan"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                      <option value="Nigeria">Nigeria</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special instructions */}
              <div className="bg-white border border-brand-linen rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-linen pb-3">
                  <span className="h-6 w-6 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-serif text-base font-bold text-brand-brown">
                    Special Tailoring Notes (Optional)
                  </h2>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    Sewing Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Enter details like preferred hem curves, cuff designs, trouser lengths, or stitching styling requests..."
                    className="w-full p-3 text-xs border border-brand-linen rounded-xl focus:outline-brand-tuscan"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white border border-brand-linen rounded-2xl p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-brand-linen pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <h2 className="font-serif text-base font-bold text-brand-brown">
                      Secure Payment Gateways
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-brand-sage font-bold uppercase">
                    <Lock className="h-3.5 w-3.5" /> Encrypted
                  </span>
                </div>

                {/* Gateway Toggles */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                      paymentMethod === "card"
                        ? "border-brand-tuscan bg-brand-tuscan/5 text-brand-brown font-bold"
                        : "border-brand-linen bg-white text-brand-charcoal hover:bg-stone-50"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-brand-tuscan mb-1.5" />
                    <span className="text-xs">Credit/Debit Card</span>
                    <span className="text-[9px] text-brand-charcoal/50 mt-0.5">Stripe Gateway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                      paymentMethod === "transfer"
                        ? "border-brand-tuscan bg-brand-tuscan/5 text-brand-brown font-bold"
                        : "border-brand-linen bg-white text-brand-charcoal hover:bg-stone-50"
                    }`}
                  >
                    <Building2 className="h-6 w-6 text-brand-sage mb-1.5" />
                    <span className="text-xs">Local Bank Transfer</span>
                    <span className="text-[9px] text-brand-charcoal/50 mt-0.5">Zenith Bank (Nigeria)</span>
                  </button>
                </div>

                {/* Card Simulator Fields */}
                {paymentMethod === "card" ? (
                  <div className="space-y-4 bg-brand-linen/10 border border-brand-linen rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
                        Stripe Sandbox Card Info
                      </span>
                      <span className="text-[9px] font-bold text-brand-charcoal/50">Simulated Card</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-3">
                        <label className="block text-[10px] font-bold text-brand-charcoal mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2 text-xs border border-brand-linen rounded-lg bg-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-brand-charcoal mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-2 text-xs border border-brand-linen rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          className="w-full p-2 text-xs border border-brand-linen rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Bank Transfer Instructions */
                  <div className="space-y-4 bg-brand-linen/10 border border-brand-linen rounded-2xl p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-brand-tuscan shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                          Bank Transfer Instructions
                        </span>
                        <p className="text-[10px] text-brand-charcoal/70 mt-0.5">
                          Please transfer the equivalent amount to the following studio corporate account. Your order will enter the 'Under Review' queue, and once verified, our tailors will begin production.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-brand-linen rounded-xl p-3.5 space-y-1.5 text-xs text-brand-brown">
                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">Bank Name:</span>
                        <span className="font-bold">Zenith Bank Nigeria</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">Account Name:</span>
                        <span className="font-bold">Northeastern Stitches Co.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">Account Number:</span>
                        <span className="font-bold tracking-wider">1012903348</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setTransferProofUploaded(true)}
                        className={`text-xs font-bold px-4 py-2 border rounded-xl transition-all ${
                          transferProofUploaded
                            ? "bg-brand-sage/20 border-brand-sage text-brand-sage-dark"
                            : "bg-white border-brand-linen text-brand-brown hover:bg-stone-50"
                        }`}
                      >
                        {transferProofUploaded ? "✓ Proof Uploaded Successfully" : "Upload Mock Transfer Receipt"}
                      </button>
                      <span className="text-[9px] text-brand-charcoal/50">
                        {transferProofUploaded ? "Receipt attached" : "Attach dummy screenshot"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-tuscan py-4 text-sm font-bold text-white shadow-md hover:bg-brand-tuscan-dark transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Authorizing Tailoring Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>Authorize & Securely Place Order</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Checkout Summary Cart */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white border border-brand-linen rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-brand-linen pb-3">
                  <h2 className="font-serif text-base font-bold text-brand-brown">
                    Custom Order Summary
                  </h2>
                  <span className="text-xs font-bold text-brand-sage">
                    {cart.length} Attire(s)
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-4 border-b border-brand-linen/60 last:pb-0 last:border-0"
                    >
                      {/* Thumb */}
                      <div className="h-14 w-12 bg-brand-linen/20 rounded-lg flex items-center justify-center text-[9px] text-brand-brown font-bold border border-brand-linen/30 uppercase">
                        {item.product.category}
                      </div>

                      {/* Info details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-brand-brown truncate">
                          {item.product.name}
                        </h4>
                        
                        <div className="text-[10px] text-brand-charcoal/60 mt-0.5 space-y-0.5">
                          <p className="flex items-center gap-1">
                            <span
                              className="h-2 w-2 rounded-full inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            Color: {item.selectedColor.name} | Size: {item.selectedSize}
                          </p>
                          <p>Fabric: {item.selectedFabric.name}</p>
                          {item.customMeasurements && (
                            <span className="inline-flex items-center gap-0.5 rounded bg-brand-tuscan/10 text-[8.5px] font-bold text-brand-tuscan px-1 py-0.5 mt-0.5">
                              <Scissors className="h-2 w-2" /> Custom Tailored Fit
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="text-brand-charcoal/50">Qty: {item.quantity}</span>
                          <span className="font-bold text-brand-brown">
                            €{(item.product.price + item.selectedFabric.priceModifier) * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing totals */}
                <div className="border-t border-brand-linen pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-brand-charcoal/70">
                    <span>Items Subtotal</span>
                    <span>€{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-charcoal/70">
                    <span>Tailoring surcharge</span>
                    <span className="text-brand-sage font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-brand-charcoal/70">
                    <span>Global shipping fee</span>
                    <span>€{shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-brand-brown pt-2.5 border-t border-brand-linen/40">
                    <span>Total Custom Order</span>
                    <span>€{finalTotal}</span>
                  </div>
                </div>

                {/* Escrow badge */}
                <div className="bg-stone-50 border border-brand-linen/50 rounded-xl p-3 flex items-start gap-2 text-[10px] text-brand-charcoal/60 leading-relaxed">
                  <Receipt className="h-4.5 w-4.5 text-brand-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-brown block">Tailor Studio Guarantee</span>
                    Your attire is handmade in the studio, ironed, packaged, and shipped with tracking information.
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
