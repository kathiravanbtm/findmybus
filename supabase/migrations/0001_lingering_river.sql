/*
  # Initial Schema for Bus Schedule Application

  1. New Tables
    - `bus_stops`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `previous_stop` (text)
      - `next_stop` (text)
      - `created_at` (timestamp)

    - `bus_schedules`
      - `id` (uuid, primary key)
      - `bus_stop_id` (uuid, foreign key)
      - `bus_name` (text)
      - `destination` (text)
      - `arrival_time` (time)
      - `days` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Create bus_stops table
CREATE TABLE bus_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  previous_stop text,
  next_stop text,
  created_at timestamptz DEFAULT now()
);

-- Create bus_schedules table
CREATE TABLE bus_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_stop_id uuid REFERENCES bus_stops(id) ON DELETE CASCADE,
  bus_name text NOT NULL,
  destination text NOT NULL,
  arrival_time time NOT NULL,
  days text[] NOT NULL DEFAULT '{EVERY DAY}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_bus_schedules_bus_stop_id ON bus_schedules(bus_stop_id);

-- Enable Row Level Security
ALTER TABLE bus_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for bus_stops
CREATE POLICY "Allow public read access to bus_stops"
  ON bus_stops
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert bus_stops"
  ON bus_stops
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update bus_stops"
  ON bus_stops
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for bus_schedules
CREATE POLICY "Allow public read access to bus_schedules"
  ON bus_schedules
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert bus_schedules"
  ON bus_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update bus_schedules"
  ON bus_schedules
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete bus_schedules"
  ON bus_schedules
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamp
CREATE TRIGGER update_bus_schedules_updated_at
  BEFORE UPDATE ON bus_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();