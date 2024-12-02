import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface Props {
  productTitle: string;
}

const Step4ProductUploadSuccess = ({ productTitle }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => navigate('/dashboard')}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-green-100 rounded-full">
            <CheckCircle className="h-12 w-12 text-creator-bg-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Product Successfully Published!
          </h2>

          <p className="text-gray-600">
            Congratulations! Your product "{productTitle}" is now live and
            available to your audience.
          </p>

          <div className="space-y-2">
            <Button
              onClick={() => navigate('/creator/dashboard')}
              className="w-full bg-creator-bg-500"
            >
              Return to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => 
                window.location.reload()
            }
              className="w-full"
            >
              Create Another Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4ProductUploadSuccess;
