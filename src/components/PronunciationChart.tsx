
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface PronunciationChartProps {
  analysisResult: any;
}

const PronunciationChart = ({ analysisResult }: PronunciationChartProps) => {
  // Generate sample data based on analysis with vibrant colors
  const chartData = [
    { category: 'Vowels', score: 85, target: 90, color: '#FF6B6B' },
    { category: 'Consonants', score: 78, target: 85, color: '#4ECDC4' },
    { category: 'Stress', score: 72, target: 80, color: '#45B7D1' },
    { category: 'Rhythm', score: 88, target: 85, color: '#96CEB4' },
    { category: 'Intonation', score: 75, target: 80, color: '#FECA57' }
  ];

  const chartConfig = {
    score: {
      label: "Your Score",
      color: "hsl(var(--primary))",
    },
    target: {
      label: "Target Score",
      color: "hsl(var(--muted))",
    },
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl border-0">
      <h3 className="text-2xl font-bold mb-6 text-center font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Detailed Pronunciation Breakdown
      </h3>
      <ChartContainer config={chartConfig} className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fontFamily: 'Poppins', fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12, fontFamily: 'Poppins', fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="target" 
              fill="rgba(156, 163, 175, 0.3)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="score" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      {/* Color legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm font-medium font-poppins text-gray-700">
              {item.category}: {item.score}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PronunciationChart;
