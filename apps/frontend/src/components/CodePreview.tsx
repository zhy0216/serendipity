import React from 'react';

interface CodePreviewProps {
  code: string;
  language?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ 
  code, 
  language = 'typescript' 
}) => {
  return (
    <pre className="whitespace-pre-wrap text-sm">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodePreview;
