import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { HelpCircle, Info } from 'lucide-react';

interface QuestionTypeSelectorProps {
  selectedTypes: string[];
  onSelectionChange: (types: string[]) => void;
  disabled?: boolean;
}

const questionTypes = [
  {
    id: 'theoretical',
    name: 'Theoretical Questions',
    description: 'Conceptual understanding and knowledge recall',
  },
  {
    id: 'application',
    name: 'Application-Based',
    description: 'Real-world application scenarios',
  },
  {
    id: 'numerical',
    name: 'Numerical Problems',
    description: 'Mathematical calculations and formulas',
  },
  {
    id: 'mcq',
    name: 'Multiple Choice',
    description: 'Four-option MCQs with explanations',
  },
  {
    id: 'fillblanks',
    name: 'Fill in the Blanks',
    description: 'Key term and concept completion',
  },
  {
    id: 'truefalse',
    name: 'True/False',
    description: 'Statement verification with justification',
  },
];

export function QuestionTypeSelector({ selectedTypes, onSelectionChange, disabled }: QuestionTypeSelectorProps) {
  const handleTypeToggle = (typeId: string) => {
    if (disabled) return;
    
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(t => t !== typeId)
      : [...selectedTypes, typeId];
    
    onSelectionChange(newSelectedTypes);
  };

  return (
    <Card className="mb-8 material-card">
      <CardContent className="p-8">
        <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
          <HelpCircle className="text-primary mr-3" />
          Select Question Types
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionTypes.map((type) => (
            <Label
              key={type.id}
              className={`flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 cursor-pointer transition-all ${
                selectedTypes.includes(type.id) ? 'border-primary bg-blue-50' : ''
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Checkbox
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => handleTypeToggle(type.id)}
                disabled={disabled}
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-gray-900">{type.name}</div>
                <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                <div className="text-xs text-primary mt-2 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  Generates 7+ questions with detailed answers
                </div>
              </div>
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
