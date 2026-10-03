CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    total_points INTEGER DEFAULT 0
);

CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    google_id VARCHAR(100) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('participant', 'organizer', 'scouter', 'admin')),
    university_id INTEGER REFERENCES universities(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE athlete_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    sport_id INTEGER REFERENCES sports(id) NOT NULL,
    matches_played INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    mvp_votes INTEGER DEFAULT 0,
    performance_rank INTEGER
);

CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    sport_id INTEGER REFERENCES sports(id) NOT NULL,
    creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
    start_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament_participants (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tournament_id, user_id)
);

CREATE TABLE fixtures (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
    home_university_id INTEGER REFERENCES universities(id) NOT NULL,
    away_university_id INTEGER REFERENCES universities(id) NOT NULL,
    match_time TIMESTAMP NOT NULL,
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished'))
);