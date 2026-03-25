"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import images from "@/app/data/images";

const easeSmooth = [0.65, 0, 0.35, 1] as const;

const Footer = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer
      ref={ref}
      id="contact"
      className=" overflow-hidden relative z-10 flex flex-col items-center bg-black"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start mt-20 px-4 sm:px-6 lg:px-0">
        
        <motion.div
          className="flex-1 m-4 text-center w-full"
          initial={{ opacity: 0, x: -56 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.1 }}
        >
          <h2 className="font-base text-white tracking-wider capitalize text-3xl leading-snug mb-4 2xl:text-5xl">
            Contact Us
          </h2>

          <address className="not-italic space-y-1">
            <p className="font-alt text-white opacity-80">
              <a href="tel:+14165550198" className="hover:underline">
                +1 416-555-0198
              </a>
            </p>
            <p className="font-alt text-white opacity-80">
              <a href="mailto:contact@b.com" className="hover:underline">
                contact@b.com
              </a>
            </p>
            <p className="font-alt text-white opacity-80">
              159 King St, Toronto, ON M5V 1M1, Canada
            </p>
          </address>

          <div className="mt-6 rounded-lg overflow-hidden border border-golden/20 grayscale hover:grayscale-0 transition-all duration-500 shadow-lg w-full">
            <iframe
              title="Restaurant location on map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.123456789012!2d-79.3890!3d43.6470!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d123456789%3A0x123456789abcdef!2s159%20King%20St%20W%2C%20Toronto%2C%20ON%20M5V%201J5%2C%20Canada!5e0!3m2!1sen!2sca!4v1710000000000!5m2!1sen!2sca"
              className="w-full h-[250px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex-1 m-6 text-center w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.25 }}
        >
          <div className="w-40 md:w-52 2xl:w-64 mb-3 max-[350px]:w-4/5">
            <Image
              src={images.logo}
              alt="Biliakyn Dining restaurant logo"
              width={256}
              height={128}
              className="w-full h-auto"
              priority
            />
          </div>

          <p className="font-alt text-white opacity-80 italic max-w-md">
            "The secret of success is to treat every guest as if they were a member of your own family"
          </p>

          <div className="mt-3 flex justify-center items-center">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white m-2 text-2xl hover:text-golden transition-colors"
            >
              <FiFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white m-2 text-2xl hover:text-golden transition-colors"
            >
              <FiInstagram />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 m-4 text-center w-full"
          initial={{ opacity: 0, x: 56 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.1 }}
        >
          <h2 className="font-base text-white tracking-wider capitalize text-3xl leading-snug mb-4 2xl:text-5xl">
            Working Hours
          </h2>

          <div className="space-y-4">
            <div>
              <p className="font-alt text-white opacity-80">Monday – Friday</p>
              <p className="font-alt text-white opacity-80">08:00 am – 12:00 am</p>
            </div>
            <div>
              <p className="font-alt text-white opacity-80">Saturday – Sunday</p>
              <p className="font-alt text-white opacity-80">10:00 am – 12:00 am</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 mb-8 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: easeSmooth, delay: 0.5 }}
      >
        <p className="font-alt text-white opacity-60 text-sm">
          © {new Date().getFullYear()} Biliakyn Dining. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;