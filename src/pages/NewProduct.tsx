import UploadForm from "@/components/sections/UploadForm/UploadForm";
import ProductDashboardLayout from "../components/sections/ProductDashboardLayout/ProductDashboardLayout";

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
