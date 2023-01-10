CREATE DATABASE no_stress;

CREATE TABLE users (
    id UUID,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    birthday DATE,

    PRIMARY KEY (id),
    CONSTRAINT username_unq UNIQUE (username)
);

CREATE TABLE calendars (
    id UUID,
    user_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
    id UUID,
    calendar_id UUID NOT NULL,
    description VARCHAR(50) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    work_hours INTEGER NOT NULL,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_calendar FOREIGN KEY (calendar_id) REFERENCES calendars(id)
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
    id UUID,
    calendar_id UUID NOT NULL,
    description VARCHAR(50) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    type constraint_type DEFAULT 'Other',
    
    PRIMARY KEY (id),
    CONSTRAINT fk_calendar FOREIGN KEY (calendar_id) REFERENCES calendars(id)
);

CREATE TABLE scheduled_tasks (
    id UUID,
    task_id UUID NOT NULL,
    calendar_id UUID NOT NULL,
    day_of_week INTEGER,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    hours INTEGER NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_master FOREIGN KEY (task_id) REFERENCES tasks(id),
    CONSTRAINT fk_calendar FOREIGN KEY (calendar_id) REFERENCES calendars(id)
);
