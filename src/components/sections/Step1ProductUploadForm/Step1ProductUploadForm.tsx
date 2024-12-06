import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Loader2, ArrowRight, AlertCircle } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Step1FormSchema, type UploadFormValues } from "@/schemas/UploadSchema";
import { FileTypes, MAX_FILE_SIZE } from "@/schemas/UploadSchema";

type FileOrNull = File | null;

interface InitialFormData {
  title: string;
  price: string;
  category_id: string;
  description?: string;
  banner?: FileOrNull;
  thumbnail?: FileOrNull;
  preview_video?: FileOrNull;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product_items: any[];
}

interface Props {
  onComplete: (data: UploadFormValues) => void;
  initialData?: InitialFormData | null;
}

const Step1ProductUploadForm = ({ onComplete, initialData }: Props) => {
  const { categories } = useCategories();
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(Step1FormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: "",
      category_id: "",
      banner: null,
      thumbnail: null,
      preview_video: null,
      product_items: [],
    },
    mode: "onChange", // Enable real-time validation
  });

  const selectedMainCategory = form.watch("category_id");
  useEffect(() => {
    const cleanupURLs = () => {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };

    if (initialData) {
      cleanupURLs();

      // Change these checks
      if (initialData.banner && "type" in initialData.banner) {
        setBannerPreview(URL.createObjectURL(initialData.banner));
      }

      if (initialData.thumbnail && "type" in initialData.thumbnail) {
        setThumbnailPreview(URL.createObjectURL(initialData.thumbnail));
      }

      if (initialData.preview_video && "type" in initialData.preview_video) {
        setVideoPreview(URL.createObjectURL(initialData.preview_video));
      }

      form.reset(initialData);
    }

    return cleanupURLs;
  }, [initialData, form]);

  const validateFile = (file: File, type: string): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setFormError(
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
      return false;
    }

    const allowedTypes = FileTypes[type as keyof typeof FileTypes];
    if (!allowedTypes) return true;

    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const isValidType = allowedTypes.split(",").includes(fileExtension);

    if (!isValidType) {
      setFormError(`Invalid file type. Allowed types: ${allowedTypes}`);
      return false;
    }

    return true;
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "preview" | "banner" | "thumbnail"
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

    let isValidFile = true;
    if (type === "banner" || type === "thumbnail") {
      isValidFile = validateFile(file, "image");
    } else if (type === "preview") {
      isValidFile = validateFile(file, "video");
    }

    if (!isValidFile) return;

    if (type === "preview") {
      setVideoPreview(URL.createObjectURL(file));
      form.setValue("preview_video", file);
    } else if (type === "banner") {
      setBannerPreview(URL.createObjectURL(file));
      form.setValue("banner", file);
    } else if (type === "thumbnail") {
      setThumbnailPreview(URL.createObjectURL(file));
      form.setValue("thumbnail", file);
    }
  };

  const removeFile = (type: "preview" | "banner" | "thumbnail") => {
    setFormError(null);
    switch (type) {
      case "banner":
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        setBannerPreview("");
        form.setValue("banner", null);
        break;
      case "thumbnail":
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview("");
        form.setValue("thumbnail", null);
        break;
      case "preview":
        if (videoPreview) URL.revokeObjectURL(videoPreview);
        setVideoPreview("");
        form.setValue("preview_video", null);
        break;
    }
  };

  const renderFilePreview = (type: "preview" | "banner" | "thumbnail") => {
    let url: string | null = null;
    let file: File | null = null;

    switch (type) {
      case "banner":
        url = bannerPreview;
        file = form.getValues("banner");
        break;
      case "thumbnail":
        url = thumbnailPreview;
        file = form.getValues("thumbnail");
        break;
      case "preview":
        url = videoPreview;
        file = form.getValues("preview_video");
        break;
    }

    if (!url || !file) return null;

    if (file.type.startsWith("video/")) {
      return (
        <video
          src={url || undefined}
          controls
          className="max-h-full w-full h-full object-contain"
        />
      );
    }

    return (
      <img
        src={url}
        alt="Preview"
        className="max-h-full w-full h-full object-contain"
      />
    );
  };

  const handleDescriptionChange = (content: string) => {
    form.setValue("description", content);
  };

  const onSubmit = async (values: UploadFormValues) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Log the values we're trying to submit
      console.log("Attempting to submit:", values);

      // Validate required fields
      if (!values.banner) {
        setFormError("Banner image is required");
        setIsSubmitting(false);
        return;
      }
      if (!values.thumbnail) {
        setFormError("Thumbnail image is required");
        setIsSubmitting(false);
        return;
      }
      if (
        (values.category_id === "1" || values.category_id === "2") &&
        !values.preview_video
      ) {
        setFormError("Preview video is required for video/course products");
        setIsSubmitting(false);
        return;
      }

      // Call onComplete with the values
      console.log("Calling onComplete with:", values);
      onComplete(values);
    } catch (error) {
      console.error("Error in form submission:", error);
      setFormError("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUpload = (
    type: "preview" | "banner" | "thumbnail",
    title: string,
    description?: string,
    accept?: string
  ) => {
    return (
      <div className="space-y-2">
        <Label className="text-base">
          {title}{" "}
          {(type === "banner" || type === "thumbnail") && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        {description && <p className="text-sm text-slate-500">{description}</p>}

        <div className="flex justify-center items-center w-full">
          <label className="relative bg-white rounded-lg w-full p-2">
            <div className="w-full h-[300px] rounded-lg border-dashed border-2 border-[#747474] flex justify-center items-center overflow-hidden">
              {renderFilePreview(type) ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  {renderFilePreview(type)}
                  <button
                    type="button"
                    onClick={() => removeFile(type)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center p-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    Upload {title.toLowerCase()}
                  </p>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept={
                      accept ||
                      (type === "preview" ? FileTypes.video : FileTypes.image)
                    }
                    onChange={(e) => handleFileUpload(e, type)}
                  />
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    );
  };

  <form
  onSubmit={form.handleSubmit(onSubmit, (errors) => {
    console.log("Form Validation Errors:", errors);
    const errorMessages = [];

    if (errors.title) {
      errorMessages.push(errors.title.message);
    }
    if (errors.price) {
      errorMessages.push(errors.price.message);
    }
    if (errors.category_id) {
      errorMessages.push(errors.category_id.message);
    }
    if (errors.banner) {
      errorMessages.push("Banner image is required");
    }
    if (errors.thumbnail) {
      errorMessages.push("Thumbnail image is required");
    }

    setFormError(errorMessages.length > 0 
      ? errorMessages.join("\n") 
      : "Please fill in all required fields correctly"
    );
  })}
  className="space-y-8"
/>



  return (
    <Form {...form}>
      <div className="w-full max-w-4xl mx-auto p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Form Validation Errors:", errors);
            setFormError("Please fill in all required fields correctly");
          })}
          className="space-y-8"
        >
          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="whitespace-pre-line">
                {formError}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Main Product Details</h2>

            {/* Category Selection */}
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Product Category <span className="text-red-500">*</span>
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

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter product title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="Enter product price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TextEditor
                      onContentChange={handleDescriptionChange}
                      initialValue={form.getValues("description")}
                    />
                  </FormControl>
                  {/* Description Guide - Add margin-top */}
                  <div className="tox-tinymce mt-2 p-4 bg-gray-50 rounded-md text-sm">
                    <h3 className="font-medium mb-2">
                      Create a Compelling Product Description:
                    </h3>
                    <p>
                      Use our editor's formatting tools to make your product
                      irresistible to buyers! Include:
                    </p>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>
                        <strong>Key Benefits</strong> - What problems does your
                        product solve?
                      </li>
                      <li>
                        <strong>Specifications</strong> - Format, size,
                        duration, or requirements
                      </li>
                      <li>
                        <strong>Target Users</strong> - Who is this perfect for?
                      </li>
                      <li>
                        <strong>Usage Terms</strong> - License and usage rights
                      </li>
                    </ul>
                    <p className="mt-2 italic">
                      Pro tip: Clear, detailed descriptions = more sales! Use
                      headings, lists, and bold text to highlight important
                      information.
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Banner Image */}
            {renderFileUpload(
              "banner",
              "Banner Image",
              "Upload a banner image for your product"
            )}

            {/* Thumbnail */}
            {renderFileUpload(
              "thumbnail",
              "Thumbnail Image",
              "Upload a thumbnail image for your product"
            )}

            {/* Preview Video - Only for video/course categories */}
            {(selectedMainCategory === "1" || selectedMainCategory === "2") &&
              renderFileUpload(
                "preview",
                "Preview Video",
                "Upload a preview video (1-5 minutes)"
              )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 hover:opacity-85 transition-colors text-white bg-creator-bg-500 hover:bg-creator-bg-500 h-14 flex items-center gap-2"
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

export default Step1ProductUploadForm;

