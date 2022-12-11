CREATE DATABASE no_stress;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4(),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    birthday DATE,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE tasks (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    description VARCHAR(50) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    hours INTEGER NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TYPE constraint_type AS ENUM (
    'Studies',
    'Test',
    'Work',
    'Event',
    'Rest',
    'Other'
);

CREATE TABLE constraints (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    description VARCHAR(50) NOT NULL,
    type constraint_type DEFAULT 'Other',
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

