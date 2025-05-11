"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for recent predictions
const recentPredictions = [
  {
    id: 1,
    name: "Optimistic Fan",
    age: 40,
    minutesPerGame: 38,
    teamStrength: 85,
    restDays: 5,
    stats: {
      points: 28.5,
      rebounds: 8.2,
      assists: 9.1,
      steals: 1.3,
      blocks: 0.9,
    },
  },
  {
    id: 2,
    name: "Realistic Analyst",
    age: 40,
    minutesPerGame: 34,
    teamStrength: 75,
    restDays: 15,
    stats: {
      points: 25.3,
      rebounds: 7.5,
      assists: 8.2,
      steals: 1.1,
      blocks: 0.7,
    },
  },
  {
    id: 3,
    name: "Pessimistic Critic",
    age: 40,
    minutesPerGame: 30,
    teamStrength: 65,
    restDays: 25,
    stats: {
      points: 21.8,
      rebounds: 6.4,
      assists: 7.3,
      steals: 0.9,
      blocks: 0.5,
    },
  },
]

export default function RecentPredictions() {
  const [selectedPrediction, setSelectedPrediction] = useState(recentPredictions[0])
  const [activeTab, setActiveTab] = useState("1")

  useEffect(() => {
    setSelectedPrediction(recentPredictions[Number.parseInt(activeTab) - 1])
  }, [activeTab])

  const chartData = [
    {
      name: "Points",
      value: selectedPrediction.stats.points,
      fill: "#f97316",
    },
    {
      name: "Rebounds",
      value: selectedPrediction.stats.rebounds,
      fill: "#3b82f6",
    },
    {
      name: "Assists",
      value: selectedPrediction.stats.assists,
      fill: "#10b981",
    },
    {
      name: "Steals",
      value: selectedPrediction.stats.steals,
      fill: "#8b5cf6",
    },
    {
      name: "Blocks",
      value: selectedPrediction.stats.blocks,
      fill: "#f43f5e",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">Optimistic</TabsTrigger>
            <TabsTrigger value="2">Realistic</TabsTrigger>
            <TabsTrigger value="3">Pessimistic</TabsTrigger>
          </TabsList>
          <TabsContent value="1" className="space-y-4">
            <PredictionContent prediction={recentPredictions[0]} chartData={chartData} />
          </TabsContent>
          <TabsContent value="2" className="space-y-4">
            <PredictionContent prediction={recentPredictions[1]} chartData={chartData} />
          </TabsContent>
          <TabsContent value="3" className="space-y-4">
            <PredictionContent prediction={recentPredictions[2]} chartData={chartData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function PredictionContent({ prediction, chartData }: { prediction: any; chartData: any[] }) {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Age</p>
          <p className="text-lg font-medium">{prediction.age}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Minutes/Game</p>
          <p className="text-lg font-medium">{prediction.minutesPerGame}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Team Strength</p>
          <p className="text-lg font-medium">{prediction.teamStrength}/100</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Rest Days</p>
          <p className="text-lg font-medium">{prediction.restDays}</p>
        </div>
      </div>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Points</p>
          <p className="text-xl font-bold text-orange-600">{prediction.stats.points.toFixed(1)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Rebounds</p>
          <p className="text-xl font-bold text-blue-600">{prediction.stats.rebounds.toFixed(1)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Assists</p>
          <p className="text-xl font-bold text-green-600">{prediction.stats.assists.toFixed(1)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Steals</p>
          <p className="text-xl font-bold text-purple-600">{prediction.stats.steals.toFixed(1)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Blocks</p>
          <p className="text-xl font-bold text-pink-600">{prediction.stats.blocks.toFixed(1)}</p>
        </div>
      </div>
    </div>
  )
}
