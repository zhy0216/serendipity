import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  children: ReactNode;
  isVisible: boolean;
  position?: 'left' | 'right';
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isVisible,
  position = 'left',
  triggerRef,
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create or get portal container
    let container = document.getElementById('popover-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'popover-root';
      document.body.appendChild(container);
    }
    setPortalContainer(container);

    return () => {
      // Cleanup if needed - only remove if it's still a child of body and has no children
      const existingContainer = document.getElementById('popover-root');
      if (
        existingContainer &&
        existingContainer.children.length === 0 &&
        document.body.contains(existingContainer)
      ) {
        try {
          document.body.removeChild(existingContainer);
        } catch (error) {
          // Container might have been removed by another instance, ignore the error
          console.debug('Portal container already removed');
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && triggerRef?.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let left = triggerRect.left;
      let top = triggerRect.top;

      if (position === 'left') {
        left = triggerRect.left - popoverRect.width - 8; // 8px gap
      } else {
        left = triggerRect.right + 8; // 8px gap
      }

      // Ensure popover stays within viewport
      if (left < 0) left = 8;
      if (left + popoverRect.width > window.innerWidth) {
        left = window.innerWidth - popoverRect.width - 8;
      }

      if (top + popoverRect.height > window.innerHeight) {
        top = window.innerHeight - popoverRect.height - 8;
      }

      setPopoverPosition({ top, left });
    }
  }, [isVisible, position, triggerRef]);

  if (!isVisible || !portalContainer) return null;

  const arrowClasses =
    position === 'left'
      ? 'right-0 top-4 transform translate-x-1 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white'
      : 'left-0 top-4 transform -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white';

  const arrowBorderClasses =
    position === 'left'
      ? 'right-0 top-4 transform translate-x-2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-200'
      : 'left-0 top-4 transform -translate-x-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-200';

  return createPortal(
    <div
      ref={popoverRef}
      className="fixed w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] p-4"
      style={{
        top: popoverPosition.top,
        left: popoverPosition.left,
      }}
    >
      <div className="text-xs text-gray-500 mb-2">预览内容</div>
      <div className="bg-gray-50 p-3 rounded text-sm font-mono text-gray-800 max-h-48 overflow-y-auto">
        {children}
      </div>
      {/* Triangle pointer */}
      <div className={`absolute ${arrowBorderClasses}`}></div>
      <div className={`absolute ${arrowClasses}`}></div>
    </div>,
    portalContainer
  );
};

export default Popover;
