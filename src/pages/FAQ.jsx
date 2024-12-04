import { useState } from "react";
import faqData from "../data/FAQ";

function FAQ() {
  const [openItem, setOpenItem] = useState(null); // Estado para controlar qué elemento está abierto

  const toggleAccordion = (index) => {
    setOpenItem(openItem === index ? null : index); // Alterna entre abrir/cerrar
  };

  return (
    <div id="accordion-flush" className="w-full p-4">
      {faqData.map((faq) => (
        <div key={faq.id}>
          <h2 id={`accordion-flush-heading-${faq.id}`}>
            <button
              type="button"
              className="flex justify-between w-full py-5 font-medium text-black border-b border-gray-200 gap-3"
              onClick={() => toggleAccordion(faq.id)}
              aria-expanded={openItem === faq.id}
              aria-controls={`accordion-flush-body-${faq.id}`}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform ${openItem === faq.id ? "rotate-180" : ""
                  }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-flush-body-${faq.id}`}
            className={`${openItem === faq.id ? "block" : "hidden"} transition-all`}
            aria-labelledby={`accordion-flush-heading-${faq.id}`}
          >
            <div className="py-5 border-b border-gray-200">
              <p className="text-black">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
