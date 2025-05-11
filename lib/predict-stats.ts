// This is a simplified ML model for demonstration purposes
// In a real application, you would use TensorFlow.js to load a pre-trained model

import { CAREER_AVERAGES, LEBRON_STATS, SeasonStats } from "./lebron-stats"

interface PredictionParams {
  age: number
  minutesPerGame: number
  teamStrength: number
  restDays: number
}

interface PredictionResult {
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
}

// Find similar seasons based on age and team strength
function findSimilarSeasons(age: number, teamStrength: number): SeasonStats[] {
  return LEBRON_STATS.filter(season => {
    const ageDiff = Math.abs(season.age - age)
    const teamStrengthDiff = Math.abs(season.teamStrength - teamStrength)
    return ageDiff <= 2 && teamStrengthDiff <= 10
  })
}

// Calculate weighted average based on similarity
function calculateWeightedAverage(similarSeasons: SeasonStats[], param: keyof Omit<SeasonStats, 'season' | 'team' | 'games'>): number {
  if (similarSeasons.length === 0) return CAREER_AVERAGES[param]

  const weights = similarSeasons.map(season => {
    const ageWeight = 1 / (Math.abs(season.age - similarSeasons[0].age) + 1)
    const teamWeight = 1 / (Math.abs(season.teamStrength - similarSeasons[0].teamStrength) + 1)
    return ageWeight * teamWeight
  })

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  const weightedSum = similarSeasons.reduce((sum, season, index) => sum + season[param] * weights[index], 0)

  return weightedSum / totalWeight
}

// Simplified prediction model based on parameters
export function predictStats(params: PredictionParams): PredictionResult {
  const { age, minutesPerGame, teamStrength, restDays } = params

  // Find similar seasons
  const similarSeasons = findSimilarSeasons(age, teamStrength)

  // Calculate base stats from similar seasons
  const basePoints = calculateWeightedAverage(similarSeasons, 'points')
  const baseRebounds = calculateWeightedAverage(similarSeasons, 'rebounds')
  const baseAssists = calculateWeightedAverage(similarSeasons, 'assists')
  const baseSteals = calculateWeightedAverage(similarSeasons, 'steals')
  const baseBlocks = calculateWeightedAverage(similarSeasons, 'blocks')

  // Minutes factor (more minutes = more stats, but with diminishing returns)
  const minutesFactor = minutesPerGame / 36

  // Rest factor (more rest days = better per-game performance)
  const restFactor = 1 + (restDays / 82) * 0.1

  // Calculate predicted stats
  const points = basePoints * minutesFactor * restFactor
  const rebounds = baseRebounds * minutesFactor * restFactor
  const assists = baseAssists * minutesFactor * restFactor
  const steals = baseSteals * minutesFactor * restFactor
  const blocks = baseBlocks * minutesFactor * restFactor

  // Add some randomness to make predictions more realistic
  const addNoise = (value: number) => {
    const noise = (Math.random() - 0.5) * 0.1 * value
    return Math.max(0, value + noise)
  }

  return {
    points: addNoise(points),
    rebounds: addNoise(rebounds),
    assists: addNoise(assists),
    steals: addNoise(steals),
    blocks: addNoise(blocks),
  }
}

// For a real application, you would use TensorFlow.js like this:
/*
import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel;

// Load the model
async function loadModel() {
  model = await tf.loadLayersModel('path/to/model.json');
}

export async function predictStats(params: PredictionParams): Promise<PredictionResult> {
  if (!model) {
    await loadModel();
  }
  
  // Convert params to tensor
  const input = tf.tensor2d([[
    params.age,
    params.minutesPerGame,
    params.teamStrength,
    params.restDays
  ]]);
  
  // Make prediction
  const prediction = model.predict(input) as tf.Tensor;
  const values = await prediction.data();
  
  // Clean up tensors
  input.dispose();
  prediction.dispose();
  
  return {
    points: values[0],
    rebounds: values[1],
    assists: values[2],
    steals: values[3],
    blocks: values[4],
  };
}
*/
