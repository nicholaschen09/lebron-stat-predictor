"use client"

import { useState, useEffect, useRef } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { predictStats } from "@/lib/predict-stats"
import { LEBRON_STATS } from "../lib/lebron-stats.js"

// Add LeBron facts/quotes
const LEBRON_FACTS = [
  "LeBron James is the only player in NBA history to record over 10,000 points, 10,000 rebounds, and 10,000 assists.",
  '"You have to be able to accept failure to get better."',
  "LeBron has appeared in 10 NBA Finals, winning 4 championships.",
  '"I like criticism. It makes you strong."',
  "LeBron was the youngest player to score 40 points in a game.",
  '"Don\'t be afraid of failure. This is the way to succeed."',
  "LeBron was drafted #1 overall by the Cleveland Cavaliers in 2003.",
  '"I treated it like every day was my last day with a basketball."',
  "LeBron is a four-time NBA MVP (2009, 2010, 2012, 2013).",
  '"Commitment is a big part of what I am and what I believe."',
];

export default function StatPredictorForm() {
  const [age, setAge] = useState(40)
  const [minutesPerGame, setMinutesPerGame] = useState(35)
  const [teamStrength, setTeamStrength] = useState(70)
  const [restDays, setRestDays] = useState(15)
  const [prediction, setPrediction] = useState<null | {
    points: number
    rebounds: number
    assists: number
    steals: number
    blocks: number
  }>(null)
  const [fact, setFact] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // On mount, check for URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ageParam = params.get("age");
    const minParam = params.get("minutes");
    const teamParam = params.get("team");
    const restParam = params.get("rest");
    if (ageParam && minParam && teamParam && restParam) {
      setAge(Number(ageParam));
      setMinutesPerGame(Number(minParam));
      setTeamStrength(Number(teamParam));
      setRestDays(Number(restParam));
      // Predict automatically
      const stats = predictStats({
        age: Number(ageParam),
        minutesPerGame: Number(minParam),
        teamStrength: Number(teamParam),
        restDays: Number(restParam),
      });
      setPrediction(stats);
      const randomFact = LEBRON_FACTS[Math.floor(Math.random() * LEBRON_FACTS.length)]
      setFact(randomFact)
    }
  }, []);

  const handlePredict = () => {
    const stats = predictStats({
      age,
      minutesPerGame,
      teamStrength,
      restDays,
    })
    setPrediction(stats)
    // Pick a random fact/quote
    const randomFact = LEBRON_FACTS[Math.floor(Math.random() * LEBRON_FACTS.length)]
    setFact(randomFact)
  }

  // Copy shareable link
  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("age", String(age));
    url.searchParams.set("minutes", String(minutesPerGame));
    url.searchParams.set("team", String(teamStrength));
    url.searchParams.set("rest", String(restDays));
    navigator.clipboard.writeText(url.toString());
  };

  // Download as image
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const htmlToImage = await import("html-to-image");
    htmlToImage.toPng(cardRef.current).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'lebron-prediction.png';
      link.href = dataUrl;
      link.click();
    });
  };

  const chartData = prediction
    ? [
      {
        name: "Points",
        value: prediction.points,
        fill: "#f97316",
      },
      {
        name: "Rebounds",
        value: prediction.rebounds,
        fill: "#3b82f6",
      },
      {
        name: "Assists",
        value: prediction.assists,
        fill: "#10b981",
      },
      {
        name: "Steals",
        value: prediction.steals,
        fill: "#8b5cf6",
      },
      {
        name: "Blocks",
        value: prediction.blocks,
        fill: "#f43f5e",
      },
    ]
    : []

  return (
    <div className="flex flex-col w-full gap-8">
      <Card className="w-full max-w-full h-fit shadow-xl bg-orange-50 mx-auto" ref={cardRef}>
        <CardContent className="pt-8 pb-8 px-2 sm:px-6 md:px-12 space-y-8">
          {/* Inputs and button on top */}
          <div className="w-full space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age: {age}</Label>
                <Slider id="age" min={35} max={45} step={1} value={[age]} onValueChange={(value) => setAge(value[0])} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minutes">Minutes Per Game: {minutesPerGame}</Label>
                <Slider
                  id="minutes"
                  min={25}
                  max={40}
                  step={1}
                  value={[minutesPerGame]}
                  onValueChange={(value) => setMinutesPerGame(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-strength">Team Strength (0-100): {teamStrength}</Label>
                <Slider
                  id="team-strength"
                  min={50}
                  max={90}
                  step={1}
                  value={[teamStrength]}
                  onValueChange={(value) => setTeamStrength(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rest-days">Load Management (Rest Days): {restDays}</Label>
                <Slider
                  id="rest-days"
                  min={0}
                  max={30}
                  step={1}
                  value={[restDays]}
                  onValueChange={(value) => setRestDays(value[0])}
                />
              </div>
            </div>
            <Button onClick={handlePredict} className="w-full bg-orange-600 hover:bg-orange-700">
              Predict Stats
            </Button>
          </div>
          {/* Prediction and chart below */}
          {prediction && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center">Predicted 2024-25 Season Stats</h3>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Per Game" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 mt-8">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Points</p>
                  <p className="text-2xl font-bold text-orange-600">{prediction.points.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Rebounds</p>
                  <p className="text-2xl font-bold text-blue-600">{prediction.rebounds.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Assists</p>
                  <p className="text-2xl font-bold text-green-600">{prediction.assists.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Steals</p>
                  <p className="text-2xl font-bold text-purple-600">{prediction.steals.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Blocks</p>
                  <p className="text-2xl font-bold text-pink-600">{prediction.blocks.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Games</p>
                  <p className="text-2xl font-bold">{82 - restDays}</p>
                </div>
              </div>
              {/* Career stats line chart */}
              <div className="h-[180px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={LEBRON_STATS.map(season => ({
                    season: season.season,
                    Points: season.points,
                    Rebounds: season.rebounds,
                    Assists: season.assists,
                  }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="season" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Points" fill="#f97316" />
                    <Bar dataKey="Rebounds" fill="#3b82f6" />
                    <Bar dataKey="Assists" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button onClick={handleCopyLink} className="px-4 py-2 rounded bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200 transition">Copy Shareable Link</button>
                <button onClick={handleDownloadImage} className="px-4 py-2 rounded bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200 transition">Download as Image</button>
              </div>
              {fact && (
                <div className="mt-8 text-center text-base italic text-orange-800 bg-orange-50 rounded-lg px-4 py-3">
                  {fact}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
