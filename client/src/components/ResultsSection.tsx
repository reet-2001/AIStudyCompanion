import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ListChecks, Download, Eye, Info } from 'lucide-react';
import { QuestionDisplay } from './QuestionDisplay';

interface ResultsSectionProps {
  results: {
    id: number;
    filename: string;
    summary: string;
    questions: Array<{
      type: string;
      questions: any[];
    }>;
    selectedTypes: string[];
    totalQuestions: number;
  };
  onDownload: () => void;
}

const questionTypeNames: { [key: string]: string } = {
  theoretical: 'Theoretical',
  application: 'Application',
  numerical: 'Numerical',
  mcq: 'Multiple Choice',
  fillblanks: 'Fill in the Blanks',
  truefalse: 'True/False'
};

const questionTypeColors: { [key: string]: string } = {
  theoretical: 'bg-green-50 border-green-200 text-green-900',
  application: 'bg-orange-50 border-orange-200 text-orange-900',
  numerical: 'bg-purple-50 border-purple-200 text-purple-900',
  mcq: 'bg-blue-50 border-blue-200 text-blue-900',
  fillblanks: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  truefalse: 'bg-pink-50 border-pink-200 text-pink-900'
};

export function ResultsSection({ results, onDownload }: ResultsSectionProps) {
  const getSampleQuestion = () => {
    const mcqSection = results.questions.find(section => section.type === 'mcq');
    if (mcqSection && mcqSection.questions.length > 0) {
      return mcqSection.questions[0];
    }
    
    // Fallback to first available question
    if (results.questions.length > 0 && results.questions[0].questions.length > 0) {
      return results.questions[0].questions[0];
    }
    
    return null;
  };

  const sampleQuestion = getSampleQuestion();

  return (
    <div className="fade-in">
      {/* Summary Preview */}
      <Card className="mb-8 material-card">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-gray-900 flex items-center">
              <FileText className="text-primary mr-3" />
              Generated Summary
            </h3>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              500+ words
            </Badge>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {results.summary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Question Bank Preview */}
      <Card className="mb-8 material-card">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-gray-900 flex items-center">
              <ListChecks className="text-primary mr-3" />
              Question Bank Preview
            </h3>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {results.totalQuestions} questions
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {results.questions.map((section) => {
              const colorClass = questionTypeColors[section.type] || 'bg-blue-50 border-blue-200 text-blue-900';
              return (
                <div key={section.type} className={`rounded-lg p-4 border ${colorClass}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{questionTypeNames[section.type] || section.type}</div>
                    <div className="text-sm font-medium">{section.questions.length} questions</div>
                  </div>
                  <div className="text-sm mt-1">With detailed explanations</div>
                </div>
              );
            })}
          </div>

          {/* Sample Question Preview */}
          {sampleQuestion && (
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-3">Sample Question:</h4>
              <div className="bg-white rounded-md p-4 border-l-4 border-primary">
                <p className="text-gray-700 mb-3">
                  <strong>Q1.</strong> {sampleQuestion.question}
                </p>
                
                {sampleQuestion.options && sampleQuestion.options.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {sampleQuestion.options.map((option: string, index: number) => (
                      <label key={index} className="flex items-center">
                        <input 
                          type="radio" 
                          name="sample" 
                          className="mr-3" 
                          checked={option.includes(sampleQuestion.answer)}
                          readOnly
                        />
                        <span className="text-gray-700">
                          {option} {option.includes(sampleQuestion.answer) ? '✓' : ''}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                
                <div className="text-sm text-green-700 bg-green-50 p-3 rounded-md">
                  <strong>Answer:</strong> {sampleQuestion.answer}
                  {sampleQuestion.explanation && (
                    <>
                      <br />
                      <strong>Explanation:</strong> {sampleQuestion.explanation}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Complete Question Display */}
      <Card className="mb-8 material-card">
        <CardContent className="p-8">
          <QuestionDisplay 
            questionSections={results.questions}
            totalQuestions={results.totalQuestions}
          />
        </CardContent>
      </Card>

      {/* Download Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-material-3 p-8 text-white text-center">
        <h3 className="text-2xl font-medium mb-4">Your Study Guide is Ready!</h3>
        <p className="text-blue-100 mb-6">Download your comprehensive study guide as a text file - works on any device!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onDownload}
            className="bg-white text-blue-600 px-8 py-3 font-medium hover:bg-gray-100 flex items-center justify-center"
          >
            <Download className="mr-3 h-4 w-4" />
            Download Study Guide (.txt)
          </Button>
          <Button
            variant="outline"
            className="border-2 border-blue-200 text-white px-8 py-3 font-medium hover:bg-blue-400 flex items-center justify-center"
          >
            <Eye className="mr-3 h-4 w-4" />
            Preview Guide
          </Button>
        </div>
        <div className="mt-4 text-sm text-blue-100 flex items-center justify-center">
          <Info className="w-4 h-4 mr-1" />
          Generated with {results.totalQuestions} questions • Text format for easy viewing
        </div>
      </div>
    </div>
  );
}
