"use client";

import { useContext } from "react";
import MenuContext from "@/app/context/MenuContext";
import FullScreenGallery from "@/app/components/ui/FullScreenGallery/FullScreenGallery";

export default function GlobalGallery() {
    const { state, dispatch } = useContext(MenuContext);

    return (
        <FullScreenGallery
            isOpen={state.isGalleryOpen}
            images={state.galleryImages}
            onClose={() => dispatch({ type: "CLOSE_GALLERY" })}
        />
    );
}