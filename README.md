# LeBron James Stat Predictor

A web application that predicts LeBron James' statistics for the upcoming NBA season using his historical career data.

## Features

- Real-time stat predictions based on LeBron's career data
- Adjustable parameters:
  - Age
  - Minutes per game
  - Team strength
  - Rest days
- Visual representation of predicted stats
- Historical data from LeBron's entire career (2003-2024)

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Recharts for data visualization

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lebron-stat-predictor.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Source

The application uses LeBron James' official NBA statistics from his entire career (2003-2024), including:
- Points per game
- Rebounds per game
- Assists per game
- Steals per game
- Blocks per game
- Games played
- Minutes per game

## How It Works

The prediction model uses LeBron's historical data to make predictions by:
1. Finding similar seasons based on age and team strength
2. Using weighted averages of those similar seasons
3. Adjusting for minutes played and rest days
4. Adding small random variations for realistic predictions

## License

MIT License 