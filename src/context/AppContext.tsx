"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Kaftan" | "Senator" | "Agbada" | "Native";
  images: string[];
  colors: { name: string; hex: string }[];
  fabrics: { name: string; priceModifier: number }[];
  sizes: string[];
  featured: boolean;
  rating: number;
  reviews: Review[];
  stock: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  customMeasurements: {
    chest?: number;
    shoulder?: number;
    sleeve?: number;
    length?: number;
    neck?: number;
  } | null;
  selectedFabric: { name: string; priceModifier: number };
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    instructions?: string;
  };
  paymentDetails: {
    method: "card" | "transfer" | "paypal";
    status: "paid" | "pending";
    transactionId: string;
    invoiceUrl?: string;
  };
  shippingDetails: {
    status: "pending" | "tailoring" | "embroidery" | "shipped" | "delivered";
    courier?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  };
  total: number;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  userRole: "customer" | "admin";
  setUserRole: (role: "customer" | "admin") => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  placeOrder: (orderData: {
    items: CartItem[];
    customerDetails: Order["customerDetails"];
    paymentDetails: Omit<Order["paymentDetails"], "invoiceUrl">;
    total: number;
  }) => string;
  updateOrderStatus: (
    orderId: string,
    status: Order["shippingDetails"]["status"],
    courier?: string,
    trackingNumber?: string
  ) => void;
  addMockProduct: (product: Omit<Product, "id" | "rating" | "reviews">) => void;
  editMockProduct: (product: Product) => void;
  deleteMockProduct: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "The Royal Agbada Set",
    description: "Premium 3-piece traditional attire consisting of the inner tunic, matching trousers, and the grand outer Agbada robe. Adorned with intricate traditional embroidery on the chest and shoulder lines, tailored specifically for grand entries.",
    price: 380,
    category: "Agbada",
    images: [
      "/images/agbada-blue.png"
    ],
    colors: [
      { name: "Royal Blue", hex: "#1D4ED8" },
      { name: "White Velvet", hex: "#F3F4F6" },
      { name: "Obsidian Black", hex: "#111827" }
    ],
    fabrics: [
      { name: "Premium Soft Crepe", priceModifier: 0 },
      { name: "Gucci Brocade", priceModifier: 80 },
      { name: "Supreme Cashmere Wool", priceModifier: 120 }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    rating: 4.9,
    stock: 12,
    reviews: [
      {
        id: "rev-1",
        name: "Chinedu O.",
        rating: 5,
        comment: "Absolutely outstanding quality. Wore this to a wedding in London and received non-stop compliments. The custom stitching is perfect.",
        date: "2026-06-15"
      },
      {
        id: "rev-2",
        name: "Yinka A.",
        rating: 5,
        comment: "Excellent craftsmanship, the weight of the fabric is premium and feels very luxurious.",
        date: "2026-06-20"
      }
    ]
  },
  {
    id: "prod-2",
    name: "Signature Senator Attire",
    description: "A polished, modern 2-piece outfit featuring a clean-cut tunic with a subtle asymmetrical button line and matching slim-fit trousers. Perfect for corporate events or formal evening wear.",
    price: 195,
    category: "Senator",
    images: [
      "/images/senator-burgundy.png"
    ],
    colors: [
      { name: "Deep Burgundy", hex: "#7F1D1D" },
      { name: "Sage Green", hex: "#8F9E8B" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    fabrics: [
      { name: "Standard Polish Cotton", priceModifier: 0 },
      { name: "Super 140s Wool Blend", priceModifier: 40 },
      { name: "Italian Crepe", priceModifier: 60 }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    rating: 4.8,
    stock: 25,
    reviews: [
      {
        id: "rev-3",
        name: "Emeka K.",
        rating: 5,
        comment: "This is now my favorite native attire. Sleek design and standard sizing is very accurate.",
        date: "2026-06-10"
      }
    ]
  },
  {
    id: "prod-3",
    name: "Heritage Desert Kaftan",
    description: "An elegant, flowy long-sleeved kaftan with minimalist vertical line stitch details along the center collar. Inspired by desert heritage, resilience, and quiet luxury.",
    price: 240,
    category: "Kaftan",
    images: [
      "/images/kaftan-beige.png"
    ],
    colors: [
      { name: "Sand Beige", hex: "#E5E7EB" },
      { name: "Mustard Gold", hex: "#E28525" },
      { name: "Forest Green", hex: "#065F46" }
    ],
    fabrics: [
      { name: "Pure Linen", priceModifier: 0 },
      { name: "Soft Cotton Blend", priceModifier: 20 },
      { name: "Heavyweight Linen", priceModifier: 50 }
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    rating: 4.7,
    stock: 18,
    reviews: [
      {
        id: "rev-4",
        name: "Abubakar B.",
        rating: 4,
        comment: "Very breathable and comfortable for warm weather. Stitches are neat and solid.",
        date: "2026-06-24"
      }
    ]
  },
  {
    id: "prod-4",
    name: "Modern Native Geometric Attire",
    description: "A short-sleeved daily-wear tunic featuring bold, contrasting geometric block patterns on the right side. Combines cultural embroidery heritage with contemporary street style.",
    price: 165,
    category: "Native",
    images: [
      "/images/native-green.png"
    ],
    colors: [
      { name: "Emerald Green", hex: "#047857" },
      { name: "Night Navy", hex: "#1E3A8A" },
      { name: "Cream White", hex: "#FFFBEB" }
    ],
    fabrics: [
      { name: "Structured Heavy Cotton", priceModifier: 0 },
      { name: "Summer Linen Tencel", priceModifier: 30 }
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    rating: 4.6,
    stock: 30,
    reviews: []
  }
];

const initialOrders: Order[] = [
  {
    id: "NES-2026-9401",
    date: "2026-06-25",
    items: [
      {
        id: "item-init-1",
        productId: "prod-2",
        product: initialProducts[1],
        quantity: 1,
        selectedColor: { name: "Sage Green", hex: "#8F9E8B" },
        selectedSize: "Custom",
        customMeasurements: {
          chest: 42,
          shoulder: 18,
          sleeve: 25,
          length: 40,
          neck: 16
        },
        selectedFabric: { name: "Italian Crepe", priceModifier: 60 }
      }
    ],
    customerDetails: {
      name: "Tunde Ednut",
      email: "tunde@example.com",
      phone: "+44 7700 900077",
      address: "12 Finchley Road",
      city: "London",
      country: "United Kingdom",
      instructions: "Please make the tunic hem slightly curved."
    },
    paymentDetails: {
      method: "card",
      status: "paid",
      transactionId: "ch_stripe_98721382"
    },
    shippingDetails: {
      status: "embroidery",
      estimatedDelivery: "2026-07-06"
    },
    total: 255
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [userRole, setUserRole] = useState<"customer" | "admin">("customer");
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state with localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("nes_products");
      const storedCart = localStorage.getItem("nes_cart");
      const storedOrders = localStorage.getItem("nes_orders");
      const storedWishlist = localStorage.getItem("nes_wishlist");
      const storedRole = localStorage.getItem("nes_role");

      const rewriteImages = (imgs: string[]) => imgs.map(img => img.replace(/\.webp$/, ".png"));

      if (storedProducts) {
        try {
          const parsed = JSON.parse(storedProducts) as Product[];
          const updated = parsed.map(p => ({
            ...p,
            images: rewriteImages(p.images)
          }));
          setProducts(updated);
        } catch {
          setProducts(initialProducts);
        }
      }
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart) as CartItem[];
          const updated = parsed.map(item => ({
            ...item,
            product: {
              ...item.product,
              images: rewriteImages(item.product.images)
            }
          }));
          setCart(updated);
        } catch {
          setCart([]);
        }
      }
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders) as Order[];
          const updated = parsed.map(order => ({
            ...order,
            items: order.items.map(item => ({
              ...item,
              product: {
                ...item.product,
                images: rewriteImages(item.product.images)
              }
            }))
          }));
          setOrders(updated);
        } catch {
          setOrders(initialOrders);
        }
      }
      if (storedWishlist) {
        try {
          const parsed = JSON.parse(storedWishlist) as Product[];
          const updated = parsed.map(p => ({
            ...p,
            images: rewriteImages(p.images)
          }));
          setWishlist(updated);
        } catch {
          setWishlist([]);
        }
      }
      if (storedRole) setUserRole(storedRole as "customer" | "admin");
      
      setIsLoaded(true);
    }
  }, []);

  // Sync state to localStorage when variables change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("nes_products", JSON.stringify(products));
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("nes_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("nes_orders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("nes_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("nes_role", userRole);
    }
  }, [userRole, isLoaded]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const id = "cart-" + Math.random().toString(36).substr(2, 9);
    setCart((prev) => [...prev, { ...newItem, id }]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderData: {
    items: CartItem[];
    customerDetails: Order["customerDetails"];
    paymentDetails: Omit<Order["paymentDetails"], "invoiceUrl">;
    total: number;
  }) => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `NES-${new Date().getFullYear()}-${randNum}`;
    
    // Simulate estimated delivery 10 days from now
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 10);
    const formattedEstDate = estDate.toISOString().split("T")[0];

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      items: orderData.items,
      customerDetails: orderData.customerDetails,
      paymentDetails: {
        ...orderData.paymentDetails,
        invoiceUrl: `/invoices/${orderId}.pdf`
      },
      shippingDetails: {
        status: "pending",
        estimatedDelivery: formattedEstDate
      },
      total: orderData.total
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order["shippingDetails"]["status"],
    courier?: string,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedShipping = {
            ...order.shippingDetails,
            status,
            ...(courier ? { courier } : {}),
            ...(trackingNumber ? { trackingNumber } : {})
          };
          
          const updatedPayment = { ...order.paymentDetails };
          // Auto-mark payment as paid if the order progresses beyond pending
          if (status !== "pending") {
            updatedPayment.status = "paid";
          }

          return {
            ...order,
            paymentDetails: updatedPayment,
            shippingDetails: updatedShipping
          };
        }
        return order;
      })
    );
  };

  const addMockProduct = (newProduct: Omit<Product, "id" | "rating" | "reviews">) => {
    const id = "prod-" + (products.length + 1);
    const productWithMeta: Product = {
      ...newProduct,
      id,
      rating: 5.0,
      reviews: []
    };
    setProducts((prev) => [...prev, productWithMeta]);
  };

  const editMockProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
  };

  const deleteMockProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        wishlist,
        toggleWishlist,
        userRole,
        setUserRole,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addMockProduct,
        editMockProduct,
        deleteMockProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
