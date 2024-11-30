// import PublicPageLayout from "@/components/layouts/PublicPageLayout";
import AnnouncementAlert from '@/components/sections/AnnouncementAlert/AnnouncementAlert';
import Catalog from '@/components/sections/Catalog/Catalog';
import PublicPageLayout from '@/components/layouts/PublicPageLayout';

const CatalogPage = () => {
  return (
    <>
      <AnnouncementAlert
        month="october"
        percentageDiscount={90}
        className="fixed top-0 z-20"
      />
      <PublicPageLayout>
        <main className="container mx-auto px-6 flex-grow flex flex-col lg:flex-row mt-4">
          <div className="flex-grow">
            <Catalog />
          </div>
        </main>
      </PublicPageLayout>
    </>
  );
};

export default CatalogPage;
