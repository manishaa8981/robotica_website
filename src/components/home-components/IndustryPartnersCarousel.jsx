"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getIndustryPartnersPublicApi } from "../../axios/api";

export default function IndustryPartnersCarousel() {
  const [partners, setPartners] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await getIndustryPartnersPublicApi();
        if (res?.data?.success) {
          setPartners(res.data.result || []);
        }
      } catch (err) {
        console.error("Failed to fetch partners", err);
      }
    };
    fetchPartners();
  }, []);

  if (!partners || partners.length === 0) return null;

  // duplicate array for seamless loop
  const scrollingPartners = [...partners, ...partners];

  const handleLogoClick = (partner) => {
    // navigate to details page – adjust route if you prefer slugs
    router.push(`/industry-partners/${partner._id}`);
  };

  return (
    <section className="w-full p-10 bg-white">
      <div className="max-w-7xl mx-auto ">
        {/* Optional heading */}
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-primary-dark mb-8 leading-tight">
          Our Industry Partners
        </h3>

        <div className="relative overflow-hidden">
          <div className="partner-marquee-track">
            <div className="partner-marquee">
              {scrollingPartners.map((partner, idx) => (
                <button
                  key={`${partner._id}-${idx}`}
                  type="button"
                  onClick={() => handleLogoClick(partner)}
                  className="focus:outline-none group"
                >
                  <div className="h-12 flex items-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${partner.logo}`}
                      alt={partner.name}
                      className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
