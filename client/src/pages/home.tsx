import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { QuestionTypeSelector } from '@/components/QuestionTypeSelector';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { ResultsSection } from '@/components/ResultsSection';
import { InfoModal } from '@/components/InfoModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Brain, FileText, HelpCircle } from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['theoretical', 'application', 'numerical', 'mcq']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please upload a PDF file first.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedTypes.length === 0) {
      toast({
        title: 'No question types selected',
        description: 'Please select at least one question type.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setResults(null);
    
    const steps = [
      { text: 'Extracting text from PDF...', progress: 25 },
      { text: 'Generating AI summary...', progress: 50 },
      { text: 'Creating question bank...', progress: 75 },
      { text: 'Compiling study guide...', progress: 100 }
    ];

    try {
      // Simulate processing steps for UI feedback
      for (let i = 0; i < steps.length; i++) {
        setProcessingStep(steps[i].text);
        setProgress(steps[i].progress);
        
        if (i < steps.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }

      const formData = new FormData();
      formData.append('pdfFile', selectedFile);
      formData.append('selectedTypes', JSON.stringify({ selectedTypes }));

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate study guide');
      }

      const data = await response.json();
      setResults(data);
      
      toast({
        title: 'Study guide generated!',
        description: 'Your comprehensive study guide is ready for download.',
      });
    } catch (error) {
      console.error('Error generating study guide:', error);
      toast({
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!results) return;

    try {
      const response = await fetch(`/api/download/${results.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to download study guide');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `study-guide-${results.filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Download started',
        description: 'Your study guide PDF is being downloaded.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Failed to download the study guide. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      {/* Header */}
      <header className="bg-white shadow-material-1 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Brain className="text-primary text-2xl" />
              <h1 className="text-xl font-medium text-gray-900">AI Study Guide Generator</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <InfoModal 
                type="how-it-works"
                trigger={
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    How it Works
                  </button>
                }
              />
              <InfoModal 
                type="features"
                trigger={
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    Features
                  </button>
                }
              />
              <InfoModal 
                type="help"
                trigger={
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    Help
                  </button>
                }
              />
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-4">Transform Your PDFs into Study Guides</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Upload your academic PDF and get AI-generated summaries, practice questions, and comprehensive study materials in minutes.</p>
        </div>

        {/* Upload Section */}
        <FileUpload 
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          disabled={isProcessing}
        />

        {/* Question Types Selection */}
        <QuestionTypeSelector
          selectedTypes={selectedTypes}
          onSelectionChange={setSelectedTypes}
          disabled={isProcessing}
        />

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button
            onClick={handleGenerate}
            disabled={!selectedFile || selectedTypes.length === 0 || isProcessing}
            className="bg-primary text-white px-12 py-4 text-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-material-2 hover:shadow-material-3"
            size="lg"
          >
            <Brain className="mr-3 h-5 w-5" />
            Generate Study Guide
          </Button>
          <p className="text-sm text-gray-500 mt-3">Processing typically takes 2-5 minutes</p>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <ProcessingStatus
            currentStep={processingStep}
            progress={progress}
          />
        )}

        {/* Results Section */}
        {results && !isProcessing && (
          <ResultsSection
            results={results}
            onDownload={handleDownload}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="text-primary text-2xl" />
                <h3 className="text-lg font-medium text-gray-900">AI Study Guide Generator</h3>
              </div>
              <p className="text-gray-600 max-w-md">Transform your academic PDFs into comprehensive study materials with AI-powered summarization and question generation.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>AI Summarization</li>
                <li>Question Generation</li>
                <li>Multiple Question Types</li>
                <li>PDF Export</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 AI Study Guide Generator. Powered by Hugging Face AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
