import React, { useState } from "react";

// Example FAQ data
const faqs = [
  {
    question: "What Is Petric And How Does It Help Pet Parents?",
    answer: "Petric is a Gurgaon-based pet care platform that simplifies your pet parenting journey. We help you discover experienced vets, book diagnostics and vaccinations, order pet food and essentials, and even schedule grooming services — all from one app.",
  },
  {
    question: "What should I do in case of emergencies?",
    answer:
      "In case of emergency, you can directly call us on (+91) 8295756962 or via SOS button on Petric App and website. We will handle the rest - immediate appointments, treatment and care.",
  },
  {
    question: "How often should my pet get vaccinated?",
    answer: "Puppies and kittens require a series of vaccinations, while adult pets need annual boosters. Due vaccinations can be easily tracked with pet dashboard on petric app. We provide recurring reminders to avoid delays.",
  },
  {
    question: "Do I need to pay for post-treatment follow-ups?",
    answer: "No. With Petric, you get 5 days of free follow-ups after both tele-consultations and clinic visits. If needed, you can also avail free in-clinic follow-ups after a tele-consultation — ensuring your pet receives complete and proper care.",
  },
  {
    question: "What kind of products can I get delivered through Petric?",
    answer: "We offer a wide range of Dry food, Wet food, Treats, Grooming products, Supplements and other essentials from trusted brands — all available with 59 mins home delivery.",
  },
  {
    question: "Can I order products and schedule appointments via WhatsApp or Call directly ?",
    answer: "Yes, you can directly Call or WhatsApp us on (+91) 8295756962 to book vet appointments, order product and much more!",
  },
  {
    question: "Are there any hidden charges to avail 59 mins delivery?",
    answer: "No, we provide free delivery, with no add-on or hidden charges on all products available on Petric App.",
  },
  {
    question: "Which Locations Does Petric Currently Serve?",
    answer: "We are currently operational in Gurgaon/Gurugram, covering all major sectors with both at-home and in-clinic service options.							",
  },
  {
    question: "How can I find nearest clinic to my home?",
    answer: "You can find all trusted clinics near your location on Petric App. You can also check availability, book an appointment, and get directions — all in a few taps.",
  },
  {
    question: "Do Petric provide home cooked food also?",
    answer: "Yes, you can directly call us to share your pet food needs and preferences, to get freshly prepared home cooked food delivered daily at your doorstep.",
  },
];

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState(0); // 2nd question open by default

  return (
    <div className="mx-auto my-12 p-4 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#FFFBF0] rounded-lg p-2"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-4 focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="flex items-center gap-2 text-left font-medium text-black text-lg">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-black font-bold text-base mr-2">
                  ?
                </span>
                {faq.question}
              </span>
              <span className="ml-4">
                <svg
                  className={`w-6 h-6 transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {openIndex === idx && faq.answer && (
              <div className="px-4 pb-4 text-black text-lg">
                <div className="my-4 border-b border-[#cfcfcf]" />
                <div className="px-14 text-left font-normal text-lg">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}