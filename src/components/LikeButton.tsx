import React, { useState } from 'react';

interface LikeButtonProps {
  initialLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLiked = false, onLikeChange }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLikeChange?.(newLikedState);
  };

  return (
    <button 
      onClick={handleClick}
      className="p-1.5 hover:bg-purple-200 rounded-full transition-colors"
    >
      {isLiked ? (
        <span className="text-base">👍</span>
      ) : (
        <span className="text-base opacity-50">👍</span>
      )}
    </button>
  );
}

export default LikeButton;