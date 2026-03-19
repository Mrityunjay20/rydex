"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState("911234567890");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (response.ok) {
          const data = await response.json();
          // Remove spaces and + from phone number for WhatsApp URL
          const cleanNumber = (data.whatsapp || data.phone || "911234567890").replace(/[\s+]/g, "");
          setWhatsappNumber(cleanNumber);
        }
      } catch (error) {
        console.error("Error fetching WhatsApp number:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hi%20RydeX!%20I%20need%20help%20with%20a%20car%20rental.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
