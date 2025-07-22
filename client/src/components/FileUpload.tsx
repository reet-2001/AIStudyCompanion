import { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudUpload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export function FileUpload({ selectedFile, onFileSelect, disabled }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      if (pdfFile.size > 10 * 1024 * 1024) {
        alert('File too large. Please upload a PDF smaller than 10MB.');
        return;
      }
      onFileSelect(pdfFile);
    } else {
      alert('Please upload a PDF file.');
    }
  }, [onFileSelect, disabled]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File too large. Please upload a PDF smaller than 10MB.');
        return;
      }
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleRemoveFile = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="mb-8 material-card">
      <CardContent className="p-8">
        <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
          <CloudUpload className="text-primary mr-3" />
          Upload Your PDF
        </h3>
        
        {!selectedFile ? (
          <div
            className={cn(
              "upload-zone border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary cursor-pointer transition-all",
              isDragOver && "border-primary bg-blue-50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !disabled && document.getElementById('pdfInput')?.click()}
          >
            <CloudUpload className="mx-auto text-4xl text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-700 mb-2">Drop your PDF here or click to browse</h4>
            <p className="text-gray-500 mb-4">Supports PDF files up to 10MB</p>
            <input
              type="file"
              id="pdfInput"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
              disabled={disabled}
            />
            <Button
              type="button"
              className="bg-primary text-white px-6 py-2 hover:bg-blue-700"
              disabled={disabled}
            >
              Choose File
            </Button>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="text-red-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                disabled={disabled}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
