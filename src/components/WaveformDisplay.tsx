
import { cn } from "@/lib/utils";

interface WaveformDisplayProps {
  data: number[];
  isRecording: boolean;
  className?: string;
}

const WaveformDisplay = ({ data, isRecording, className }: WaveformDisplayProps) => {
  // Generate some default bars if no data
  const displayData = data.length > 0 ? data : Array(32).fill(0.1);
  
  return (
    <div className={cn("flex items-center justify-center space-x-1 h-16", className)}>
      {displayData.map((value, index) => (
        <div
          key={index}
          className={`bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-100 ${
            isRecording ? 'opacity-100' : 'opacity-60'
          }`}
          style={{
            width: '4px',
            height: `${Math.max(4, value * 60)}px`,
            transform: isRecording ? `scaleY(${1 + Math.random() * 0.5})` : 'scaleY(1)'
          }}
        />
      ))}
    </div>
  );
};

export default WaveformDisplay;
