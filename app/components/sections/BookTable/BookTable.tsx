"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from "@/app/components/sectionTitle/SectionTitle";
import { fadeUpVariants, containerVariants } from "@/app/utils/animations";
import CustomSelect from "./CustomSelect";

const BookTable = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // --- STATE MANAGEMENT ---
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [selectedPartySize, setSelectedPartySize] = useState("2 guests");

  // --- DATA GENERATION ---
  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5+ guests"];

  const timeOptions = [];
  for (let h = 9; h <= 23; h++) {
    const hour = h < 10 ? `0${h}` : h;
    timeOptions.push(`${hour}:00`);
    if (h !== 23) timeOptions.push(`${hour}:30`);
  }

  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // --- HELPERS ---
  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  };

  const inputStyle = `
    w-full bg-transparent text-white font-alt text-2xl outline-none 
    placeholder:text-white/70 [color-scheme:dark] min-[2000px]:text-[2rem]
  `;

  return (
    <section id="book" ref={ref} className="mx-auto w-full flex flex-col gap-12">
      <SectionTitle title="Book A Table" isInView={isInView} />

      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* SECTION: PERSONAL INFO */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.div variants={fadeUpVariants} className="flex flex-col gap-2 border-b border-white/20 group relative">
            <label className="text-golden font-alt text-xl uppercase tracking-widest">Full Name</label>
            <input type="text" placeholder="John Doe" required className={inputStyle} />
          </motion.div>
          <motion.div variants={fadeUpVariants} className="flex flex-col gap-2 border-b border-white/20 group relative">
            <label className="text-golden font-alt text-xl uppercase tracking-widest">Email Address</label>
            <input type="email" placeholder="example@mail.com" required className={inputStyle} />
          </motion.div>
        </div>

        {/* SECTION: CONTACT & PARTY */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.div variants={fadeUpVariants} className="flex flex-col gap-2 border-b border-white/20 group relative">
            <label className="text-golden font-alt text-xl uppercase tracking-widest">Phone Number</label>
            <input type="tel" placeholder="+1 (___) ___ ____" required className={inputStyle} />
          </motion.div>

          <CustomSelect
            label="Party Size"
            value={selectedPartySize}
            options={partyOptions}
            isOpen={openMenu === "party"}
            onToggle={() => toggleMenu("party")}
            onSelect={(val: string) => { setSelectedPartySize(val); setOpenMenu(null); }}
            variants={fadeUpVariants}
          />
        </div>

        {/* SECTION: DATE & TIME */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <CustomSelect
            label="Date"
            value={formatDate(selectedDate)}
            options={dateOptions.map(d => ({ label: formatDate(d), value: d }))}
            isOpen={openMenu === "date"}
            onToggle={() => toggleMenu("date")}
            onSelect={(opt: any) => { setSelectedDate(opt.value); setOpenMenu(null); }}
            variants={fadeUpVariants}
          />

          <CustomSelect
            label="Time"
            value={selectedTime}
            options={timeOptions}
            isOpen={openMenu === "time"}
            onToggle={() => toggleMenu("time")}
            onSelect={(val: string) => { setSelectedTime(val); setOpenMenu(null); }}
            variants={fadeUpVariants}
          />
        </div>

        {/* SECTION: REQUESTS */}
        <motion.div variants={fadeUpVariants} className="flex flex-col gap-2 border-b border-white/20 group relative">
          <label className="text-golden font-alt text-xl uppercase tracking-widest">Special Requests</label>
          <textarea placeholder="Tell us anything..." rows={1} className={`${inputStyle} resize-none`} />
        </motion.div>

        {/* SECTION: REQUESTS */}
        <motion.div variants={fadeUpVariants} className="flex flex-col gap-2 border-b border-white/20 group relative">
          <label className="text-golden font-alt text-xl uppercase tracking-widest">Special Requests</label>
          <textarea placeholder="Tell us anything..." rows={1} className={`${inputStyle} resize-none`} />
        </motion.div>

        {/* SUBMIT SECTION */}
        <motion.div variants={fadeUpVariants} className="flex justify-center">
          <button
            type="submit"
            className="group relative text-2xl cursor-pointer overflow-hidden border-2 border-golden px-12 py-4   tracking-[0.2em] text-white transition-all hover:bg-golden hover:text-black active:scale-95 min-[2000px]:text-[1.8rem] mt-4"
          >
            <span className="relative z-10">Book</span>
            <div className="absolute inset-0 z-0 translate-y-full bg-golden transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </motion.div>
      </motion.form>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; }
      `}</style>
    </section>
  );
};

export default BookTable;