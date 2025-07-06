import React, { useState, useEffect } from 'react';

export interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

interface ProgressStepsProps {
  keyword?: string;
  isLoading: boolean;
  visible?: boolean;
  onCancel?: () => void;
  onComplete?: () => void;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  keyword,
  isLoading,
  visible,
  onCancel,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentProgress, setCurrentProgress] = useState(0);
  const initialState: ProgressStep[] = [
    {
      id: 'request-received',
      title: '已接受请求',
      description: '正在准备处理您的搜索请求',
      status: 'pending',
    },
    {
      id: 'ai-thinking',
      title: 'AI正在思考',
      description: '分析关键词，构建知识框架',
      status: 'pending',
    },
    {
      id: 'generating-answer',
      title: 'AI正在生成答案',
      description: '创建思维导图和知识连接',
      status: 'pending',
    },
    {
      id: 'processing-data',
      title: '处理答案中',
      description: '优化展示格式，准备呈现结果',
      status: 'pending',
    },
  ];

  const [steps, setSteps] = useState<ProgressStep[]>(initialState);
  const stepDurations = [500, 10000, 6000, 3500]; // Duration for each step in ms

  useEffect(() => {
    setCurrentStepIndex(0);
    setSteps(initialState);
    setStartTime(Date.now());
    setCurrentProgress(0);
    setIsCompleted(false);
  }, [keyword]);

  // Handle completion when loading finishes
  useEffect(() => {
    if (!isLoading && currentStepIndex < steps.length && !isCompleted) {
      // Complete all remaining steps
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps.forEach((step, index) => {
          if (index <= currentStepIndex) {
            step.status = 'completed';
          }
        });
        return newSteps;
      });

      setCurrentStepIndex(steps.length);
      setIsCompleted(true);
      setCurrentProgress(100);

      // Auto-close after showing completion
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    }
  }, [isLoading, currentStepIndex, steps.length, isCompleted, onComplete]);

  // Continuous progress update every 200ms
  useEffect(() => {
    if (isCompleted || !isLoading) return;

    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const totalDuration = stepDurations.reduce(
        (sum, duration) => sum + duration,
        0
      );

      // Calculate progress based on elapsed time
      let calculatedProgress = Math.min(
        (elapsedTime / totalDuration) * 100,
        95
      );

      // Ensure we don't go backwards from completed steps
      const completedSteps = steps.filter(
        (step) => step.status === 'completed'
      ).length;
      const completedDuration = stepDurations
        .slice(0, completedSteps)
        .reduce((sum, duration) => sum + duration, 0);
      const minProgressFromCompleted =
        (completedDuration / totalDuration) * 100;

      calculatedProgress = Math.max(
        calculatedProgress,
        minProgressFromCompleted
      );
      setCurrentProgress(calculatedProgress);
    }, 200);

    return () => clearInterval(progressInterval);
  }, [startTime, isLoading, isCompleted, steps, stepDurations]);

  // Simulate progress steps
  useEffect(() => {
    if (isCompleted || !isLoading) return;

    let timeoutId: NodeJS.Timeout;

    const progressToNextStep = () => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];

        // Complete current step
        if (currentStepIndex < newSteps.length) {
          newSteps[currentStepIndex].status = 'completed';
        }

        // Start next step if available (but not the last one if still loading)
        if (currentStepIndex + 1 < newSteps.length) {
          newSteps[currentStepIndex + 1].status = 'active';
        }

        return newSteps;
      });

      setCurrentStepIndex((prev) => prev + 1);
    };

    // Start first step immediately
    if (currentStepIndex === 0) {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[0].status = 'active';
        return newSteps;
      });
    }

    // Schedule next step
    if (currentStepIndex < stepDurations.length - 1) {
      timeoutId = setTimeout(
        progressToNextStep,
        stepDurations[currentStepIndex]
      );
    } else if (currentStepIndex === stepDurations.length - 1 && !isLoading) {
      // Complete the last step if loading is done
      timeoutId = setTimeout(progressToNextStep, 200);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStepIndex, isLoading, isCompleted]);

  // Use real-time progress calculation
  const progressPercentage = isCompleted ? 100 : currentProgress;

  if (!visible) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ width: '450px', left: 'calc(50% - 225px)' }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            正在处理您的请求
          </h3>
          {keyword && (
            <p className="text-sm text-gray-600">
              关键词:{' '}
              <span className="font-medium text-blue-600">"{keyword}"</span>
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            进度: {Math.round(progressPercentage)}%
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-3">
              {/* Step Icon */}
              <div className="flex-shrink-0 mt-1">
                {step.status === 'completed' ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : step.status === 'active' ? (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    step.status === 'completed'
                      ? 'text-green-600'
                      : step.status === 'active'
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                  {step.status === 'active' && (
                    <span className="ml-2 inline-flex">
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-500" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            取消请求
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
