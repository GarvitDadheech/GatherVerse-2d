import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@repo/ui/Button";

interface ImageUploadProps {
  onImageSelect: (url: string) => void;
  value: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  value,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onImageSelect(data.url);
      setUrlInput("");
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError("Please enter an image URL");
      return;
    }

    try {
      new URL(urlInput);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    onImageSelect(urlInput);
  };

  return (
    <div className="space-y-4">
      {/* URL Input Section */}
      <div className="relative">
        <input
          type="text"
          placeholder="Paste image URL here"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="w-full px-6 py-4 bg-[#2a3441] rounded-2xl border-2 border-[#374151] 
            focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 
            font-['Comic_Sans_MS']"
        />
        <Button
          variant="secondary"
          onClick={handleUrlSubmit}
          className="mt-6 font-['Comic_Sans_MS']"
        >
          Add URL
        </Button>
      </div>

      <div className="flex items-center">
        <div className="flex-1 border-t border-[#374151]" />
        <span className="px-4 text-gray-400 font-['Comic_Sans_MS']">or</span>
        <div className="flex-1 border-t border-[#374151]" />
      </div>

      {/* File Upload Section */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <Button
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-5 relative border-2 border-dashed border-[#374151] hover:border-[#4fd1c5]"
      >
        <div className="flex flex-col items-center gap-2">
          <Upload size={24} />
          <span className="font-['Comic_Sans_MS']">
            {isUploading ? "Uploading..." : "Click to upload image"}
          </span>
        </div>
      </Button>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm font-['Comic_Sans_MS']">{error}</p>
      )}
    </div>
  );
};
