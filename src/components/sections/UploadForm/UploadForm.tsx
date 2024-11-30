import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, File } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from './TextEditor/TextEditor';
import { UploadFormSchema, type UploadFormValues } from './UploedFormSchema';
const FileTypes = {
  image: '.jpg,.jpeg,.png',
  video: '.mp4,.mov,.avi',
  audio: '.mp3,.wav',
  pdf: '.pdf',
  zip: '.zip,.rar'
} as const;
type FileCategory = keyof typeof FileTypes;
const UploadForm = () => {
  const [mainPreview, setMainPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UploadFormValues>({
    resolver: zodResolver(UploadFormSchema),
    mode: "onChange",
  });
  const selectedCategory = watch("product_category") as FileCategory;
  const handleContentChange = (content: string) => {
    setDescription(content);
    setValue('description', content);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'preview' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file || !selectedCategory) return;
    try {
      if (type === 'main') {
        setMainFile(file);
        setValue('file', file);
        if (file.type.startsWith('video/') || selectedCategory === 'video') {
          const videoUrl = URL.createObjectURL(file);
          setMainPreview(videoUrl);
        } else if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setMainPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      } else if (type === 'preview') {
        setVideoFile(file);
        setValue('preview_video', file);
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
      } else if (type === 'banner') {
        setBannerFile(file);
        setValue('banner', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };
  const removeFile = (type: 'main' | 'preview' | 'banner') => {
    if (type === 'main') {
      setMainFile(null);
      setMainPreview('');
      setValue('file', undefined);
    } else if (type === 'preview') {
      setVideoFile(null);
      setVideoPreview('');
      setValue('preview_video', undefined);
    } else if (type === 'banner') {
      setBannerFile(null);
      setBannerPreview('');
      setValue('banner', undefined);
    }
  };
  const renderFileUpload = (
    type: 'main' | 'preview' | 'banner',
    title: string,
    description?: string,
    accept?: string
  ) => {
    const preview = type === 'main' ? mainPreview : type === 'banner' ? bannerPreview : videoPreview;
    const file = type === 'main' ? mainFile : type === 'banner' ? bannerFile : videoFile;
    const error = errors[type === 'main' ? 'file' : type === 'preview' ? 'preview_video' : 'banner'];
    const isVideo = type === 'preview' || (type === 'main' && selectedCategory === 'video');
    const isImage = type === 'banner' || (type === 'main' && file?.type.startsWith('image/'));
    return (
      <div className="space-y-2">
        <Label className="text-base">{title}</Label>
        {description && <p className="text-sm text-slate-500">{description}</p>}
        <div className="flex justify-center items-center w-full">
          <label className="relative bg-white rounded-lg w-full p-2">
            <div className="w-full h-[300px] rounded-lg border-dashed border-2 border-[#747474] flex justify-center items-center overflow-hidden">
              {file ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  {isVideo && preview ? (
                    <video
                      src={preview}
                      controls
                      className="max-h-full w-full h-full object-contain"
                    />
                  ) : isImage && preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-full w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <File className="w-12 h-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
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
                    {!selectedCategory && type === 'main'
                      ? 'Please select a category first'
                      : `Upload ${type === 'main' ? selectedCategory : type} file`}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Drag and drop or click to upload
                  </p>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept={accept || FileTypes[selectedCategory]}
                    onChange={(e) => handleFileUpload(e, type)}
                    disabled={!selectedCategory && type === 'main'}
                  />
                </div>
              )}
            </div>
          </label>
        </div>
        {error && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  };
  const onSubmit = (data: UploadFormValues) => {
    const formData = {
      ...data,
      description: description
    };
    console.log("Form Data:", formData);
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Category Selection */}
        <div className="space-y-2">
          <Label className="text-base">What will you like to Upload</Label>
          <p className="text-sm text-slate-500">Product type (Category)</p>
          <div className="flex justify-start max-w-sm">
            <Label className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg">
              Category
            </Label>
            <select
              {...register("product_category")}
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg block w-full p-2.5"
            >
              <option value="" disabled>Select a category</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="pdf">Ebook</option>
              <option value="zip">Zip</option>
              <option value="image">Image</option>
            </select>
          </div>
          {errors.product_category && (
            <p className="text-sm text-red-500">{errors.product_category.message}</p>
          )}
        </div>
        {/* Title Input */}
        <div>
          <Label htmlFor="title">Product Title</Label>
          <Input
            id="title"
            placeholder="Enter product title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        {/* Price Input */}
        <div>
          <Label htmlFor="price">Product Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter product price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        {/* Description */}
        <div>
          <Label htmlFor="description">Product Description</Label>
          <TextEditor
            onContentChange={handleContentChange}
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        {/* Main File Upload */}
        {renderFileUpload('main', 'Upload Product File')}
        {/* Preview Video */}
        {renderFileUpload(
          'preview',
          'Preview Video',
          'The preview video should be 1-5 minutes long.',
          '.mp4,.mov,.avi'
        )}
        {/* Banner Image */}
        {renderFileUpload(
          'banner',
          'Banner Image',
          undefined,
          '.jpg,.jpeg,.png'
        )}
        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-10 py-5 bg-creator-bg-400 rounded-md text-white my-4 hover:bg-creator-bg-200"
          >
            Save product
          </button>
        </div>
      </form>
    </div>
  );
};
export default UploadForm;




