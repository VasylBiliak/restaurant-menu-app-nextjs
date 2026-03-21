"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuContext from "@/app/context/MenuContext";
import { scrollToSection } from "@/app/utils/scrollToSection";
import { scaleInVariants } from "@/app/utils/animations";

const FloatingMenuButton = () => {
    const context = useContext(MenuContext);
    if (!context) return null;

    const { state, dispatch } = context;
    const hasItems = state.selectedItems.length > 0;

    const handleClick = () => {
        dispatch({ type: 'SET_SELECTED_OPEN', payload: true });
        setTimeout(() => {
            scrollToSection("selected-menu");
        }, 150);
    };

    return (
        <AnimatePresence>
            {hasItems && (
                <motion.button
                    variants={scaleInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    
                    onClick={handleClick}        
                    className="fixed left-5 bottom-8 z-1000 px-5 py-2 bg-golden text-black font-alt font-bold rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center gap-2"
                >
                    <span className="uppercase tracking-wider text-sm font-alt" >Selected</span>
                    <span className="bg-black text-golden w-8 h-8 rounded-full flex items-center justify-center font-base text-lg">
                        {state.selectedItems.length}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingMenuButton;