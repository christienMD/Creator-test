import ProductDashboardLayout from "../components/sections/ProductDashboardLayout/ProductDashboardLayout";
import UploadForm from "@/components/sections/UploadForm/UploadForm";

function NewProduct() {
  return (
    <>
      <ProductDashboardLayout>
        <UploadForm />
      </ProductDashboardLayout>
    </>
  );
}

export default NewProduct;
