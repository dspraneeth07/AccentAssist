
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface PronunciationChartProps {
  analysisResult: any;
}

const PronunciationChart = ({ analysisResult }: PronunciationChartProps) => {
  // Generate sample data based on analysis
  const chartData = [
    { category: 'Vowels', score: 85, target: 90 },
    { category: 'Consonants', score: 78, target: 85 },
    { category: 'Stress', score: 72, target: 80 },
    { category: 'Rhythm', score: 88, target: 85 },
    { category: 'Intonation', score: 75, target: 80 }
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
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Detailed Pronunciation Breakdown</h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="target" 
              fill="var(--color-target)" 
              radius={[2, 2, 0, 0]}
              opacity={0.3}
            />
            <Bar 
              dataKey="score" 
              fill="var(--color-score)" 
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};

export default PronunciationChart;
