"use client";

import React, { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from "@/app/components/sectionTitle/SectionTitle";
import { fadeUpVariants, containerVariants } from "@/app/utils/animations";
import CustomSelect from "./CustomSelect";
import { useTranslation } from "@/app/hooks/useTranslation";

const BookTable = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useTranslation();

  const [hasAnimated, setHasAnimated] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(() => Date.now());
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [selectedPartySize, setSelectedPartySize] = useState("booking_2_guests");

  const partyOptions = useMemo(() => [
    "booking_1_guest",
    "booking_2_guests",
    "booking_3_guests",
    "booking_4_guests",
    "booking_5_plus_guests"
  ], []);

  const timeOptions = useMemo(() => {
    const arr: string[] = [];
    for (let h = 9; h <= 23; h++) {
      const hour = h < 10 ? `0${h}` : h;
      arr.push(`${hour}:00`);
      if (h !== 23) arr.push(`${hour}:30`);
    }
    return arr;
  }, []);

  const dateOptions = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
        value: d.getTime()
      };
    });
  }, []);

  const shouldAnimate = isInView && !hasAnimated;

  React.useEffect(() => {
    if (shouldAnimate) setHasAnimated(true);
  }, [shouldAnimate]);

  const toggleMenu = (menu: string) =>
    setOpenMenu(prev => (prev === menu ? null : menu));

  const inputStyle = `
    w-full bg-transparent text-golden font-alt text-2xl outline-none 
    placeholder:text-white/40 [color-scheme:dark] min-[2000px]:text-[2rem]
  `;

  const FieldWrapper = ({
    label,
    children,
    gridArea
  }: {
    label: string;
    children: React.ReactNode;
    gridArea: string;
  }) => (
    <motion.div
      variants={fadeUpVariants}
      initial={false}
      animate={shouldAnimate ? "visible" : "visible"}
      className={`${gridArea} flex flex-col gap-1 md:gap-2 lg:gap-4 border-b border-white/20 group relative pb-1 md:pb-2 transition-all hover:border-golden`}
    >
      <label className="text-xl uppercase tracking-widest text-white/90">{label}</label>
      {children}
      <div className="absolute bottom-[-1px] left-0 h-[1px] w-full bg-golden scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  );

  return (
    <section id="book" ref={ref} className="mx-auto w-full flex flex-col gap-4 md:gap-8 lg:gap-10">
      <SectionTitle title={t('booking_title')} isInView={isInView} />

      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "visible"}
        className="grid grid-cols-2 gap-x-[5px] gap-y-[20px] md:gap-x-10 md:gap-y-[30px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <FieldWrapper label={t('booking_full_name')} gridArea="col-span-2 md:col-span-1">
          <input type="text" maxLength={50}
          placeholder={t('booking_full_name_placeholder')} required className={inputStyle} />
        </FieldWrapper>

        <FieldWrapper label={t('booking_email')} gridArea="col-span-2 md:col-span-1">
          <input
          type="email"
          maxLength={64}
          placeholder={t('booking_email_placeholder')}
          required
          className={inputStyle}
          onChange={(e) => {
            e.target.value = e.target.value.trim();
          }}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        />
        </FieldWrapper>

        <FieldWrapper label={t('booking_phone')} gridArea="col-span-2 md:col-span-1">
          <input
          type="tel"
          placeholder={t('booking_phone_placeholder')}
          required
          className={inputStyle}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
          }}
        />
        </FieldWrapper>

        <CustomSelect
          label={t('booking_party_size')}
          value={t(selectedPartySize)}
          options={partyOptions.map(key => t(key))}
          isOpen={openMenu === "party"}
          onToggle={() => toggleMenu("party")}
          onSelect={(key: string) => {
            setSelectedPartySize(key);
            setOpenMenu(null);
          }}
          variants={fadeUpVariants}
          className="col-span-1 md:col-span-1"
        />

        <CustomSelect
          label={t('booking_time')}
          value={selectedTime}
          options={timeOptions}
          isOpen={openMenu === "time"}
          onToggle={() => toggleMenu("time")}
          onSelect={(val: string) => {
            setSelectedTime(val);
            setOpenMenu(null);
          }}
          variants={fadeUpVariants}
          className="col-span-1 md:col-span-1"
        />

        <CustomSelect
          label={t('booking_date')}
          value={dateOptions.find(d => d.value === selectedDate)?.label || ""}
          options={dateOptions}
          isOpen={openMenu === "date"}
          onToggle={() => toggleMenu("date")}
          onSelect={(opt: any) => {
            setSelectedDate(opt.value);
            setOpenMenu(null);
          }}
          variants={fadeUpVariants}
          className="col-span-2 md:col-span-1"
        />

        <FieldWrapper label={t('booking_special_requests')} gridArea="col-span-2">
          <textarea placeholder={t('booking_special_requests_placeholder')} maxLength={200} rows={1} className={`${inputStyle} resize-none`} />
        </FieldWrapper>

        <motion.div variants={fadeUpVariants} className="col-span-2 flex justify-center pt-4">
          <button
            type="submit"
            className="group relative text-2xl cursor-pointer overflow-hidden border-2 border-golden px-12 py-4 tracking-[0.2em] text-white transition-all hover:bg-golden hover:text-black active:scale-95 w-full md:w-auto font-alt"
          >
            <span className="relative z-10 font-bold uppercase">{t('booking_submit')}</span>
            <div className="absolute inset-0 z-0 translate-y-full bg-golden transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </motion.div>
      </motion.form>
    </section>
  );
};

export default BookTable;