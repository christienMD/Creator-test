import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadFormValues } from "@/schemas/UploadSchema";
import Step1ProductUploadForm from "../Step1ProductUploadForm/Step1ProductUploadForm";
import Step3ProductPreview from "../Step3ProductPreview/Step3ProductPreview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Step2ProductItems from "../Step2ProductItems/Step2ProductItems";
import Step4ProductUploadSuccess from "../Step4ProductUploadSuccess/Step4ProductUploadSuccess";

type FileOrNull = File | null;

interface InitialFormData {
  title: string;
  price: string;
  category_id: string;
  description: string;
  banner?: FileOrNull;
  thumbnail?: FileOrNull;
  preview_video?: FileOrNull;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product_items: any[];
}

const ProductUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InitialFormData>(
    {} as InitialFormData
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  // Check authentication
  useEffect(() => {
    if (!token) {
      setAuthError("Please log in to create a product");
      const timer = setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: { returnUrl: "/create-product" },
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  //   const handleStep1Complete = (data: UploadFormValues) => {
  //     setFormData(data);
  //     setCurrentStep(2);

  //     // Store form data without File objects
  //     const storageData = {
  //       ...data,
  //       banner: data.banner ? {} : null,
  //       thumbnail: data.thumbnail ? {} : null,
  //       preview_video: data.preview_video ? {} : null,
  //       product_items: data.product_items.map((item) => ({
  //         ...item,
  //         media: item.media ? {} : null,
  //       })),
  //     };

  //     localStorage.setItem("product_form_draft", JSON.stringify(storageData));
  //   };

  const handleStep1Complete = (data: UploadFormValues) => {
    console.log("Step 1 Complete Data:", data);
    setFormData(data);
    setCurrentStep(2);
    localStorage.setItem("product_form_draft", JSON.stringify(data));
  };

  const handleStep2Complete = (data: UploadFormValues) => {
    setFormData(data);
    setCurrentStep(3);
    localStorage.setItem("product_form_draft", JSON.stringify(data));
  };

  const handleGoBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("product_form_draft");
    if (savedDraft && formData === null) {
      // Only load if formData is not set
      try {
        const parsedData = JSON.parse(savedDraft);
        // Keep the current formData if it exists, otherwise use parsed data
        setFormData((currentData) => currentData || parsedData);
      } catch (error) {
        console.error("Error loading saved draft:", error);
        localStorage.removeItem("product_form_draft");
      }
    }
  }, [formData]);

  const handleSubmissionSuccess = () => {
    localStorage.removeItem("product_form_draft");
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <Step4ProductUploadSuccess productTitle={formData?.title || ""} />;
  }

  if (!token && authError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="relative">
          <div className="overflow-hidden h-2 flex rounded bg-gray-200">
            <div
              className="transition-all duration-500 bg-creator-bg-500"
              style={{
                width:
                  currentStep === 1
                    ? "33%"
                    : currentStep === 2
                    ? "66%"
                    : "100%",
              }}
            />
          </div>

          <div className="absolute top-0 left-0 -mt-2 w-full flex justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  currentStep >= 1
                    ? "bg-creator-bg-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="mt-2 text-sm text-gray-600">Details</span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  currentStep >= 2
                    ? "bg-creator-bg-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="mt-2 text-sm text-gray-600">Items</span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  currentStep === 3
                    ? "bg-creator-bg-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="mt-2 text-sm text-gray-600">Preview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Content */}
      <div className="max-w-7xl mx-auto px-4">
        {currentStep === 1 ? (
          <Step1ProductUploadForm
            onComplete={handleStep1Complete}
            initialData={formData}
          />
        ) : currentStep === 2 ? (
          <Step2ProductItems
            onComplete={handleStep2Complete}
            onBack={handleGoBack}
            initialData={formData}
          />
        ) : (
          <Step3ProductPreview
            formData={formData!}
            onBack={handleGoBack}
            onSubmissionSuccess={handleSubmissionSuccess}
          />
        )}
      </div>

      {/* Draft save indication */}
      {currentStep !== 3 && formData && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg shadow-sm text-sm">
            Draft saved
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
