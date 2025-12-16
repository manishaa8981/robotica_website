"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getFaqsApi } from "../../axios/api"; // This hits GET "/" from your FAQ routes

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await getFaqsApi();
        if (res.data.success) {
          setFaqs(res.data.result || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <main className="w-full text-primary-soft pb-20">
      {/* HERO */}
      <section className="text-center pt-10 pb-10 sm:pt-0 ">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight"
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-black mt-3 max-w-xl mx-auto"
        >
          Answers to the most common questions from our students and parents.
        </motion.p>
      </section>

      {/* FAQ LIST */}
      <section className="max-w-4xl mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading FAQs...</div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card rounded-xl shadow border "
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between text-left px-5 py-4"
                >
                  <div>
                    <span className="text-xs uppercase tracking-wider text-primary-dark">
                      {faq.category || "General"}
                    </span>

                    <h3 className="text-lg font-semibold text-navy mt-1">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`transition-transform text-primary-dark
 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Answer */}
                {open === i && (
                  <div className="px-5 pb-4 text-gray-700 text-sm whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
