import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-white border-t border-brand-brown/20 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wider text-brand-tuscan">
                NORTHEASTERN
              </span>
              <span className="font-sans text-[8px] font-bold tracking-[0.3em] text-brand-white/50 -mt-1 uppercase">
                Stitch Co. • Est. 2024
              </span>
            </Link>
            <p className="text-xs text-brand-white/70 max-w-md font-sans leading-relaxed">
              A tribute to heritage and resilience. We craft authentic, custom-tailored traditional Nigerian attire designed to connect stories and transcend borders.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-brand-white/60">
                <Award className="h-4 w-4 text-brand-sage" />
                <span>Premium Quality Stitches</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-tuscan">
                  Collections
                </h3>
                <ul role="list" className="mt-4 space-y-2.5 text-xs text-brand-white/60">
                  <li>
                    <Link href="/catalog?category=Agbada" className="hover:text-brand-white">
                      Royal Agbadas
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=Senator" className="hover:text-brand-white">
                      Senator Wears
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=Kaftan" className="hover:text-brand-white">
                      Heritage Kaftans
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=Native" className="hover:text-brand-white">
                      Geometric Native Suits
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-tuscan">
                  Customer Care
                </h3>
                <ul role="list" className="mt-4 space-y-2.5 text-xs text-brand-white/60">
                  <li>
                    <Link href="/track/NES-2026-9401" className="hover:text-brand-white">
                      Order Tracking
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog" className="hover:text-brand-white">
                      Custom Sizing Guide
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-white">
                      Shipping & Customs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-white">
                      Returns & Adjustments
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Studio Info */}
            <div>
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-tuscan">
                The Stitch Studio
              </h3>
              <ul role="list" className="mt-4 space-y-3 text-xs text-brand-white/60">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-brand-sage shrink-0 mt-0.5" />
                  <span>
                    5ft x 5ft Embroidery Room,<br />
                    Northeastern Stitch Co. Workshop
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-sage shrink-0" />
                  <span>+44 7700 900077</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-sage shrink-0" />
                  <span>studio@northeasternstitches.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-brand-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-brand-white/40">
            &copy; {new Date().getFullYear()} NorthEastern Stitches Online Store. All rights reserved.
          </p>
          <p className="text-[10px] text-brand-white/40 italic">
            Rooted in heritage. Driven by resilience.
          </p>
        </div>
      </div>
    </footer>
  );
}
