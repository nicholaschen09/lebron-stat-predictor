export interface SeasonStats {
    season: string;
    age: number;
    team: string;
    games: number;
    minutesPerGame: number;
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    teamStrength: number; // Approximate team strength rating (0-100)
}

export const LEBRON_STATS: SeasonStats[] = [
    {
        season: "2003-04",
        age: 19,
        team: "CLE",
        games: 79,
        minutesPerGame: 39.5,
        points: 20.9,
        rebounds: 5.5,
        assists: 5.9,
        steals: 1.6,
        blocks: 0.7,
        teamStrength: 45
    },
    {
        season: "2004-05",
        age: 20,
        team: "CLE",
        games: 80,
        minutesPerGame: 42.4,
        points: 27.2,
        rebounds: 7.4,
        assists: 7.2,
        steals: 2.2,
        blocks: 0.7,
        teamStrength: 50
    },
    {
        season: "2005-06",
        age: 21,
        team: "CLE",
        games: 79,
        minutesPerGame: 42.5,
        points: 31.4,
        rebounds: 7.0,
        assists: 6.6,
        steals: 1.6,
        blocks: 0.8,
        teamStrength: 55
    },
    {
        season: "2006-07",
        age: 22,
        team: "CLE",
        games: 78,
        minutesPerGame: 40.9,
        points: 27.3,
        rebounds: 6.7,
        assists: 6.0,
        steals: 1.6,
        blocks: 0.7,
        teamStrength: 60
    },
    {
        season: "2007-08",
        age: 23,
        team: "CLE",
        games: 75,
        minutesPerGame: 40.4,
        points: 30.0,
        rebounds: 7.9,
        assists: 7.2,
        steals: 1.8,
        blocks: 1.1,
        teamStrength: 65
    },
    {
        season: "2008-09",
        age: 24,
        team: "CLE",
        games: 81,
        minutesPerGame: 37.7,
        points: 28.4,
        rebounds: 7.6,
        assists: 7.2,
        steals: 1.7,
        blocks: 1.1,
        teamStrength: 85
    },
    {
        season: "2009-10",
        age: 25,
        team: "CLE",
        games: 76,
        minutesPerGame: 39.0,
        points: 29.7,
        rebounds: 7.3,
        assists: 8.6,
        steals: 1.6,
        blocks: 1.0,
        teamStrength: 90
    },
    {
        season: "2010-11",
        age: 26,
        team: "MIA",
        games: 79,
        minutesPerGame: 38.8,
        points: 26.7,
        rebounds: 7.5,
        assists: 7.0,
        steals: 1.6,
        blocks: 0.6,
        teamStrength: 95
    },
    {
        season: "2011-12",
        age: 27,
        team: "MIA",
        games: 62,
        minutesPerGame: 37.5,
        points: 27.1,
        rebounds: 7.9,
        assists: 6.2,
        steals: 1.9,
        blocks: 0.8,
        teamStrength: 95
    },
    {
        season: "2012-13",
        age: 28,
        team: "MIA",
        games: 76,
        minutesPerGame: 37.9,
        points: 26.8,
        rebounds: 8.0,
        assists: 7.3,
        steals: 1.7,
        blocks: 0.9,
        teamStrength: 95
    },
    {
        season: "2013-14",
        age: 29,
        team: "MIA",
        games: 77,
        minutesPerGame: 37.7,
        points: 27.1,
        rebounds: 6.9,
        assists: 6.3,
        steals: 1.6,
        blocks: 0.3,
        teamStrength: 90
    },
    {
        season: "2014-15",
        age: 30,
        team: "CLE",
        games: 69,
        minutesPerGame: 36.1,
        points: 25.3,
        rebounds: 6.0,
        assists: 7.4,
        steals: 1.6,
        blocks: 0.7,
        teamStrength: 85
    },
    {
        season: "2015-16",
        age: 31,
        team: "CLE",
        games: 76,
        minutesPerGame: 35.6,
        points: 25.0,
        rebounds: 7.4,
        assists: 6.8,
        steals: 1.4,
        blocks: 0.6,
        teamStrength: 90
    },
    {
        season: "2016-17",
        age: 32,
        team: "CLE",
        games: 74,
        minutesPerGame: 37.8,
        points: 25.0,
        rebounds: 7.4,
        assists: 8.7,
        steals: 1.2,
        blocks: 0.6,
        teamStrength: 85
    },
    {
        season: "2017-18",
        age: 33,
        team: "CLE",
        games: 82,
        minutesPerGame: 36.9,
        points: 27.5,
        rebounds: 8.6,
        assists: 9.1,
        steals: 1.4,
        blocks: 0.9,
        teamStrength: 75
    },
    {
        season: "2018-19",
        age: 34,
        team: "LAL",
        games: 55,
        minutesPerGame: 35.2,
        points: 27.4,
        rebounds: 8.5,
        assists: 8.3,
        steals: 1.3,
        blocks: 0.6,
        teamStrength: 65
    },
    {
        season: "2019-20",
        age: 35,
        team: "LAL",
        games: 67,
        minutesPerGame: 34.6,
        points: 25.0,
        rebounds: 7.7,
        assists: 10.2,
        steals: 1.2,
        blocks: 0.5,
        teamStrength: 85
    },
    {
        season: "2020-21",
        age: 36,
        team: "LAL",
        games: 45,
        minutesPerGame: 33.4,
        points: 25.0,
        rebounds: 7.7,
        assists: 7.8,
        steals: 1.1,
        blocks: 0.6,
        teamStrength: 80
    },
    {
        season: "2021-22",
        age: 37,
        team: "LAL",
        games: 56,
        minutesPerGame: 37.2,
        points: 30.3,
        rebounds: 8.2,
        assists: 6.2,
        steals: 1.3,
        blocks: 1.1,
        teamStrength: 70
    },
    {
        season: "2022-23",
        age: 38,
        team: "LAL",
        games: 55,
        minutesPerGame: 35.5,
        points: 28.9,
        rebounds: 8.3,
        assists: 6.8,
        steals: 0.9,
        blocks: 0.6,
        teamStrength: 75
    },
    {
        season: "2023-24",
        age: 39,
        team: "LAL",
        games: 71,
        minutesPerGame: 35.3,
        points: 25.7,
        rebounds: 7.3,
        assists: 8.1,
        steals: 1.2,
        blocks: 0.5,
        teamStrength: 75
    }
];

// Calculate career averages
export const CAREER_AVERAGES = {
    points: LEBRON_STATS.reduce((sum, season) => sum + season.points, 0) / LEBRON_STATS.length,
    rebounds: LEBRON_STATS.reduce((sum, season) => sum + season.rebounds, 0) / LEBRON_STATS.length,
    assists: LEBRON_STATS.reduce((sum, season) => sum + season.assists, 0) / LEBRON_STATS.length,
    steals: LEBRON_STATS.reduce((sum, season) => sum + season.steals, 0) / LEBRON_STATS.length,
    blocks: LEBRON_STATS.reduce((sum, season) => sum + season.blocks, 0) / LEBRON_STATS.length,
}; 