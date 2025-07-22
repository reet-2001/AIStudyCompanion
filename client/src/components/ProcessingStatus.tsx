import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Settings } from 'lucide-react';

interface ProcessingStatusProps {
  currentStep: string;
  progress: number;
}

export function ProcessingStatus({ currentStep, progress }: ProcessingStatusProps) {
  return (
    <Card className="mb-8 material-card">
      <CardContent className="p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Settings className="text-primary text-2xl animate-spin" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-4">Generating Your Study Guide</h3>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{currentStep}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full h-2 mb-4" />
            <div className="text-sm text-gray-500">
              <p>Please keep this tab open while we process your document.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
