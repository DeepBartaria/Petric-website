import React, { useState, useEffect } from 'react';
import whatsappIcon from '../assets/contact/whatsapp.png';

const WHATSAPP_NUMBER = '918295756962'; // Replace with your number

export default function WhatsappStickyButton() {
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed z-50 bottom-6 right-6 group">
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition"
                />
            </a>
            {/* <div className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-lg border border-gray-200 transition-opacity duration-300 whitespace-nowrap ${showTooltip ? 'opacity-100' : 'opacity-0'}`}>
                Order Now
            </div> */}
        </div>
    );
}