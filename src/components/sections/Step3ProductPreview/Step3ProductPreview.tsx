import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useApi } from "@/utils/fetcher";
// import { useAuth } from "@/context/AuthContext";
import type { UploadFormValues } from "@/schemas/UploadSchema";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  formData: UploadFormValues;
  onBack: () => void;
  onSubmissionSuccess: () => void;
}

const Step3ProductPreview = ({
  formData,
  onBack,
  onSubmissionSuccess,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  //   const { token } = useAuth();
  const { API } = useApi();

  // const handleSubmit = async () => {
  //   const token = localStorage.getItem("auth_token");
  //   if (!token) return;

  //   setIsSubmitting(true);
  //   setError(null);

  //   try {
  //     const submitData = new FormData();

  //     // Handle regular form fields (non-product_items)
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (key !== "product_items") {
  //         if (value instanceof File) {
  //           submitData.append(key, value);
  //         } else if (value !== null && value !== undefined) {
  //           submitData.append(key, value.toString());
  //         }
  //       }
  //     });

  //     // Handle product items array with proper array structure
  //     formData.product_items.forEach((item, index) => {
  //       // Handle media file as array
  //       if (item.media instanceof File) {
  //         submitData.append(`product_items[${index}][media][]`, item.media);
  //       }

  //       // Handle all other item properties
  //       Object.entries(item).forEach(([itemKey, itemValue]) => {
  //         if (itemKey !== "media") {
  //           if (itemKey === "is_downloadable") {
  //             // Safe boolean conversion with type checking
  //             submitData.append(
  //               `product_items[${index}][${itemKey}]`,
  //               typeof itemValue === "boolean" ? (itemValue ? "1" : "0") : "0"
  //             );
  //           } else {
  //             submitData.append(
  //               `product_items[${index}][${itemKey}]`,
  //               itemValue?.toString() ?? ""
  //             );
  //           }
  //         }
  //       });
  //     });

  //     // Optional: Debug logging
  //     for (const pair of submitData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }

  //     const response = await API.postProduct(submitData, token);

  //     if (response[2]) {
  //       setSuccess(true);
  //       onSubmissionSuccess();
  //     } else {
  //       throw new Error(response[1]?.message || "Failed to create product");
  //     }
  //   } catch (error) {
  //     setError(
  //       error instanceof Error ? error.message : "Failed to create product"
  //     );
  //     console.error("Submission error:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };



const handleSubmit = async () => {
  const token = localStorage.getItem("auth_token");
  if (!token) return;

  setIsSubmitting(true);
  setError(null);

  try {
    const submitData = new FormData();

    // Add main product fields
    submitData.append("title", formData.title);
    submitData.append("description", formData.description || "");
    submitData.append("price", formData.price);
    submitData.append("category_id", formData.category_id);

    // Add required files
    if (formData.banner instanceof File) {
      submitData.append("banner", formData.banner);
    }
    if (formData.thumbnail instanceof File) {
      submitData.append("thumbnail", formData.thumbnail);
    }

    // Only add preview video for video/course products
    if (
      (formData.category_id === "1" || formData.category_id === "2") &&
      formData.preview_video instanceof File
    ) {
      submitData.append("preview_video", formData.preview_video);
    }

    // Add product items
    formData.product_items.forEach((item, index) => {
      // Handle media file
      if (item.media instanceof File) {
        submitData.append(`product_items[${index}][media][]`, item.media);
      }

      // Add other item fields
      submitData.append(`product_items[${index}][title]`, item.title);
      submitData.append(
        `product_items[${index}][category_id]`,
        item.category_id
      );

      if (item.description) {
        submitData.append(
          `product_items[${index}][description]`,
          item.description
        );
      }

      // Convert boolean to 1/0
      submitData.append(
        `product_items[${index}][is_downloadable]`,
        item.is_downloadable ? "1" : "0"
      );

      submitData.append(
        `product_items[${index}][order]`,
        item.order.toString()
      );
    });

    // Debug log the FormData entries
    console.log("Submitting form data:");
    for (const pair of submitData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await API.postProduct(submitData, token);

    if (response[2]) {
      setSuccess(true);
      onSubmissionSuccess();
    } else {
      throw new Error(response[1]?.message || "Failed to create product");
    }
  } catch (error) {
    setError(
      error instanceof Error ? error.message : "Failed to create product"
    );
    console.error("Submission error:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
    }).format(Number(price));
  };

const renderMediaPreview = (
  file: File | null,
  type: "image" | "video" | "other"
) => {
  if (!file || !file.type) return null;

  try {
    // For images
    if (type === "image") {
      return (
        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    // For videos
    if (type === "video") {
      return (
        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    // For other file types
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <i className="fas fa-file text-xl" />
        <span>{file.name}</span>
        <span className="text-sm">
          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
        </span>
      </div>
    );
  } catch (error) {
    console.error("Error rendering media preview:", error);
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <span>Unable to preview file</span>
      </div>
    );
  }
};

  // const renderMediaPreview = (
  //   file: File | null,
  //   type: "image" | "video" | "other"
  // ) => {
  //   if (!file) return null;

  //   if (type === "image" && file.type && file?.type?.startsWith("image/")) {
  //     console.log("file typrrrrrrrrrrrrrrr: ", typeof file.type);
  //     return (
  //       <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
  //         <img
  //           src={URL.createObjectURL(file)}
  //           alt="Preview"
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //     );
  //   }

  //   if (type === "video" && file.type.startsWith("video/")) {
  //     return (
  //       <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
  //         <video
  //           src={URL.createObjectURL(file)}
  //           controls
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="flex items-center space-x-2 text-gray-600">
  //       <i className="fas fa-file text-xl" />
  //       <span>{file.name}</span>
  //       <span className="text-sm">
  //         ({(file.size / (1024 * 1024)).toFixed(2)} MB)
  //       </span>
  //     </div>
  //   );
  // };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Status Alerts */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Product created successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Main Preview Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Media Preview */}
        <div className="lg:col-span-8 space-y-8">
          {/* Banner and Thumbnail Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold border-b pb-4">
              Media Preview
            </h3>

            {formData.banner && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Banner Image
                </label>
                {renderMediaPreview(formData.banner, "image")}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.thumbnail && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  {renderMediaPreview(formData.thumbnail, "image")}
                </div>
              )}

              {formData.preview_video && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Preview Video
                  </label>
                  {renderMediaPreview(formData.preview_video, "video")}
                </div>
              )}
            </div>
          </div>
          {/* Product Items Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold border-b pb-4">
              Product Items
            </h3>

            <div className="space-y-6">
              {formData.product_items.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 space-y-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900">
                      Item {index + 1}: {item.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      Order: {item.order}
                    </span>
                  </div>

                  {item.description && (
                    <div className="prose max-w-none text-gray-600">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">
                        Downloadable:
                      </span>
                      <span
                        className={`text-sm ${
                          item.is_downloadable
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {item.is_downloadable ? "Yes" : "No"}
                      </span>
                    </div>

                    {/* {item.media && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">
                          Media:
                        </span>
                        {renderMediaPreview(
                          item.media,
                          item.media.type.startsWith("video/")
                            ? "video"
                            : item.media.type.startsWith("image/")
                            ? "image"
                            : "other"
                        )}
                      </div>
                    )} */}
                    {item.media && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500">
                          Media:
                        </span>
                        {renderMediaPreview(
                          item.media,
                          item.media?.type?.startsWith("video/")
                            ? "video"
                            : item.media?.type?.startsWith("image/")
                            ? "image"
                            : "other"
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 sticky top-6">
            <h3 className="text-lg font-semibold border-b pb-4">
              Product Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <p className="mt-1 text-gray-900">{formData.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatPrice(formData.price)}
                </p>
              </div>

              {formData.description && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1 prose max-w-none text-gray-600">
                    <div
                      dangerouslySetInnerHTML={{ __html: formData.description }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 h-14"
                >
                  <ArrowLeft size={16} />
                  Back to Edit
                </Button>

                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 hover:opacity-85 transition-colors text-white bg-creator-bg-500 hover:bg-creator-bg-500 h-14"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating Product...
                    </div>
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3ProductPreview;
