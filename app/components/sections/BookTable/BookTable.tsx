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
    w-full bg-transparent text-golden font-alt text-2xl outline-none 
    placeholder:text-white/40 [color-scheme:dark] min-[2000px]:text-[2rem]
  `;

  const FieldWrapper = ({ label, children, gridArea, placeholder }: { label: string; children: React.ReactNode; gridArea: string; placeholder?: string }) => (
    <motion.div 
      variants={fadeUpVariants} 
      className={`${gridArea} flex flex-col gap-1 md:gap-2 lg:gap-4 border-b border-white/20 group relative pb-1 md:pb-2 transition-all hover:border-golden`}
    >
      <label className="text-xl uppercase tracking-widest text-white/90">{label}</label>
      {children}
      <div className="absolute bottom-[-1px] left-0 h-[1px] w-full bg-golden scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  );

  return (
    <section id="book" ref={ref} className="mx-auto w-full flex flex-col gap-4 md:gap-8 lg:gap-10">
      <SectionTitle title="Book A Table" isInView={isInView} />

      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 gap-x-[5px] gap-y-[20px] md:gap-x-10 md:gap-y-[30px]"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Full Name */}
        <FieldWrapper label="Full Name" gridArea="col-span-2 md:col-span-1">
          <input type="text" placeholder="John Doe" required className={inputStyle} />
        </FieldWrapper>

        {/* Email Address */}
        <FieldWrapper label="Email Address" gridArea="col-span-2 md:col-span-1">
          <input type="email" placeholder="example@mail.com" required className={inputStyle} />
        </FieldWrapper>

        {/* div3: Phone Number */}
        <FieldWrapper label="Phone Number" gridArea="col-span-2 md:col-span-1">
          <input type="tel" placeholder="+1 (___) ___ ____" required className={inputStyle} />
        </FieldWrapper>

        {/* Party Size */}
        <CustomSelect
          label="Party Size"
          value={selectedPartySize}
          options={partyOptions}
          isOpen={openMenu === "party"}
          onToggle={() => toggleMenu("party")}
          onSelect={(val: string) => { setSelectedPartySize(val); setOpenMenu(null); }}
          variants={fadeUpVariants}
          className="col-span-1 md:col-span-1"
        />

        {/* Date */}
<CustomSelect
  label="Time"
  value={selectedTime}
  options={timeOptions}
  isOpen={openMenu === "time"}
  onToggle={() => toggleMenu("time")}
  onSelect={(val: string) => { setSelectedTime(val); setOpenMenu(null); }}
  variants={fadeUpVariants}
  className="col-span-1 md:col-span-1"
/>

<CustomSelect
  label="Date"
  value={formatDate(selectedDate)}
  options={dateOptions.map(d => ({ label: formatDate(d), value: d }))}
  isOpen={openMenu === "date"}
  onToggle={() => toggleMenu("date")}
  onSelect={(opt: any) => { setSelectedDate(opt.value); setOpenMenu(null); }}
  variants={fadeUpVariants}
  className="col-span-2 md:col-span-1"
/>
        {/* Special Requests */}
        <FieldWrapper label="Special Requests" gridArea="col-span-2">
          <textarea placeholder="Tell us anything..." rows={1} className={`${inputStyle} resize-none`} />
        </FieldWrapper>

        {/* Submit Section */}
        <motion.div variants={fadeUpVariants} className="col-span-2 flex justify-center pt-4">
          <button
            type="submit"
            className="group relative text-2xl cursor-pointer overflow-hidden border-2 border-golden px-12 py-4 tracking-[0.2em] text-white transition-all hover:bg-golden hover:text-black active:scale-95 w-full md:w-auto font-alt"
          >
            <span className="relative z-10 font-bold uppercase">Book</span>
            <div className="absolute inset-0 z-0 translate-y-full bg-golden transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </motion.div>
      </motion.form>
    </section>
  );
};

export default BookTable;