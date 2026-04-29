'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { branches } from '@/lib/branches';
import { useLang } from '@/lib/lang';

export default function Home() {
  const t = useLang();

  return (
    <>
      <Header />
      
{/* Hero Section */}
      <section className="relative min-h-[100vh] px-[5%] pt-[120px] md:pt-[100px] pb-[80px] bg-white dark:bg-[#0e0c0a]" style={{
        background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(232,98,10,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(232,98,10,0.04) 0%, transparent 70%)',
      }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-[60px] md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-[30px] border border-[rgba(232,98,10,0.2)] dark:border-[#E8620A]/30 bg-[rgba(232,98,10,0.1)] dark:bg-[#E8620A]/10 px-[14px] py-[6px]">
              <span className="h-2 w-2 rounded-full bg-[#0a6e3f] animate-pulse" />
              <span className="text-xs font-medium text-[#0a6e3f] dark:text-[#0a6e3f]">{t.hero.badge}</span>
            </div>

            <h1 className="text-[clamp(36px,4.5vw,56px)] font-[800] leading-[1.08] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-[#0e0c0a] dark:text-white">{t.hero.headlineMain}</span>
              <span className="text-[#E8620A] dark:text-[#E8620A] not-italic"> {t.hero.headlineAccent}</span>
            </h1>

            <p className="max-w-[480px] text-[17px] leading-[1.7]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              <span className="text-[#6b6560] dark:text-[#aaa]">{t.hero.sub}</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="rounded-[14px] bg-[#E8620A] px-[28px] py-[14px] text-white font-[700] shadow-[0_4px_20px_rgba(232,98,10,0.3)] transition-all hover:-translate-y-[2px] hover:shadow-[0_6px_24px_rgba(232,98,10,0.4)]">
                {t.hero.ctaPrimary}
              </Link>
              <Link href="#branches" className="rounded-[14px] border border-[rgba(14,12,10,0.12)] dark:border-[#333] bg-white dark:bg-[#1e1e1e] px-[28px] py-[14px] text-[#0e0c0a] dark:text-white font-[500] transition-all hover:-translate-y-[2px] hover:border-[#E8620A] hover:text-[#E8620A] dark:hover:text-[#E8620A]">
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white dark:border-[#0e0c0a] bg-[#E8620A] text-xs font-bold text-white">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-[13px] text-[#6b6560] dark:text-[#aaa]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {t.hero.trust}
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative rounded-[24px] border border-[rgba(0,0,0,0.06)] bg-white dark:bg-[#1e1e1e] dark:border-[#333] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <div className="flex h-[240px] items-center justify-center rounded-[16px] bg-gradient-to-br from-[#fff3eb] to-[#ffe0c8]">
                <span className="text-[80px]">🥬</span>
              </div>
              <div className="px-4 py-5">
                <h3 className="text-[18px] font-[700] text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)' }}>Fresh Spinach Bunch</h3>
                <p className="mt-1 text-[13px] text-[#6b6560] dark:text-[#aaa]">Imported · Per bunch</p>
              </div>
              <div className="flex items-center justify-between border-t border-[#f5f2ee] dark:border-[#333] px-6 py-4">
                <span className="text-[20px] font-[700] text-[#E8620A]" style={{ fontFamily: 'var(--font-syne)' }}>RWF 1,200</span>
                <button className="rounded-[8px] bg-[#E8620A] px-4 py-2 text-sm font-[500] text-white">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-y border-[rgba(232,98,10,0.12)] bg-[#fffbf7] dark:bg-[#1a1713] dark:border-[#333] px-[5%] py-[40px]">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-8 md:gap-16">
          {[
            { num: '789', label: t.stats.products },
            { num: '9', label: t.stats.branches },
            { num: '45 min', label: t.stats.readyTime },
            { num: '10,000+', label: t.stats.customers },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[28px] font-extrabold text-[#E8620A]" style={{ fontFamily: 'var(--font-syne)' }}>{stat.num}</span>
              <span className="text-[13px] text-[#6b6560] dark:text-[#aaa]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Value Props Section */}
      <section className="bg-[#f5f2ee] dark:bg-[#1a1a1a] px-[5%] py-[80px]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-[11px] font-[500] uppercase tracking-wider text-[#E8620A]">{t.valueProps.label}</p>
          <h2 className="mb-12 text-[32px] font-[800] text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)' }}>{t.valueProps.title}</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '⚡', title: t.valueProps.prop1Title, desc: t.valueProps.prop1Desc },
              { icon: '💛', title: t.valueProps.prop2Title, desc: t.valueProps.prop2Desc },
              { icon: '📍', title: t.valueProps.prop3Title, desc: t.valueProps.prop3Desc },
              { icon: '🌍', title: t.valueProps.prop4Title, desc: t.valueProps.prop4Desc },
            ].map((prop, i) => (
              <div key={i} className="group rounded-[20px] border border-[rgba(14,12,10,0.08)] dark:border-[#333] bg-white dark:bg-[#1e1e1e] p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff3eb] dark:bg-[#2a2a2a] text-2xl transition-transform group-hover:scale-110">{prop.icon}</div>
                <h3 className="mb-2 text-[18px] font-[700] text-[#0e0c0a] dark:text-white transition-colors group-hover:text-[#E8620A]" style={{ fontFamily: 'var(--font-syne)' }}>{prop.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6b6560] dark:text-[#aaa]" style={{ fontFamily: 'var(--font-dm-sans)' }}>{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white dark:bg-[#111] px-[5%] py-[80px]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-[11px] font-[500] uppercase tracking-wider text-[#E8620A]">{t.how.label}</p>
          <h2 className="mb-12 text-[32px] font-[800] text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)' }}>{t.how.title}</h2>
          
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="hidden md:absolute md:top-[50px] md:left-[12%] md:right-[12%] md:grid md:grid-cols-4 md:pointer-events-none">
              <div className="col-span-1 border-b-2 border-dashed border-[#E8620A]/30" />
              <div className="col-span-1 border-b-2 border-dashed border-[#E8620A]/30" />
              <div className="col-span-1 border-b-2 border-dashed border-[#E8620A]/30" />
              <div className="col-span-1 border-b-2 border-dashed border-[#E8620A]/30" />
            </div>
            
            {[
              { step: '1', title: t.how.step1Title, desc: t.how.step1Desc },
              { step: '2', title: t.how.step2Title, desc: t.how.step2Desc },
              { step: '3', title: t.how.step3Title, desc: t.how.step3Desc },
              { step: '4', title: t.how.step4Title, desc: t.how.step4Desc },
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center rounded-[20px] border border-transparent p-4">
                <div className="relative mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-dashed border-[#E8620A] bg-white dark:bg-[#1e1e1e] text-[#E8620A] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8620A] group-hover:text-white group-hover:border-[#E8620A]">
                  <span className="text-[20px] font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{item.step}</span>
                </div>
                <h3 className="mb-2 text-[18px] font-[700] text-[#0e0c0a] dark:text-white transition-colors group-hover:text-[#E8620A]" style={{ fontFamily: 'var(--font-syne)' }}>{item.title}</h3>
                <p className="text-[14px] text-[#6b6560] dark:text-[#aaa]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white dark:bg-[#111] px-[5%] py-[80px]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-[11px] font-[500] uppercase tracking-wider text-[#E8620A]">{t.categories.label}</p>
          <h2 className="mb-12 text-[32px] font-[800] text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)' }}>{t.categories.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: t.categories.food, emoji: '🥦', slug: 'Food Products' },
              { name: t.categories.drinks, emoji: '🍺', slug: 'Alcoholic Drinks' },
              { name: t.categories.cosmetics, emoji: '💄', slug: 'Cosmetics & Personal Care' },
              { name: t.categories.cleaning, emoji: '🧹', slug: 'Cleaning & Sanitary' },
              { name: t.categories.kitchenware, emoji: '🍳', slug: 'Kitchenware & Electronics' },
              { name: t.categories.baby, emoji: '👶', slug: 'Baby Products' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center gap-3 rounded-[20px] border border-[rgba(14,12,10,0.08)] dark:border-[#333] bg-white dark:bg-[#1e1e1e] p-6 text-center transition-all hover:-translate-y-1 hover:border-[#E8620A] hover:shadow-lg"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="text-[14px] font-[500] text-[#0e0c0a] dark:text-white group-hover:text-[#E8620A]">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="bg-[#fafaf9] dark:bg-[#111] px-[5%] py-[80px]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-[11px] font-[500] uppercase tracking-wider text-[#E8620A]">{t.branches.label}</p>
          <h2 className="mb-12 text-[32px] font-[800] text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)' }}>{t.branches.title}</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div key={branch.id} className="group rounded-[16px] border border-[rgba(14,12,10,0.08)] bg-white p-5 transition-all hover:border-[#E8620A] hover:shadow-md dark:bg-[#1e1e1e] dark:border-[#333]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff3eb] text-[#E8620A]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[16px] font-[700] text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)' }}>{branch.name}</h3>
                    <p className="text-[13px] text-[#6b6560] dark:text-[#aaa]">{branch.address}</p>
                    <p className="text-[12px] text-[#9ca3af]">{branch.sector}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-[#E8620A] to-[#c04f06] px-[5%] py-[100px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-[40px] font-[800] text-white" style={{ fontFamily: 'var(--font-syne)' }}>{t.cta.title}</h2>
          <p className="mb-8 text-white/90" style={{ fontFamily: 'var(--font-dm-sans)' }}>{t.cta.sub}</p>
          <Link href="/shop" className="inline-block rounded-[14px] bg-white px-[36px] py-[14px] text-[#E8620A] font-[700] transition-transform hover:scale-105">
            {t.cta.button}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e0c0a] px-[5%] py-[60px] pb-[30px]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-[12px] font-[700] uppercase tracking-wider text-white/60">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">All Products</Link></li>
              <li><Link href="/shop?category=Food+Products" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">Food Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-[700] uppercase tracking-wider text-white/60">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/auth" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">Sign In</Link></li>
              <li><Link href="/auth?tab=register" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-[700] uppercase tracking-wider text-white/60">Help</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">FAQ</a></li>
              <li><a href="#" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">Delivery Info</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-[700] uppercase tracking-wider text-white/60">Branches</h4>
            <ul className="space-y-2">
              <li><a href="#branches" className="text-[13px] text-[#9ca3af] hover:text-[#E8620A]">View All Branches</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/10 pt-8 text-[12px] text-[#4b5563]">
          <span>© 2025 Simba Supermarket Ltd · Kigali, Rwanda</span>
          <span>🦁 Built with ❤️ for Rwanda</span>
        </div>
      </footer>
    </>
  );
}