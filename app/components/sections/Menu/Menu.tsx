"use client";

import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import MenuItem from '@/app/components/ui/Menuitem/MenuItem';
import { menuData } from '@/app/data/index';
import SectionTitle from '@/app/components/sectionTitle/SectionTitle';
import MenuContext from '@/app/context/MenuContext';
import { useTranslation } from '@/app/hooks/useTranslation';

import {
    fadeDownVariants,
    fadeUpVariants,
} from '@/app/utils/animations';

const Menu = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const { t } = useTranslation();

    const context = useContext(MenuContext);
    if (!context) throw new Error("Menu must be used within a MenuProvider");

    const { state, dispatch } = context;
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [activeDeleteTitle, setActiveDeleteTitle] = useState<string | null>(null);
    const selectedAreaRef = useRef<HTMLDivElement | null>(null);

    const selectedItems = state.selectedItems;

    useEffect(() => {
        if (state.isSelectedOpen && !openCategories.selected) {
            setOpenCategories(prev => ({
                ...prev,
                selected: true
            }));
        }
    }, [state.isSelectedOpen, openCategories.selected]);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!selectedAreaRef.current) return;
            if (event.target instanceof Node && !selectedAreaRef.current.contains(event.target)) {
                setActiveDeleteTitle(null);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, []);

    const handleSelectItem = (title: string) => {
        dispatch({
            type: 'TOGGLE_ITEM',
            payload: title,
        });
    };

    const handleSelectedItemClick = (title: string) => {
        setActiveDeleteTitle(title);
    };

    const handleRemoveSelectedItem = (title: string) => {
        setActiveDeleteTitle(null);
        dispatch({
            type: 'TOGGLE_ITEM',
            payload: title,
        });
    };

    const data = (menuData as any).menuData || menuData;
    const allDataItems = Object.values(data).flat();

    const menuCategories = Object.entries(data).map(([key, items]) => ({
        category: key,
        displayName: key.replace(/([A-Z])/g, ' $1').trim(),
        items: items as any[],
    }));

    const toggleCategory = (category: string) => {
        const isNowOpen = !openCategories[category];

        setOpenCategories(prev => ({
            ...prev,
            [category]: isNowOpen
        }));

        if (category === 'selected') {
            dispatch({ type: 'SET_SELECTED_OPEN', payload: isNowOpen });
        }
    };
    return (
        // === Menu Section ===
        <section ref={ref} className=" p-0!" id="menu">
            <div className="flex flex-col  gap-4 pt-[8rem]">
                {/* === Title === */}
                <SectionTitle title={t('menu_title')} isInView={isInView} />
                {/* === Wrapper === */}
                <div className="w-full my-2 flex flex-col items-center ">
                    {menuCategories.map(({ category, displayName, items }) => {
                        const isOpen = openCategories[category] || false;
                        return (
                            // === Category ===
                            <motion.div
                                key={category}
                                className="w-full max-w-3xl flex flex-col gap-4"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={fadeUpVariants}
                            >
                                <h3
                                    className="text-white font-bold text-3xl leading-tight tracking-wide cursor-pointer text-center hover:text-golden"
                                    onClick={() => toggleCategory(category)}
                                >
                                    {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
                                </h3>
                                {/* === Items === */}
                                <div className={`flex flex-col w-full overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'max-h-9999px scale-y-100 py-2 px-3' : 'max-h-0 scale-y-0'
                                    }`}
                                >
                                    {items.map((item: any) => (
                                        <MenuItem
                                            key={item.id || item.title}
                                            title={item.title}
                                            price={item.price}
                                            tags={item.tags}
                                            selected={selectedItems.includes(item.title)}
                                            onSelect={handleSelectItem}
                                            images={item.images}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                    {/* === Selected Items === */}
                    <motion.div
                        id="selected-menu"
                        className="w-full max-w-3xl flex flex-col gap-4 mt-4 mb-16"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                    >
                    <h3
                        className={`font-bold text-3xl leading-tight tracking-wide cursor-pointer text-center transition-colors
                            ${
                                selectedItems.length > 0
                                    ? "text-golden underline underline-offset-8 hover:text-white"
                                    : "text-white hover:text-golden"
                            }`}
                        onClick={() => toggleCategory('selected')}
                    >
                        {t('menu_selected')} {selectedItems.length > 0 && `${selectedItems.length}`}
                    </h3>
                        <div
                            ref={selectedAreaRef}
                            className={`flex flex-col w-full overflow-hidden transition-all duration-300 origin-top ${openCategories.selected ? 'max-h-9999px scale-y-100 py-2 px-3' : 'max-h-0 scale-y-0'
                                }`}
                        >
                            {selectedItems.length === 0 ? (
                                <p className="text-white text-center opacity-50">
                                    {t('menu_no_items_selected')}
                                </p>
                            ) : (
                                selectedItems.map((title: string) => {
                                    const item = allDataItems.find((i: any) => i.title === title) as any;
                                    if (!item) return null;

                                    const isDeleteActive = activeDeleteTitle === title;
                                    return (
                                        <MenuItem
                                            key={item.id || item.title}
                                            title={item.title}
                                            price={item.price}
                                            tags={item.tags}
                                            selected
                                            images={item.images}
                                            onSelect={() => handleSelectedItemClick(title)}
                                            deleteModeActive={isDeleteActive}
                                            onDeleteConfirm={() => handleRemoveSelectedItem(title)}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Menu;