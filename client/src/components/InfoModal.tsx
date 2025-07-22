import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, FileText, Zap, Shield, Clock, CheckCircle, Upload, Settings, Download, HelpCircle, Mail, BookOpen } from 'lucide-react';

interface InfoModalProps {
  trigger: React.ReactNode;
  type: 'how-it-works' | 'features' | 'help';
}

export function InfoModal({ trigger, type }: InfoModalProps) {
  const [open, setOpen] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'how-it-works':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">How AI Study Guide Generator Works</h3>
              <p className="text-gray-600 mt-2">Transform your academic PDFs into comprehensive study materials in just 4 simple steps.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Upload Your PDF</h4>
                  </div>
                  <p className="text-gray-600">Simply drag and drop or click to select your academic PDF document. We support files up to 10MB in size.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Choose Question Types</h4>
                  </div>
                  <p className="text-gray-600">Select from 6 different question types: Theoretical, Application-based, Numerical, Multiple Choice, Fill-in-the-blanks, and True/False questions.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">AI Processing</h4>
                  </div>
                  <p className="text-gray-600">Our advanced AI models analyze your document, extract key concepts, generate a comprehensive summary (500+ words), and create 7+ questions per selected type.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Download className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Download & Study</h4>
                  </div>
                  <p className="text-gray-600">Review your complete study guide online and download it as a formatted text file for offline studying and sharing.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">Processing Time</h4>
              <p className="text-blue-800 text-sm">Typical processing time is 2-5 minutes depending on document length and complexity.</p>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Zap className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Powerful Features</h3>
              <p className="text-gray-600 mt-2">Everything you need to create comprehensive study materials from your academic documents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">AI-Powered Summarization</h4>
                    <p className="text-gray-600 text-sm">Get comprehensive 500+ word summaries that capture the key concepts and important details from your documents.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Multiple Question Types</h4>
                    <p className="text-gray-600 text-sm">Choose from 6 different question formats including theoretical, application-based, numerical, MCQ, fill-in-the-blanks, and true/false.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Extensive Question Banks</h4>
                    <p className="text-gray-600 text-sm">Generate 7+ questions per selected type, each with detailed answers and explanations for better understanding.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interactive Question Review</h4>
                    <p className="text-gray-600 text-sm">Review all questions online with expandable sections and show/hide answer functionality for effective self-testing.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy File Upload</h4>
                    <p className="text-gray-600 text-sm">Drag-and-drop PDF upload with support for files up to 10MB. Works with academic papers, textbooks, and lecture notes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Download Study Guides</h4>
                    <p className="text-gray-600 text-sm">Export your complete study guide as a formatted text file for offline studying, printing, or sharing with classmates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Progress</h4>
                    <p className="text-gray-600 text-sm">Watch the AI processing in real-time with detailed progress indicators showing each step of the generation process.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Powered by Advanced AI</h4>
                    <p className="text-gray-600 text-sm">Uses state-of-the-art Hugging Face AI models for accurate text analysis, summarization, and question generation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-green-900 mb-2">Perfect for Students</h4>
              <p className="text-green-800 text-sm">Whether you're preparing for exams, reviewing course materials, or creating study groups, our AI-powered tool helps you master any academic content efficiently.</p>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <HelpCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Help & Support</h3>
              <p className="text-gray-600 mt-2">Get answers to common questions and learn how to make the most of your study guide generator.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-2" />
                  Frequently Asked Questions
                </h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h5 className="font-medium text-gray-900">What file formats are supported?</h5>
                    <p className="text-gray-600 text-sm mt-1">Currently, we support PDF files up to 10MB in size. The PDF should contain text content (not just images) for best results.</p>
                  </div>

                  <div className="border-l-4 border-purple-200 pl-4">
                    <h5 className="font-medium text-gray-900">How many questions will be generated?</h5>
                    <p className="text-gray-600 text-sm mt-1">We generate at least 7 questions per selected question type. For example, if you select 4 question types, you'll get 28+ questions total.</p>
                  </div>

                  <div className="border-l-4 border-purple-200 pl-4">
                    <h5 className="font-medium text-gray-900">How long does processing take?</h5>
                    <p className="text-gray-600 text-sm mt-1">Processing typically takes 2-5 minutes depending on the document length and complexity. You'll see real-time progress updates.</p>
                  </div>

                  <div className="border-l-4 border-purple-200 pl-4">
                    <h5 className="font-medium text-gray-900">Can I download my study guide?</h5>
                    <p className="text-gray-600 text-sm mt-1">Yes! You can download your complete study guide as a formatted text file that includes the summary, all questions, answers, and explanations.</p>
                  </div>

                  <div className="border-l-4 border-purple-200 pl-4">
                    <h5 className="font-medium text-gray-900">What types of documents work best?</h5>
                    <p className="text-gray-600 text-sm mt-1">Academic papers, textbooks, lecture notes, and research documents work best. The document should have clear text content and well-structured information.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  Troubleshooting Tips
                </h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-purple-600">•</span>
                    <p>If processing fails, try a smaller PDF or ensure the file contains readable text content.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-purple-600">•</span>
                    <p>For download issues, try right-clicking the download button and selecting "Save link as..."</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-purple-600">•</span>
                    <p>If questions seem unrelated, the PDF might have poor text extraction. Try a different version of the document.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-purple-600">•</span>
                    <p>Clear your browser cache if you experience any loading issues with the application.</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Need More Help?
                </h4>
                <p className="text-purple-800 text-sm mb-3">Can't find the answer you're looking for? We're here to help!</p>
                <div className="space-y-2 text-sm">
                  <p className="text-purple-700">📧 Email us your questions and we'll respond within 24 hours</p>
                  <p className="text-purple-700">💡 Share feedback to help us improve the tool</p>
                  <p className="text-purple-700">🔧 Report any bugs or technical issues you encounter</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {type === 'how-it-works' && 'How it Works'}
            {type === 'features' && 'Features'}
            {type === 'help' && 'Help & Support'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {type === 'how-it-works' && 'Learn how the AI Study Guide Generator works in 4 simple steps'}
            {type === 'features' && 'Discover all the powerful features available in the AI Study Guide Generator'}
            {type === 'help' && 'Get help and support for using the AI Study Guide Generator'}
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}