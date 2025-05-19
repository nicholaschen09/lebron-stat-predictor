import * as tf from '@tensorflow/tfjs-node';
import { LEBRON_STATS } from '../lib/lebron-stats.js';

// Set dark orange background
const style = document.createElement('style');
style.textContent = `
  body {
    background-color: rgb(192, 84, 63);
    color: white;
  }
  .model-description {
    color: white important;
    font-size: 1.2em;
    text-align: center;
    padding: 20px;
    margin: 20px;
  }
`;
document.head.appendChild(style);

// Add model description
const description = document.createElement('div');
description.className = 'model-description';
description.textContent = 'Our model analyzes LeBron\'s career trajectory, age, minutes played, and team context to predict his stats for the upcoming season.';
document.body.appendChild(description);

// Prepare training data
const features: number[][] = [];
const labels: number[][] = [];

for (const season of LEBRON_STATS) {
    features.push([
        season.age,
        season.minutesPerGame,
        season.teamStrength,
    ]);
    labels.push([
        season.points,
        season.rebounds,
        season.assists,
        season.steals,
        season.blocks,
    ]);
}

const featureTensor = tf.tensor2d(features);
const labelTensor = tf.tensor2d(labels);

// Build the model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [3], units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 5 })); // 5 outputs: points, rebounds, assists, steals, blocks

model.compile({ optimizer: tf.train.adam(0.01), loss: 'meanSquaredError' });

async function trainAndSave() {
    await model.fit(featureTensor, labelTensor, {
        epochs: 500,
        verbose: 1,
    });

    // Save the model
    await model.save('file://./public/model');
    console.log('Model trained and saved to ./public/model');
}

trainAndSave();