"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Plane, Clock, Car, Sparkles, ChevronDown, Phone, Mail, MapPin, Check } from "lucide-react";

export default function NoireWebsite() {
  const [activeTab, setActiveTab] = useState<"home" | "lax">("home");

  const content = useMemo(() => (activeTab === "home" ? <Home /> : <LaxLanding />), [activeTab]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
          {content}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TopBar({ activeTab, setActiveTab }: { activeTab: "home" | "lax"; setActiveTab: (t: "home" | "lax") => void }) {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-900/70 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button onClick={() => setActiveTab("home")} className="group flex items-center gap-2" aria-label="Go to home">
          <div className="h-9 w-9 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-sm" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.25em]">NOIRE</div>
            <div className="text-[11px] text-zinc-400">Private Chauffeur</div>
          </div>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <NavPill label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavPill label="LAX" active={activeTab === "lax"} onClick={() => setActiveTab("lax")} />
          <a href="tel:13104224708" className="ml-2 rounded-2xl bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">
            Call Private Chauffeur
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setActiveTab(activeTab === "home" ? "lax" : "home")} className="rounded-2xl border border-zinc-800 px-3 py-2 text-sm">
            {activeTab === "home" ? "LAX" : "Home"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NavPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-2xl px-4 py-2 text-sm transition " +
        (active ? "bg-zinc-900 text-zinc-50 border border-zinc-800" : "text-zinc-300 hover:text-zinc-50 hover:bg-zinc-900/60 border border-transparent")
      }
    >
      {label}
    </button>
  );
}

function Hero({ badge, title, subtitle, ctaPrimary, ctaSecondary }: { badge: string; title: React.ReactNode; subtitle: React.ReactNode; ctaPrimary: { label: string; href: string }; ctaSecondary?: { label: string; href: string } }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-zinc-800/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-zinc-700/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 text-xs text-zinc-300">
          <Shield className="h-4 w-4" />
          <span className="tracking-wide">{badge}</span>
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
            <p className="mt-4 text-base text-zinc-300 md:text-lg">{subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={ctaPrimary.href} className="rounded-2xl bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">
                {ctaPrimary.label}
              </a>
              {ctaSecondary && (
                <a href={ctaSecondary.href} className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-50 hover:bg-zinc-900">
                  {ctaSecondary.label}
                </a>
              )}
              <div className="w-full text-xs text-zinc-400 md:w-auto">All requests are personally reviewed.</div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <MiniStat icon={<Lock className="h-4 w-4" />} label="NDA-ready" />
              <MiniStat icon={<Sparkles className="h-4 w-4" />} label="White-glove" />
              <MiniStat icon={<Car className="h-4 w-4" />} label="Unbranded" />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-gradient-to-b from-zinc-950 to-zinc-900/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs tracking-[0.25em] text-zinc-400">FLEET</div>
                <div className="mt-1 text-lg font-semibold">Escalade • Suburban • EQS</div>
              </div>
              <ChevronDown className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="mt-6 space-y-3">
              <FleetRow name="Cadillac Escalade" note="Celebrity & high-profile clients" />
              <FleetRow name="Chevrolet Suburban" note="Executive & airport elite" />
              <FleetRow name="Mercedes EQS" note="Silent electric luxury" />
            </div>
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span className="font-semibold text-zinc-50">Airport • Hourly • Monthly</span>
              </div>
              <div className="mt-1 text-zinc-400">Los Angeles • Beverly Hills • LAX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 px-3 py-3 text-sm">
      <div className="flex items-center gap-2 text-zinc-300">
        <span className="text-zinc-50">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}

function FleetRow({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950/40 px-4 py-3">
      <div>
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-zinc-400">{note}</div>
      </div>
      <a href="#request" className="text-xs font-semibold text-zinc-200 hover:text-zinc-50">
        Request
      </a>
    </div>
  );
}

function Section({ id, kicker, title, children }: { id?: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-xs tracking-[0.35em] text-zinc-500">{kicker}</div>
      <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 text-zinc-50">{icon}</div>
        <div className="text-base font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm text-zinc-300">{desc}</div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Hero
        badge="PRIVATE CHAUFFEUR • BY REQUEST ONLY"
        title={
          <>
            Private Chauffeur.
            <br />
            Ultra Luxury. Absolute Discretion.
          </>
        }
        subtitle={
          <>
            A private chauffeur service for executives, celebrities, and private clients.
            <br />
            Escalade • Suburban • Mercedes EQS — Los Angeles • Beverly Hills • LAX.
          </>
        }
        ctaPrimary={{ label: "Request Private Chauffeur", href: "#request" }}
        ctaSecondary={{ label: "LAX Service", href: "#airport" }}
      />

      <Section kicker="WHY" title="NOIRE Standards">
        <div className="grid gap-4 md:grid-cols-3">
          <Card icon={<Lock className="h-5 w-5" />} title="Absolute Discretion" desc="Unbranded vehicles and NDA-ready service for high-profile clients." />
          <Card icon={<Shield className="h-5 w-5" />} title="One Client • One Chauffeur" desc="Dedicated, consistent experience — calm, professional, and private." />
          <Card icon={<Sparkles className="h-5 w-5" />} title="White-Glove Service" desc="Terminal coordination, luggage assistance, and uncompromising standards." />
        </div>
      </Section>

      <Section kicker="FLEET" title="Escalade • Suburban • EQS">
        <div className="grid gap-4 md:grid-cols-3">
          <FleetCard name="Cadillac Escalade" tag="Celebrity" desc="For high-profile clients and premium events." />
          <FleetCard name="Chevrolet Suburban" tag="Executive" desc="Corporate transport and airport elite." />
          <FleetCard name="Mercedes EQS" tag="Silent" desc="Silent electric luxury with a quiet presence." />
        </div>
      </Section>

      <Section id="airport" kicker="AIRPORT" title="LAX Private Chauffeur">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Plane className="h-5 w-5" />
              Terminal Coordination
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <Bullet>Flight tracking included</Bullet>
              <Bullet>Discreet pickup (signage only if requested)</Bullet>
              <Bullet>Meet & greet upon request</Bullet>
              <Bullet>Professional uniformed chauffeurs</Bullet>
            </ul>
            <a href="#request" className="mt-6 inline-flex rounded-2xl bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">
              Request LAX Chauffeur
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-5 w-5" />
              Fixed Ultra-Luxury Pricing
            </div>
            <div className="mt-4 grid gap-3">
              <PriceRow label="Mercedes EQS" value="$240–$280" />
              <PriceRow label="Chevrolet Suburban" value="$300–$360" />
              <PriceRow label="Cadillac Escalade" value="$360–$420" />
            </div>
            <div className="mt-4 text-xs text-zinc-400">Ultra-luxury service. Fixed pricing. No negotiations.</div>
          </div>
        </div>
      </Section>

      <Section kicker="MONTHLY" title="Monthly Private Chauffeur">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6">
            <div className="text-sm font-semibold">Designed for executives & private clients</div>
            <div className="mt-2 text-sm text-zinc-300">Dedicated chauffeur, fixed availability, priority scheduling, and consistent service.</div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <Bullet>Assigned chauffeur</Bullet>
              <Bullet>Fixed schedule & availability</Bullet>
              <Bullet>Priority booking</Bullet>
              <Bullet>NDA included</Bullet>
            </ul>
            <a href="#request" className="mt-6 inline-flex rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-50 hover:bg-zinc-900">
              Request Monthly Availability
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6">
            <div className="text-sm font-semibold">Monthly pricing</div>
            <div className="mt-4 grid gap-3">
              <PriceRow label="Suburban" value="$8,500–$9,500" />
              <PriceRow label="Escalade" value="$10,500–$12,000" />
            </div>
            <div className="mt-4 text-xs text-zinc-400">We limit monthly availability.</div>
          </div>
        </div>
      </Section>

      <RequestSection />
    </div>
  );
}

function LaxLanding() {
  return (
    <div>
      <Hero
        badge="LAX • PRIVATE AIRPORT CHAUFFEUR"
        title={
          <>
            Private Chauffeur at LAX.
            <br />
            Ultra Luxury. Absolute Discretion.
          </>
        }
        subtitle={
          <>
            We do not provide “rides”. We provide private chauffeurs.
            <br />
            Escalade • Suburban • Mercedes EQS — Los Angeles • Beverly Hills.
          </>
        }
        ctaPrimary={{ label: "Request LAX Chauffeur", href: "#request" }}
        ctaSecondary={{ label: "View Fleet", href: "#fleet" }}
      />

      <Section kicker="LAX" title="The NOIRE Airport Standard">
        <div className="grid gap-4 md:grid-cols-3">
          <Card icon={<Plane className="h-5 w-5" />} title="Terminal Coordination" desc="Flight tracking, discreet terminal coordination, and smooth curbside pickup." />
          <Card icon={<Lock className="h-5 w-5" />} title="Discreet by Default" desc="Unbranded vehicles. Signage only if requested. NDA-ready." />
          <Card icon={<Sparkles className="h-5 w-5" />} title="White-Glove Assistance" desc="Professional chauffeurs, luggage assistance, and a calm, private arrival." />
        </div>
      </Section>

      <Section id="fleet" kicker="FLEET" title="Choose Your Vehicle">
        <div className="grid gap-4 md:grid-cols-3">
          <FleetCard name="Cadillac Escalade" tag="Celebrity" desc="Premium SUV for high-profile arrivals." />
          <FleetCard name="Chevrolet Suburban" tag="Executive" desc="Corporate, family, and airport elite." />
          <FleetCard name="Mercedes EQS" tag="Silent" desc="Executive electric luxury." />
        </div>
      </Section>

      <Section kicker="PRICING" title="Fixed Ultra-Luxury Pricing">
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6">
          <div className="grid gap-3 md:grid-cols-3">
            <PriceRow label="Mercedes EQS" value="$240–$280" />
            <PriceRow label="Chevrolet Suburban" value="$300–$360" />
            <PriceRow label="Cadillac Escalade" value="$360–$420" />
          </div>
          <div className="mt-4 text-xs text-zinc-400">Ultra-luxury service. Fixed pricing. No negotiations.</div>
        </div>
      </Section>

      <RequestSection isLax />
    </div>
  );
}

function FleetCard({ name, tag, desc }: { name: string; tag: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold">{name}</div>
          <div className="mt-1 text-sm text-zinc-300">{desc}</div>
        </div>
        <div className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-300">{tag}</div>
      </div>
      <a href="#request" className="mt-6 inline-flex rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-semibold hover:bg-zinc-900">
        Request This Vehicle
      </a>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-full border border-zinc-800 bg-zinc-950 p-1">
        <Check className="h-3 w-3" />
      </div>
      <div>{children}</div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950/40 px-4 py-3">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-sm text-zinc-200">{value}</div>
    </div>
  );
}

function RequestSection({ isLax }: { isLax?: boolean } = {}) {
  return (
    <section id="request" className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <div className="text-xs tracking-[0.35em] text-zinc-500">REQUEST</div>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Request {isLax ? "Private LAX Chauffeur" : "Private Chauffeur"}</h2>
          <p className="mt-3 text-sm text-zinc-300">
            Discreet service for executives, celebrities, and private clients. All requests are personally reviewed and confirmed.
          </p>

          <div className="mt-8 space-y-4 text-sm text-zinc-300">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-zinc-400" />
              Los Angeles • Beverly Hills • LAX
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-zinc-400" />
              (310) 422-4708
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-400" />
              concierge@noirevip.com
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 text-sm text-zinc-300">
            <div className="font-semibold text-zinc-50">NDA-ready • Unbranded • White-glove</div>
            <div className="mt-2 text-zinc-400">We limit monthly availability.</div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you. Your private request has been received. Our concierge will contact you shortly.");
          }}
          className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6"
        >
          <div className="grid gap-4">
            <Field label="Name" placeholder="Full name" />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Phone" placeholder="(###) ###-####" />
              <Field label="Email" placeholder="you@email.com" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Select label="Service" options={["Airport (LAX)", "Hourly (Min 3 hrs)", "Monthly", "Event"]} defaultValue={isLax ? "Airport (LAX)" : "Airport (LAX)"} />
              <Select label="Vehicle" options={["Escalade", "Suburban", "Mercedes EQS", "No Preference"]} defaultValue="Escalade" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Date" placeholder="MM/DD/YYYY" />
              <Field label="Time" placeholder="HH:MM" />
            </div>
            <Field label="Flight # (optional)" placeholder="e.g., AA123" />
            <TextArea label="Notes" placeholder="Pickup details, number of passengers, luggage, special requests…" />

            <button type="submit" className="mt-2 rounded-2xl bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">
              Submit Private Request
            </button>

            <div className="text-xs text-zinc-400">Your request will be personally confirmed.</div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-zinc-200">{label}</span>
      <input className="h-11 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600" placeholder={placeholder} />
    </label>
  );
}

function TextArea({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-zinc-200">{label}</span>
      <textarea
        rows={4}
        className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        placeholder={placeholder}
      />
    </label>
  );
}

function Select({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-zinc-200">{label}</span>
      <select defaultValue={defaultValue} className="h-11 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="text-xs tracking-[0.25em] text-zinc-500">NOIRE</div>
        <div className="text-xs text-zinc-500">© {new Date().getFullYear()} NOIRE Private Chauffeur. All rights reserved.</div>
      </div>
    </footer>
  );
}
