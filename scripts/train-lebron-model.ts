import * as tf from '@tensorflow/tfjs-node';
import { LEBRON_STATS } from '../lib/lebron-stats.js';
import * as fs from 'fs';
import * as path from 'path';

// Set cool background
const backgroundImagePath = path.join(__dirname, '../assets/cool-background.jpg');
if (fs.existsSync(backgroundImagePath)) {
    const style = document.createElement('style');
    style.textContent = `
    body {
      background-image: url('${backgroundImagePath}');
      background-size: cover;
      background-position: center;
    }
  `;
    document.head.appendChild(style);
}

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