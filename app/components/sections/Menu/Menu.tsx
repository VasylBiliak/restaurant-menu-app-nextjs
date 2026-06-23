"use client";

import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import MenuItem from '@/app/components/ui/Menuitem/MenuItem';
import { menuData } from '@/app/data/index';
import fetchMenuData from '@/app/lib/menuLoader';
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
    const { t, lang } = useTranslation();

    const context = useContext(MenuContext);
    if (!context) throw new Error("Menu must be used within a MenuProvider");

    const { state, dispatch } = context;
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const selectedItems = state.selectedItems;

    useEffect(() => {
        if (state.isSelectedOpen && !openCategories.selected) {
            setOpenCategories(prev => ({
                ...prev,
                selected: true
            }));
        }
    }, [state.isSelectedOpen, openCategories.selected]);

    const handleSelectItem = (title: string) => {
        dispatch({
            type: 'TOGGLE_ITEM',
            payload: title,
        });
    };

    

    const convertLocal = (local: any) => {
        const out: Record<string, any[]> = {};
        for (const [k, arr] of Object.entries(local)) {
            const key = k;
            out[key] = (arr as any[]).map(i => ({
                id: i.id ?? i.title,
                category: key,
                images: i.images || [],
                // store multilingual-like fields for consistency with remote
                name_en: i.title || '',
                desc_en: i.tags || '',
                price_en: i.price || '',
                // keep original fields for compatibility
                title: i.title,
                price: i.price,
                tags: i.tags,
            }));
        }
        return out;
    };

    const [data, setData] = React.useState<Record<string, any[]>>(() => convertLocal(menuData));
    const allDataItems = React.useMemo(() => Object.values(data).flat(), [data]);

    const menuCategories = React.useMemo(() => Object.entries(data).map(([key, items]) => ({
        category: key,
        displayName: key.replace(/([A-Z])/g, ' $1').trim(),
        items: items as any[],
    })), [data]);

    React.useEffect(() => {
        let mounted = true;
        fetchMenuData().then((remote) => {
            if (!mounted) return;
            // remote keys may be camelCased; try to map into readable category keys
            const converted: Record<string, any[]> = {};
            for (const [k, arr] of Object.entries(remote)) {
                // prefer original casing if present in local menu
                const localMatch = Object.keys(menuData).find(localK => localK.toLowerCase() === k.toLowerCase());
                const outKey = localMatch || k;
                converted[outKey] = (arr as any[]).map(item => ({
                    ...item,
                    // keep backward-compatible props
                    title: item['name_' + lang] || item.title || item.name_en || item.name || item.raw?.name || item.raw?.name_en || item.raw?.title || '',
                    price: (item['price_' + (lang === 'ua' ? 'ua' : 'en')] || item.price_en || item.price || item.raw?.price || ''),
                    tags: item['desc_' + lang] || item.desc_en || item.desc || item.raw?.desc || item.raw?.tags || item.raw?.description || ''
                }));
            }
            setData(prev => ({ ...prev, ...converted }));
        }).catch(() => {
            // fetchMenuData handles its own fallback; ensure state at least contains local
        });
        return () => { mounted = false; };
    }, [lang]);

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

                                    return (
                                        <MenuItem
                                            key={item.id || item.title}
                                            title={item.title}
                                            price={item.price}
                                            tags={item.tags}
                                            selected
                                            onSelect={handleSelectItem}
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