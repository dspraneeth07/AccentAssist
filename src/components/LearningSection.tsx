
import { useState } from "react";
import { Play, BookOpen, Target, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playCorrectPronunciation } from "@/utils/textToSpeech";

const LearningSection = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const commonWords = [
    { word: "Water", phonetic: "/ˈwɔːtər/", difficulty: "Easy" },
    { word: "Schedule", phonetic: "/ˈskɛdʒuːl/", difficulty: "Medium" },
    { word: "Entrepreneurship", phonetic: "/ˌɑntrəprəˈnɜrʃɪp/", difficulty: "Hard" },
    { word: "Comfortable", phonetic: "/ˈkʌmftərbəl/", difficulty: "Medium" },
    { word: "February", phonetic: "/ˈfɛbruˌɛri/", difficulty: "Medium" },
  ];

  const pronunciationTips = [
    {
      title: "American 'R' Sound",
      description: "The American 'R' is retroflex. Curl your tongue tip back slightly.",
      example: "Car, Better, Water"
    },
    {
      title: "Vowel Reduction",
      description: "Unstressed vowels often become the 'schwa' sound /ə/.",
      example: "About, Supply, Problem"
    },
    {
      title: "Word Stress",
      description: "American English has strong word stress patterns.",
      example: "PHOtograph vs photoGRAPHic"
    }
  ];

  const playWord = async (word: string) => {
    setIsPlaying(word);
    try {
      await playCorrectPronunciation(word);
    } catch (error) {
      console.error('Error playing word:', error);
    } finally {
      setIsPlaying(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Learn American English
        </h2>
        <p className="text-muted-foreground">
          Master pronunciation with our interactive learning tools
        </p>
      </div>

      <Tabs defaultValue="words" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="words" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Practice Words</span>
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Tips</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center space-x-2">
            <Headphones className="w-4 h-4" />
            <span>Exercises</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="words" className="space-y-4">
          <h3 className="text-xl font-semibold">Common Challenging Words</h3>
          <div className="grid gap-4">
            {commonWords.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium">{item.word}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">
                      {item.phonetic}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => playWord(item.word)}
                    disabled={isPlaying === item.word}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    {isPlaying === item.word ? (
                      <>
                        <Play className="w-4 h-4 mr-1 animate-pulse" />
                        Playing
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Listen
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <h3 className="text-xl font-semibold">Pronunciation Tips</h3>
          <div className="grid gap-4">
            {pronunciationTips.map((tip, index) => (
              <Card key={index} className="p-6">
                <h4 className="text-lg font-medium mb-2">{tip.title}</h4>
                <p className="text-muted-foreground mb-3">{tip.description}</p>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">Examples: {tip.example}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-4">
          <h3 className="text-xl font-semibold">Pronunciation Exercises</h3>
          <div className="grid gap-4">
            <Card className="p-6 text-center">
              <h4 className="text-lg font-medium mb-4">Minimal Pairs Practice</h4>
              <p className="text-muted-foreground mb-4">
                Practice distinguishing between similar sounds
              </p>
              <Button variant="outline" className="mr-2">Ship vs Sheep</Button>
              <Button variant="outline">Bit vs Beat</Button>
            </Card>
            
            <Card className="p-6 text-center">
              <h4 className="text-lg font-medium mb-4">Stress Pattern Drills</h4>
              <p className="text-muted-foreground mb-4">
                Master American English stress patterns
              </p>
              <Button variant="outline" className="mr-2">2-Syllable Words</Button>
              <Button variant="outline">3-Syllable Words</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningSection;
