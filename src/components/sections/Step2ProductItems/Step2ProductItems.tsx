import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Upload,
  File,
  Plus,
  Trash2,
  Loader2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/sections/TextEditor/TextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UploadFormSchema,
  type UploadFormValues,
  type FilePreview,
} from "@/schemas/UploadSchema";
import { MAX_FILE_SIZE } from "@/schemas/UploadSchema";
// import { FileTypes, MAX_FILE_SIZE } from "@/schemas/UploadSchema";

interface Props {
  onComplete: (data: UploadFormValues) => void;
  onBack: () => void;
  initialData: UploadFormValues | null;
}

interface CategoryConstraints {
  [key: string]: {
    allowedTypes: string[];
    acceptTypes: string;
  };
}

const CATEGORY_CONSTRAINTS: CategoryConstraints = {
  "1": {
    // Course category - allows all types
    allowedTypes: ["image", "video", "audio", "pdf", "zip"],
    acceptTypes: "*/*",
  },
  "2": {
    // Video category
    allowedTypes: ["video"],
    acceptTypes: "video/mp4,video/quicktime,video/x-msvideo",
  },
  "3": {
    // PDF category
    allowedTypes: ["pdf"],
    acceptTypes: "application/pdf",
  },
  "4": {
    // ZIP category
    allowedTypes: ["zip"],
    acceptTypes: "application/zip,application/x-zip-compressed",
  },
  "6": {
    // Audio category
    allowedTypes: ["audio"],
    acceptTypes: "audio/mpeg,audio/wav",
  },
  "7": {
    // Image category
    allowedTypes: ["image"],
    acceptTypes: "image/jpeg,image/png",
  },
};

// const CATEGORY_CONSTRAINTS: CategoryConstraints = {
//   "1": {
//     // Course category - allows all types
//     allowedTypes: ["image", "video", "audio", "pdf", "zip"],
//     acceptTypes: "*/*",
//   },
//   "2": {
//     // Video category
//     allowedTypes: ["video"],
//     acceptTypes: FileTypes.video,
//   },
//   "3": {
//     // PDF category
//     allowedTypes: ["pdf"],
//     acceptTypes: "application/pdf",
//   },
//   "4": {
//     // ZIP category
//     allowedTypes: ["zip"],
//     acceptTypes: FileTypes.zip,
//   },
//   "6": {
//     // Audio category
//     allowedTypes: ["audio"],
//     acceptTypes: FileTypes.audio,
//   },
//   "7": {
//     // Image category
//     allowedTypes: ["image"],
//     acceptTypes: FileTypes.image,
//   },
// };

const Step2ProductItems = ({ onComplete, onBack, initialData }: Props) => {
  const { categories } = useCategories();
  const [mainFilePreview, setMainFilePreview] = useState<
    Record<number, FilePreview | null>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAccordionItem, setActiveAccordionItem] = useState<
    string | undefined
  >("0");
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(UploadFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: "",
      category_id: "",
      product_items: [
        {
          title: "",
          description: "",
          is_downloadable: true,
          order: 0,
          category_id: "",
          media: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "product_items",
  });

  const selectedMainCategory = form.watch("category_id");

//   const validateFile = (file: File, type: string): boolean => {
//     if (file.size > MAX_FILE_SIZE) {
//       setFormError(
//         `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
//       );
//       return false;
//     }

//     // Add PDF-specific type checking
//     if (type === "pdf") {
//       const isPDF = file.type === "application/pdf";
//       if (!isPDF) {
//         setFormError("Only PDF files are allowed for this category");
//         return false;
//       }
//       return true;
//     }

//     const allowedTypes = FileTypes[type as keyof typeof FileTypes];
//     if (!allowedTypes) return true;

//     const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
//     const isValidType = allowedTypes.split(",").includes(fileExtension);

//     if (!isValidType) {
//       setFormError(
//         `Invalid file type. For ${type}, allowed types are: ${allowedTypes}`
//       );
//       return false;
//     }

//     return true;
//   };

  //   const handleFileUpload = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     itemIndex: number
  //   ) => {
  //     const file = e.target.files?.[0];
  //     setFormError(null);

  //     if (!file) return;

  //     if (file.size > MAX_FILE_SIZE) {
  //       setFormError(
  //         `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
  //       );
  //       return;
  //     }

  //     // Get category and constraints
  //     let categoryToUse = selectedMainCategory;
  //     let categoryName: string | undefined;

  //     if (selectedMainCategory === "1") {
  //       // For courses, use the item's category
  //       categoryToUse = form.getValues(`product_items.${itemIndex}.category_id`);
  //       if (!categoryToUse) {
  //         setFormError("Please select an item category first");
  //         return;
  //       }
  //       categoryName = categories.find(
  //         (cat) => cat.id.toString() === categoryToUse
  //       )?.name;
  //     } else {
  //       // For other products, use the main category
  //       categoryName = categories.find(
  //         (cat) => cat.id.toString() === selectedMainCategory
  //       )?.name;
  //     }

  //     if (!categoryName) {
  //       setFormError("Invalid category");
  //       return;
  //     }

  //     const constraints = CATEGORY_CONSTRAINTS[categoryToUse];
  //     if (!constraints) {
  //       setFormError("Invalid category configuration");
  //       return;
  //     }

  //     // Validate file type
  //     const fileType = categoryName.toLowerCase();
  //     if (!validateFile(file, fileType)) {
  //       return;
  //     }

  //     const filePreview: FilePreview = {
  //       url: URL.createObjectURL(file),
  //       file: file,
  //     };

  //     setMainFilePreview((prev) => ({
  //       ...prev,
  //       [itemIndex]: filePreview,
  //     }));
  //     form.setValue(`product_items.${itemIndex}.media`, file);
  //   };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => {
    const file = e.target.files?.[0];
    setFormError(null);

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setFormError(
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
      return;
    }

    // Get the main category constraints
    const mainCategoryConstraints = CATEGORY_CONSTRAINTS[selectedMainCategory];
    if (!mainCategoryConstraints) {
      setFormError("Invalid category configuration");
      return;
    }

    // If it's not a course, enforce the main category file type
    if (selectedMainCategory !== "1") {
      const { acceptTypes } = mainCategoryConstraints;

      if (!acceptTypes.split(",").some((type) => file.type.startsWith(type))) {
        setFormError(
          `Only ${acceptTypes
            .split(",")
            .map((type) => type.toUpperCase())
            .join(", ")} files are allowed for this category`
        );
        return;
      }
    } else {
      // For courses, check the item's category
      const itemCategory = form.getValues(
        `product_items.${itemIndex}.category_id`
      );
      if (!itemCategory) {
        setFormError("Please select an item category first");
        return;
      }

      const itemConstraints = CATEGORY_CONSTRAINTS[itemCategory];
      if (!itemConstraints) {
        setFormError("Invalid item category configuration");
        return;
      }

      const { acceptTypes } = itemConstraints;

      if (!acceptTypes.split(",").some((type) => file.type.startsWith(type))) {
        setFormError(
          `Only ${acceptTypes
            .split(",")
            .map((type) => type.toUpperCase())
            .join(", ")} files are allowed for this item category`
        );
        return;
      }
    }

    // If validation passes, create preview and set value
    const filePreview: FilePreview = {
      url: URL.createObjectURL(file),
      file: file,
    };

    setMainFilePreview((prev) => ({
      ...prev,
      [itemIndex]: filePreview,
    }));
    form.setValue(`product_items.${itemIndex}.media`, file);
  };
  
//   was working at 10:38
//   const handleFileUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     itemIndex: number
//   ) => {
//     const file = e.target.files?.[0];
//     setFormError(null);

//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       setFormError(
//         `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
//       );
//       return;
//     }

//     // Get the main category constraints
//     const mainCategoryConstraints = CATEGORY_CONSTRAINTS[selectedMainCategory];
//     if (!mainCategoryConstraints) {
//       setFormError("Invalid category configuration");
//       return;
//     }

//     // If it's not a course, enforce the main category file type
//     if (selectedMainCategory !== "1") {
//       const { acceptTypes } = mainCategoryConstraints;

//       if (!file.type.startsWith(acceptTypes.split(",")[0])) {
//         setFormError(
//           `Only ${acceptTypes
//             .split(",")
//             .map((type) => type.toUpperCase())
//             .join(", ")} files are allowed for this category`
//         );
//         return;
//       }
//     } else {
//       // For courses, check the item's category
//       const itemCategory = form.getValues(
//         `product_items.${itemIndex}.category_id`
//       );
//       if (!itemCategory) {
//         setFormError("Please select an item category first");
//         return;
//       }

//       const itemConstraints = CATEGORY_CONSTRAINTS[itemCategory];
//       if (!itemConstraints) {
//         setFormError("Invalid item category configuration");
//         return;
//       }

//       const { acceptTypes } = itemConstraints;

//       if (!file.type.startsWith(acceptTypes.split(",")[0])) {
//         setFormError(
//           `Only ${acceptTypes
//             .split(",")
//             .map((type) => type.toUpperCase())
//             .join(", ")} files are allowed for this item category`
//         );
//         return;
//       }
//     }

//     // If validation passes, create preview and set value
//     const filePreview: FilePreview = {
//       url: URL.createObjectURL(file),
//       file: file,
//     };

//     setMainFilePreview((prev) => ({
//       ...prev,
//       [itemIndex]: filePreview,
//     }));
//     form.setValue(`product_items.${itemIndex}.media`, file);
//   };

//   const handleFileUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     itemIndex: number
//   ) => {
//     const file = e.target.files?.[0];
//     setFormError(null);

//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       setFormError(
//         `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
//       );
//       return;
//     }

//     // Get the main category constraints
//     const mainCategoryConstraints = CATEGORY_CONSTRAINTS[selectedMainCategory];
//     if (!mainCategoryConstraints) {
//       setFormError("Invalid category configuration");
//       return;
//     }

//     // If it's not a course, enforce the main category file type
//     if (selectedMainCategory !== "1") {
//       const { allowedTypes } = mainCategoryConstraints;
//       const fileType = file.type.split("/")[0];

//       if (!allowedTypes.includes(fileType)) {
//         setFormError(
//           `Only ${allowedTypes.join(", ")} files are allowed for this category`
//         );
//         return;
//       }

//       // Additional specific type validation
//       if (!validateFile(file, allowedTypes[0])) {
//         return;
//       }
//     } else {
//       // For courses, check the item's category
//       const itemCategory = form.getValues(
//         `product_items.${itemIndex}.category_id`
//       );
//       if (!itemCategory) {
//         setFormError("Please select an item category first");
//         return;
//       }

//       const itemConstraints = CATEGORY_CONSTRAINTS[itemCategory];
//       if (!itemConstraints) {
//         setFormError("Invalid item category configuration");
//         return;
//       }

//       const { allowedTypes } = itemConstraints;
//       const fileType = file.type.split("/")[0];

//       if (!allowedTypes.includes(fileType)) {
//         setFormError(
//           `Only ${allowedTypes.join(
//             ", "
//           )} files are allowed for this item category`
//         );
//         return;
//       }

//       if (!validateFile(file, allowedTypes[0])) {
//         return;
//       }
//     }

//     // If validation passes, create preview and set value
//     const filePreview: FilePreview = {
//       url: URL.createObjectURL(file),
//       file: file,
//     };

//     setMainFilePreview((prev) => ({
//       ...prev,
//       [itemIndex]: filePreview,
//     }));
//     form.setValue(`product_items.${itemIndex}.media`, file);
//   };

  useEffect(() => {
    if (initialData) {
      // Set up product items previews
      initialData.product_items.forEach((item, index) => {
        const itemMedia = item.media;
        // Check if itemMedia is a File using type property
        if (itemMedia && "type" in itemMedia) {
          const filePreview: FilePreview = {
            url: URL.createObjectURL(itemMedia),
            file: itemMedia,
          };
          setMainFilePreview((prev) => ({
            ...prev,
            [index]: filePreview,
          }));
        }
      });

      form.reset(initialData);
    }

    return () => {
      // Cleanup URLs
      Object.values(mainFilePreview).forEach((preview) => {
        if (preview?.url) URL.revokeObjectURL(preview.url);
      });
    };
  }, [initialData, form]);

  const handleAddItem = () => {
    const newItemIndex = fields.length;
    append({
      title: "",
      description: "",
      is_downloadable: false,
      order: newItemIndex,
      category_id: selectedMainCategory === "1" ? "" : selectedMainCategory,
      media: null,
    });
    setActiveAccordionItem(newItemIndex.toString());
  };

  const removeFile = (itemIndex: number) => {
    const preview = mainFilePreview[itemIndex];
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setMainFilePreview((prev) => ({
      ...prev,
      [itemIndex]: null,
    }));
    form.setValue(`product_items.${itemIndex}.media`, null);
  };

  const handleDescriptionChange = (content: string, itemIndex: number) => {
    form.setValue(`product_items.${itemIndex}.description`, content);
  };

  const onSubmit = async (values: UploadFormValues) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (values.product_items.length === 0) {
        setFormError("At least one product item is required");
        return;
      }

      const hasEmptyTitle = values.product_items.some(
        (item) => !item.title.trim()
      );
      if (hasEmptyTitle) {
        setFormError("All product items must have a title");
        return;
      }

      const hasEmptyCategory = values.product_items.some(
        (item) => !item.category_id
      );
      if (hasEmptyCategory) {
        setFormError("All product items must have a category");
        return;
      }

      onComplete({
        ...initialData!,
        product_items: values.product_items,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
      setFormError("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-4xl mx-auto p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            {formError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Product Items
                </h2>
                <p className="text-sm text-gray-500">
                  Add and configure your product items below. At least one item
                  is required.
                </p>
              </div>
              <Button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-2 bg-creator-bg-500 hover:bg-creator-bg-500/90"
              >
                <Plus size={16} />
                Add Item
              </Button>
            </div>

            {fields.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <p className="text-gray-500">
                  No items added yet. Click "Add Item" to begin.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Accordion
                  type="single"
                  value={activeAccordionItem}
                  onValueChange={setActiveAccordionItem}
                  className="space-y-4"
                >
                  {fields.map((field, index) => (
                    <AccordionItem
                      key={field.id}
                      value={index.toString()}
                      className="border rounded-lg shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="font-medium">
                              {form.watch(`product_items.${index}.title`) ||
                                `Item ${index + 1}`}
                            </span>
                          </div>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (fields.length > 1) {
                                  remove(index);
                                  const newIndex =
                                    index === 0 ? "1" : (index - 1).toString();
                                  setActiveAccordionItem(newIndex);
                                }
                              }}
                              className="ml-2"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-6 pt-4">
                          {/* Item Category - Only for courses */}
                          {selectedMainCategory === "1" && (
                            <FormField
                              control={form.control}
                              name={`product_items.${index}.category_id`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Item Category{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.id.toString()}
                                        >
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {/* Item Title */}
                          <FormField
                            control={form.control}
                            name={`product_items.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Title <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Item Description */}
                          <FormField
                            control={form.control}
                            name={`product_items.${index}.description`}
                            render={() => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <TextEditor
                                    onContentChange={(content) =>
                                      handleDescriptionChange(content, index)
                                    }
                                    initialValue={form.getValues(
                                      `product_items.${index}.description`
                                    )}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Item Order */}
                          {/* <FormField
                            control={form.control}
                            name={`product_items.${index}.order`}
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    onChange={(e) =>
                                      onChange(
                                        parseInt(e.target.value, 10) || 0
                                      )
                                    }
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* Is Downloadable */}
                          <FormField
                            control={form.control}
                            name={`product_items.${index}.is_downloadable`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Downloadable</FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value === "true")
                                  }
                                  defaultValue={"true" }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    {/* <SelectItem value="false">No</SelectItem> */}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* File Upload */}
                          <div className="space-y-2">
                            <Label>
                              Upload File{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex justify-center items-center w-full">
                              <label className="relative bg-white rounded-lg w-full p-2">
                                <div className="w-full h-[300px] rounded-lg border-dashed border-2 border-[#747474] flex justify-center items-center overflow-hidden">
                                  {mainFilePreview[index] ? (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                                      {mainFilePreview[
                                        index
                                      ]?.file.type.startsWith("video/") ? (
                                        <video
                                          src={mainFilePreview[index]?.url}
                                          controls
                                          className="max-h-full w-full h-full object-contain"
                                        />
                                      ) : mainFilePreview[
                                          index
                                        ]?.file.type.startsWith("audio/") ? (
                                        <div className="flex flex-col items-center justify-center w-full h-full">
                                          <audio
                                            controls
                                            src={mainFilePreview[index]?.url}
                                            className="w-full mb-4"
                                          />
                                          <p className="text-sm text-gray-600">
                                            {mainFilePreview[index]?.file.name}
                                          </p>
                                        </div>
                                      ) : mainFilePreview[
                                          index
                                        ]?.file.type.startsWith(
                                          "application/"
                                        ) ? (
                                        <div className="flex flex-col items-center">
                                          <File className="w-12 h-12 text-gray-400" />
                                          <p className="mt-2 text-sm text-gray-600">
                                            {mainFilePreview[index]?.file.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {mainFilePreview[index]?.file
                                              .size &&
                                              `${(
                                                mainFilePreview[index]?.file
                                                  .size /
                                                (1024 * 1024)
                                              ).toFixed(2)} MB`}
                                          </p>
                                        </div>
                                      ) : (
                                        <img
                                          src={mainFilePreview[index]?.url}
                                          alt="Preview"
                                          className="max-h-full w-full h-full object-contain"
                                        />
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center p-4">
                                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                      <p className="mt-1 text-sm text-gray-600">
                                        Upload file
                                      </p>
                                      <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept={
                                          selectedMainCategory === "1"
                                            ? CATEGORY_CONSTRAINTS[
                                                form.getValues(
                                                  `product_items.${index}.category_id`
                                                )
                                              ]?.acceptTypes
                                            : CATEGORY_CONSTRAINTS[
                                                selectedMainCategory
                                              ]?.acceptTypes
                                        }
                                        onChange={(e) =>
                                          handleFileUpload(e, index)
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || fields.length === 0}
              className="flex items-center gap-2 bg-creator-bg-500 hover:bg-creator-bg-500/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default Step2ProductItems;
