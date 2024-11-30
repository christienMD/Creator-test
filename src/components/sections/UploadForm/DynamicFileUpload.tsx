import React, { useState } from 'react';
import { X, Upload, File } from 'lucide-react';
// Define file type categories and their accepted formats
const FileTypes = {
  image: ['image/jpeg', 'image/png', 'image/jpg'],
  video: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  audio: ['audio/mpeg', 'audio/wav'],
  document: ['application/pdf'],
  archive: [
    'application/zip',
    'application/x-zip',
    'application/x-zip-compressed',
    'application/octet-stream',
    'application/x-rar-compressed'
  ]
} as const;
type FileCategory = keyof typeof FileTypes;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const DynamicFileUpload = () => {
  const [selectedCategory, setSelectedCategory] = useState<FileCategory>('image');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as FileCategory);
    setFile(null);
    setPreview('');
    setError('');
  };
  const validateFile = (file: File, category: FileCategory): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }
    // Special handling for zip files
    if (category === 'archive' && file.name.toLowerCase().endsWith('.zip')) {
      return null; // Accept if it has .zip extension
    }
    // Special handling for rar files
    if (category === 'archive' && file.name.toLowerCase().endsWith('.rar')) {
      if (!file.type.includes('rar')) {
        return 'Invalid RAR file format';
      }
      return null;
    }
    // Check file type for non-archive files
    if (category !== 'archive' && !FileTypes[category].includes(file.type)) {
      return `Invalid file type. Accepted types for ${category}: ${FileTypes[category].join(', ')}`;
    }
    return null;
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validationError = validateFile(selectedFile, selectedCategory);
      if (validationError) {
        setError(validationError);
        setFile(null);
        setPreview('');
        return;
      }
      setFile(selectedFile);
      setError('');
      // Create preview for images
      if (selectedCategory === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };
  const removeFile = () => {
    setFile(null);
    setPreview('');
    setError('');
  };
  // Helper function to get accept string for input
  const getAcceptString = (category: FileCategory): string => {
    switch (category) {
      case 'image':
        return '.jpg,.jpeg,.png';
      case 'video':
        return '.mp4,.mov,.avi';
      case 'audio':
        return '.mp3,.wav';
      case 'document':
        return '.pdf';
      case 'archive':
        return '.zip,.rar';
    }
  };
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          File Type
        </label>
        <select
          className="w-full rounded-md border border-gray-300 p-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="document">PDF Document</option>
          <option value="archive">Archive</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload File <span className="text-red-500">*</span>
        </label>
        <div className="relative aspect-square w-full">
          {file && selectedCategory === 'image' && preview ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden group">
              <img
                src={preview}
                alt="File preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full
                  opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : file ? (
            <div className="relative w-full h-full rounded-lg border-2 border-gray-300 p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <File className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">{file.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full
                    hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <label
              className={`w-full h-full flex flex-col items-center justify-center border-2
                border-dashed rounded-lg cursor-pointer
                ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <div className="text-center p-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  Upload {selectedCategory} file
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Max file size: 10MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={getAcceptString(selectedCategory)}
                onChange={handleFileUpload}
              />
            </label>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};
export default DynamicFileUpload;