import PublicPageLayout from '@/components/layouts/PublicPageLayout';
import FaqsComponent from '@/components/sections/Faqs/Faqs';
import { faqs } from '../utils/data';

function FaqsPage() {
  return (
    <PublicPageLayout>
      <div className="bg-white p-6">
        <FaqsComponent faqs={faqs} />
      </div>
    </PublicPageLayout>
  );
}

export default FaqsPage;
