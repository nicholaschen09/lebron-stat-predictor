"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { predictStats } from "@/lib/predict-stats"

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

  const handlePredict = () => {
    const stats = predictStats({
      age,
      minutesPerGame,
      teamStrength,
      restDays,
    })
    setPrediction(stats)
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
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

      {prediction && (
        <Card className="h-fit">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">Predicted 2024-25 Season Stats</h3>
              <div className="h-[300px] w-full">
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
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Points</p>
                  <p className="text-xl font-bold text-orange-600">{prediction.points.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Rebounds</p>
                  <p className="text-xl font-bold text-blue-600">{prediction.rebounds.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Assists</p>
                  <p className="text-xl font-bold text-green-600">{prediction.assists.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Steals</p>
                  <p className="text-xl font-bold text-purple-600">{prediction.steals.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Blocks</p>
                  <p className="text-xl font-bold text-pink-600">{prediction.blocks.toFixed(1)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Games</p>
                  <p className="text-xl font-bold">{82 - restDays}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
