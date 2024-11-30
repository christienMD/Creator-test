import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqsInterface {
  question: string;
  answer: string;
}

interface FaqsInterfaceProps {
  faqs: FaqsInterface[];
}

function FaqsComponent({ faqs }: FaqsInterfaceProps) {
  return (
    <div className="container mx-auto p-10 py-8">
      <h2 className="heading">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            className="m-4  border border-creator-bg-200 px-4 rounded-md"
            value={`item-${index}`}
          >
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FaqsComponent;
