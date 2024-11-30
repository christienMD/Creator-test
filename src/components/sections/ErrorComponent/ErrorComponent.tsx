import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorComponent = ({
  title = 'Error Loading Content',
  message = 'There was a problem loading the content. Please try again.',
  onRetry,
}: ErrorComponentProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 min-h-[400px]">
      <Alert variant="destructive" className="max-w-lg mx-auto">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>
      </Alert>

      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-6">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
