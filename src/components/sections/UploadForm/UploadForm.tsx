import ProductUpload from "../ProductUpload/ProductUpload"

const UploadForm = () => {
  return (
    <ProductUpload />
  )
}

export default UploadForm










// import React, { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { X, Upload, File, Plus, Trash2, Loader2 } from "lucide-react";
// import { useCategories } from "@/hooks/useCategories";
// import { Label } from "@/components/ui/label";
// import TextEditor from "@/components/sections/TextEditor/TextEditor";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { z } from "zod";
// import { UploadFormSchema } from "@/schemas/UploadSchema";
// import { useApi } from "@/utils/fetcher";

// // File configurations
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// const FileTypes = {
//   image: ".jpg,.jpeg,.png",
//   video: ".mp4,.mov,.avi",
//   audio: ".mp3,.wav",
//   pdf: ".pdf",
//   zip: ".zip,.rar",
//   course: "",
//   link: "",
// } as const;

// // Type for file preview
// interface FilePreview {
//   url: string;
//   file: File;
// }

// type UploadFormValues = z.infer<typeof UploadFormSchema>;

// const UploadForm = () => {
//   const { categories } = useCategories();
//   const [mainFilePreview, setMainFilePreview] = useState<
//     Record<number, FilePreview | null>
//   >({});
//   const [bannerPreview, setBannerPreview] = useState<string>("");
//   const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
//   const [videoPreview, setVideoPreview] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { API } = useApi();

//   const form = useForm<UploadFormValues>({
//     resolver: zodResolver(UploadFormSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       price: "",
//       category_id: "",
//       product_items: [
//         {
//           title: "",
//           description: "",
//           is_downloadable: false,
//           order: 0,
//           category_id: "",
//           media: null,
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "product_items",
//   });

//   const selectedMainCategory = form.watch("category_id");

//   useEffect(() => {
//     const currentItems = form.getValues("product_items");
//     if (selectedMainCategory && selectedMainCategory !== "3") {
//       // 3 is course category
//       currentItems.forEach((_, index) => {
//         form.setValue(
//           `product_items.${index}.category_id`,
//           selectedMainCategory
//         );
//       });
//     }
//   }, [selectedMainCategory, form]);

//   // File validation function
//   const validateFile = (file: File, type: string): boolean => {
//     if (file.size > MAX_FILE_SIZE) {
//       console.error("File size exceeds 10MB limit");
//       return false;
//     }

//     const allowedTypes = FileTypes[type as keyof typeof FileTypes];
//     if (!allowedTypes) return true;

//     const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
//     return allowedTypes.split(",").includes(fileExtension);
//   };

//   const handleFileUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     type: "main" | "preview" | "banner" | "thumbnail",
//     itemIndex?: number
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file size
//     if (file.size > MAX_FILE_SIZE) {
//       console.error("File size exceeds 10MB limit");
//       return;
//     }

//     // Validate file type based on category
//     let isValidFile = true;
//     if (type === "banner" || type === "thumbnail") {
//       isValidFile = validateFile(file, "image");
//     } else if (type === "preview") {
//       isValidFile = validateFile(file, "video");
//     } else if (type === "main" && itemIndex !== undefined) {
//       const itemCategory = form.getValues(
//         `product_items.${itemIndex}.category_id`
//       );
//       const category = categories
//         .find((cat) => cat.id.toString() === itemCategory)
//         ?.name.toLowerCase();
//       if (category) {
//         isValidFile = validateFile(file, category);
//       }
//     }

//     if (!isValidFile) {
//       console.error("Invalid file type");
//       return;
//     }

//     // Handle file preview and form update
//     if (file.type.startsWith("video/")) {
//       const videoUrl = URL.createObjectURL(file);
//       if (type === "preview") {
//         setVideoPreview(videoUrl);
//         form.setValue("preview_video", file);
//       } else if (type === "main" && itemIndex !== undefined) {
//         setMainFilePreview((prev) => ({
//           ...prev,
//           [itemIndex]: { url: videoUrl, file },
//         }));
//         form.setValue(`product_items.${itemIndex}.media`, file);
//       }
//     } else {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const preview = reader.result as string;
//         switch (type) {
//           case "main":
//             if (itemIndex !== undefined) {
//               setMainFilePreview((prev) => ({
//                 ...prev,
//                 [itemIndex]: { url: preview, file },
//               }));
//               form.setValue(`product_items.${itemIndex}.media`, file);
//             }
//             break;
//           case "banner":
//             setBannerPreview(preview);
//             form.setValue("banner", file);
//             break;
//           case "thumbnail":
//             setThumbnailPreview(preview);
//             form.setValue("thumbnail", file);
//             break;
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeFile = (
//     type: "main" | "preview" | "banner" | "thumbnail",
//     itemIndex?: number
//   ) => {
//     switch (type) {
//       case "main":
//         if (itemIndex !== undefined) {
//           setMainFilePreview((prev) => ({
//             ...prev,
//             [itemIndex]: null,
//           }));
//           form.setValue(`product_items.${itemIndex}.media`, null);
//         }
//         break;
//       case "banner":
//         setBannerPreview("");
//         form.setValue("banner", null);
//         break;
//       case "thumbnail":
//         setThumbnailPreview("");
//         form.setValue("thumbnail", null);
//         break;
//       case "preview":
//         setVideoPreview("");
//         form.setValue("preview_video", null);
//         break;
//     }
//   };

//   const renderFileUpload = (
//     _name: string,
//     type: "main" | "preview" | "banner" | "thumbnail",
//     title: string,
//     itemIndex?: number,
//     description?: string,
//     accept?: string
//   ) => {
//     let preview: string | null = null;
//     let file: FilePreview | null = null;

//     switch (type) {
//       case "main":
//         if (itemIndex !== undefined) {
//           file = mainFilePreview[itemIndex] || null;
//         }
//         break;
//       case "banner":
//         preview = bannerPreview;
//         break;
//       case "thumbnail":
//         preview = thumbnailPreview;
//         break;
//       case "preview":
//         preview = videoPreview;
//         break;
//     }

//     const getAcceptTypes = (itemIndex?: number): string => {
//       if (type === "banner" || type === "thumbnail") return FileTypes.image;
//       if (type === "preview") return FileTypes.video;
//       if (type === "main" && itemIndex !== undefined) {
//         const itemCategory = form.getValues(
//           `product_items.${itemIndex}.category_id`
//         );
//         const category = categories
//           .find((cat) => cat.id.toString() === itemCategory)
//           ?.name.toLowerCase();
//         return FileTypes[category as keyof typeof FileTypes] || "";
//       }
//       return accept || "";
//     };

//     const selectedCategory =
//       itemIndex !== undefined
//         ? categories.find(
//             (cat) =>
//               cat.id.toString() ===
//               form.getValues(`product_items.${itemIndex}.category_id`)
//           )?.name
//         : null;

//     return (
//       <div className="space-y-2">
//         <Label className="text-base">{title}</Label>
//         {description && <p className="text-sm text-slate-500">{description}</p>}

//         <div className="flex justify-center items-center w-full">
//           <label className="relative bg-white rounded-lg w-full p-2">
//             <div className="w-full h-[300px] rounded-lg border-dashed border-2 border-[#747474] flex justify-center items-center overflow-hidden">
//               {(type === "main" && file) ||
//               (type === "banner" && preview) ||
//               (type === "thumbnail" && preview) ||
//               (type === "preview" && preview) ? (
//                 <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
//                   {(type === "preview" ||
//                     (type === "main" &&
//                       file?.file.type.startsWith("video/"))) &&
//                   (type === "preview" ? preview : file?.url) ? (
//                     <video
//                       src={type === "preview" ? preview : file?.url}
//                       controls
//                       className="max-h-full w-full h-full object-contain"
//                     />
//                   ) : type === "main" &&
//                     file?.file.type.startsWith("application/") ? (
//                     <div className="flex flex-col items-center">
//                       <File className="w-12 h-12 text-gray-400" />
//                       <p className="mt-2 text-sm text-gray-600">
//                         {file.file.name}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {(file.file.size / (1024 * 1024)).toFixed(2)} MB
//                       </p>
//                     </div>
//                   ) : (
//                     <img
//                       src={type === "main" ? file?.url : preview}
//                       alt="Preview"
//                       className="max-h-full w-full h-full object-contain"
//                     />
//                   )}
//                   <button
//                     type="button"
//                     onClick={() => removeFile(type, itemIndex)}
//                     className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-center p-4">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <p className="mt-1 text-sm text-gray-600">
//                     {!selectedCategory && type === "main"
//                       ? "Please select a category first"
//                       : `Upload ${
//                           type === "main" ? selectedCategory : type
//                         } file`}
//                   </p>
//                   <input
//                     type="file"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     accept={getAcceptTypes(itemIndex)}
//                     onChange={(e) => handleFileUpload(e, type, itemIndex)}
//                   />
//                 </div>
//               )}
//             </div>
//           </label>
//         </div>
//       </div>
//     );
//   };

//   const handleDescriptionChange = (content: string, itemIndex?: number) => {
//     if (itemIndex !== undefined) {
//       form.setValue(`product_items.${itemIndex}.description`, content);
//     } else {
//       form.setValue("description", content);
//     }
//   };

//   // Replace the current onSubmit function with this one
//   const onSubmit = async (values: UploadFormValues) => {
//     setIsSubmitting(true);

//     const token = localStorage.getItem("auth_token");

//     try {
//       console.log("Form submitted successfully with values:", {
//         // Main product details
//         title: values.title,
//         description: values.description,
//         price: values.price,
//         category_id: values.category_id,

//         // Files
//         banner: values.banner
//           ? {
//               name: values.banner.name,
//               type: values.banner.type,
//               size: `${(values.banner.size / (1024 * 1024)).toFixed(2)}MB`,
//             }
//           : null,

//         thumbnail: values.thumbnail
//           ? {
//               name: values.thumbnail.name,
//               type: values.thumbnail.type,
//               size: `${(values.thumbnail.size / (1024 * 1024)).toFixed(2)}MB`,
//             }
//           : null,

//         preview_video: values.preview_video
//           ? {
//               name: values.preview_video.name,
//               type: values.preview_video.type,
//               size: `${(values.preview_video.size / (1024 * 1024)).toFixed(
//                 2
//               )}MB`,
//             }
//           : null,

//         // Product items
//         product_items: values.product_items.map((item) => ({
//           title: item.title,
//           description: item.description,
//           is_downloadable: item.is_downloadable,
//           order: item.order,
//           category_id: item.category_id,
//           media: item.media
//             ? {
//                 name: item.media.name,
//                 type: item.media.type,
//                 size: `${(item.media.size / (1024 * 1024)).toFixed(2)}MB`,
//               }
//             : null,
//         })),
//       });
      
//       const formData = form.getValues();
//       // Log the form state
//       console.log("Form State:", form.getValues());
//       await API.postProduct(formData , token ?? "")
//     } catch (error) {
//       console.error("Error in form submission:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <div className="w-full max-w-4xl mx-auto p-6">
//         <form
//           onSubmit={form.handleSubmit(onSubmit, (errors) => {
//             console.log(
//               "Detailed Form Errors:",
//               JSON.stringify(errors, null, 2)
//             );
//             console.log("Current Form Values:", form.getValues());
//           })}
//           className="space-y-8"
//         >
//           {/* Main Product Section */}
//           <div className="space-y-6 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold">Main Product Details</h2>

//             {/* Category Selection */}
//             <FormField
//               control={form.control}
//               name="category_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Category</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem
//                           key={category.id}
//                           value={category.id.toString()}
//                         >
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Title */}
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Price */}
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <FormControl>
//                     <Input {...field} type="number" step="0.01" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Description */}
//             <FormField
//               control={form.control}
//               name="description"
//               render={() => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <TextEditor
//                       onContentChange={(content) =>
//                         handleDescriptionChange(content)
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Banner Image */}
//             {renderFileUpload(
//               "banner",
//               "banner",
//               "Banner Image",
//               undefined,
//               undefined,
//               FileTypes.image
//             )}

//             {/* Thumbnail */}
//             {renderFileUpload(
//               "thumbnail",
//               "thumbnail",
//               "Thumbnail Image",
//               undefined,
//               undefined,
//               FileTypes.image
//             )}

//             {/* Preview Video - Only for video/course categories */}
//             {(selectedMainCategory === "1" || selectedMainCategory === "2") &&
//               renderFileUpload(
//                 "preview_video",
//                 "preview",
//                 "Preview Video",
//                 undefined,
//                 "Upload a preview video (1-5 minutes)",
//                 FileTypes.video
//               )}
//           </div>

//           {/* Product Items Section */}
//           <div className="space-y-6 bg-white p-6 rounded-lg shadow">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Product Items</h2>
//               <Button
//                 type="button"
//                 onClick={() =>
//                   append({
//                     title: "",
//                     description: "",
//                     is_downloadable: false,
//                     order: fields.length,
//                     category_id:
//                       selectedMainCategory === "3" ? "" : selectedMainCategory,
//                     media: null,
//                   })
//                 }
//                 className="flex items-center gap-2"
//               >
//                 <Plus size={16} /> Add Item
//               </Button>
//             </div>

//             {fields.map((field, index) => (
//               <div key={field.id} className="space-y-6 border-t pt-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-medium">Item {index + 1}</h3>
//                   {fields.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       onClick={() => remove(index)}
//                       className="flex items-center gap-2"
//                     >
//                       <Trash2 size={16} /> Remove
//                     </Button>
//                   )}
//                 </div>

//                 {/* Item Category - Only for courses */}
//                 {selectedMainCategory === "1" && (
//                   <FormField
//                     control={form.control}
//                     name={`product_items.${index}.category_id`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Item Category</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {categories.map((category) => (
//                               <SelectItem
//                                 key={category.id}
//                                 value={category.id.toString()}
//                               >
//                                 {category.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 )}

//                 {/* Item Title */}
//                 <FormField
//                   control={form.control}
//                   name={`product_items.${index}.title`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Title</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Item Description */}
//                 <FormField
//                   control={form.control}
//                   name={`product_items.${index}.description`}
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <TextEditor
//                           onContentChange={(content) =>
//                             handleDescriptionChange(content, index)
//                           }
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Item Order */}
//                 <FormField
//                   control={form.control}
//                   name={`product_items.${index}.order`}
//                   render={({ field: { onChange, ...field } }) => (
//                     <FormItem>
//                       <FormLabel>Order</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           min="0"
//                           onChange={(e) =>
//                             onChange(parseInt(e.target.value, 10) || 0)
//                           }
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Is Downloadable */}
//                 <FormField
//                   control={form.control}
//                   name={`product_items.${index}.is_downloadable`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Downloadable</FormLabel>
//                       <Select
//                         onValueChange={(value) =>
//                           field.onChange(value === "true")
//                         }
//                         defaultValue={field.value ? "true" : "false"}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select option" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="true">Yes</SelectItem>
//                           <SelectItem value="false">No</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Item Media Upload */}
//                 {renderFileUpload(
//                   "media",
//                   "main",
//                   "Upload Files",
//                   index,
//                   "Upload product files"
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-8 py-4 hover:opacity-85 transition-colors text-white bg-creator-bg-500 w-72 hover:bg-creator-bg-500 h-14"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Saving...
//                 </div>
//               ) : (
//                 "Save Product"
//               )}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </Form>
//   );
// };

// export default UploadForm;
