import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-[700] text-[#111111] pr-4">{question}</h3>
        <ChevronDown
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={24}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: 'O que é essa organização?',
      answer: 'A organização é uma entidade sem fins lucrativos.'
    },
    {
      question: 'Como posso me inscrever para ser voluntário na organização?',
      answer: 'Você pode se inscrever para ser voluntário entrando em contato conosco por meio do nosso site ou comparecendo pessoalmente em nosso escritório. Teremos prazer em lhe fornecer mais informações sobre como se envolver em nossos projetos.'
    },
    {
      question: 'Como posso ajudar a organização?',
      answer: 'Existem várias maneiras pelas quais você pode ajudar a organização. Você pode fazer doações, se voluntariar para trabalhar em projetos específicos ou compartilhar informações sobre a organização com seus amigos e familiares.'
    },
    {
      question: 'O que é uma organização da sociedade civil?',
      answer: 'Uma organização da sociedade civil é uma entidade sem fins lucrativos que tem como objetivo promover o bem-estar social, cultural, político ou econômico da comunidade.'
    },
    {
      question: 'Como posso me envolver com a organização?',
      answer: 'Você pode se envolver com a organização de várias maneiras, como voluntariado em nossos projetos, doando recursos educacionais e financeiros ou compartilhando informações sobre a organização com amigos e familiares.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-[800] text-[#111111] mb-4">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
