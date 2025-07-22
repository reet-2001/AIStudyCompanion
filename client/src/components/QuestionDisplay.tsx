import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
  explanation?: string;
  options?: string[];
}

interface QuestionSection {
  type: string;
  questions: Question[];
}

interface QuestionDisplayProps {
  questionSections: QuestionSection[];
  totalQuestions: number;
}

const questionTypeNames: { [key: string]: string } = {
  theoretical: 'Theoretical Questions',
  application: 'Application-Based Questions',
  numerical: 'Numerical Problems',
  mcq: 'Multiple Choice Questions',
  fillblanks: 'Fill in the Blanks',
  truefalse: 'True/False Questions'
};

const questionTypeColors: { [key: string]: string } = {
  theoretical: 'bg-green-50 border-green-200 text-green-800',
  application: 'bg-orange-50 border-orange-200 text-orange-800',
  numerical: 'bg-purple-50 border-purple-200 text-purple-800',
  mcq: 'bg-blue-50 border-blue-200 text-blue-800',
  fillblanks: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  truefalse: 'bg-pink-50 border-pink-200 text-pink-800'
};

export function QuestionDisplay({ questionSections, totalQuestions }: QuestionDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionType: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionType]: !prev[sectionType]
    }));
  };

  const toggleAnswer = (questionKey: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-gray-900">Complete Question Bank</h3>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          {totalQuestions} total questions
        </Badge>
      </div>

      {questionSections.map((section) => {
        const isExpanded = expandedSections[section.type];
        const colorClass = questionTypeColors[section.type] || 'bg-blue-50 border-blue-200 text-blue-800';
        const typeName = questionTypeNames[section.type] || section.type;

        return (
          <Card key={section.type} className="overflow-hidden">
            <div 
              className={`p-4 cursor-pointer ${colorClass} border-b`}
              onClick={() => toggleSection(section.type)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-lg">{typeName}</h4>
                  <Badge variant="outline" className="bg-white/50">
                    {section.questions.length} questions
                  </Badge>
                </div>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {isExpanded && (
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {section.questions.map((question, index) => {
                    const questionKey = `${section.type}-${index}`;
                    const showAnswer = showAnswers[questionKey];

                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="font-medium text-gray-900">
                            Q{index + 1}. {question.question}
                          </h5>
                        </div>

                        {/* Multiple Choice Options */}
                        {question.options && question.options.length > 0 && (
                          <div className="space-y-2 mb-4">
                            {question.options.map((option, optionIndex) => {
                              const isCorrect = option.includes(question.answer) || 
                                               option.startsWith(question.answer);
                              
                              return (
                                <div 
                                  key={optionIndex} 
                                  className={`flex items-center p-2 rounded ${
                                    showAnswer && isCorrect 
                                      ? 'bg-green-100 border border-green-300' 
                                      : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-4 h-4 rounded-full border-2 ${
                                      showAnswer && isCorrect 
                                        ? 'border-green-500 bg-green-500' 
                                        : 'border-gray-300'
                                    }`}>
                                      {showAnswer && isCorrect && (
                                        <CheckCircle className="w-4 h-4 text-white" />
                                      )}
                                    </div>
                                    <span className="text-gray-700">{option}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* True/False Questions */}
                        {section.type === 'truefalse' && (
                          <div className="flex space-x-4 mb-4">
                            <div className={`flex items-center p-2 rounded ${
                              showAnswer && question.answer === 'True' 
                                ? 'bg-green-100 border border-green-300' 
                                : 'bg-white border border-gray-200'
                            }`}>
                              <CheckCircle className={`w-4 h-4 mr-2 ${
                                showAnswer && question.answer === 'True' ? 'text-green-600' : 'text-gray-300'
                              }`} />
                              <span>True</span>
                            </div>
                            <div className={`flex items-center p-2 rounded ${
                              showAnswer && question.answer === 'False' 
                                ? 'bg-red-100 border border-red-300' 
                                : 'bg-white border border-gray-200'
                            }`}>
                              <XCircle className={`w-4 h-4 mr-2 ${
                                showAnswer && question.answer === 'False' ? 'text-red-600' : 'text-gray-300'
                              }`} />
                              <span>False</span>
                            </div>
                          </div>
                        )}

                        {/* Show/Hide Answer Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAnswer(questionKey)}
                          className="mb-3"
                        >
                          {showAnswer ? 'Hide Answer' : 'Show Answer'}
                        </Button>

                        {/* Answer and Explanation */}
                        {showAnswer && (
                          <div className="space-y-3">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-green-800">
                                <strong>Answer:</strong> {question.answer}
                              </p>
                            </div>
                            
                            {question.explanation && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-blue-800">
                                  <strong>Explanation:</strong> {question.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}