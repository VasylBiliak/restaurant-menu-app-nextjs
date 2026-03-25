"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuContext from "@/app/context/MenuContext";
import { scrollToSection } from "@/app/utils/scrollToSection";
import { scaleInVariants } from "@/app/utils/animations";

const FloatingMenuButton = () => {
    const context = useContext(MenuContext);

    // Якщо контексту немає або товарів 0 — нічого не рендеримо
    if (!context) return null;

    const { state, dispatch } = context;
    const hasItems = state.selectedItems.length > 0;

    const handleClick = () => {
        dispatch({ type: 'SET_SELECTED_OPEN', payload: true });
        
        // Невелика затримка, щоб секція встигла розгорнутися перед скролом
        setTimeout(() => {
            scrollToSection("selected-menu");
        }, 150);
    };

    return (
        <AnimatePresence>
            {hasItems && (
                <motion.button
                    // Використовуємо анімацію появи/зникнення
                    variants={scaleInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    
                    onClick={handleClick}
                    // Tailwind замість CSS
                    className="fixed left-5 bottom-8 z-100 px-6 py-4 bg-golden text-black font-alt font-bold rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center gap-2"
                >
                    <span className="uppercase tracking-wider text-sm">Selected</span>
                    <span className="bg-black text-golden w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {state.selectedItems.length}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingMenuButton;