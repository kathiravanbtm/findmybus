/*
  # Update bus stops policies

  1. Changes
    - Drop existing policies
    - Add new policies for public access to bus_stops table
    
  2. Security
    - Enable public read/write access to bus_stops table
    - No authentication required for basic CRUD operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON bus_stops;
DROP POLICY IF EXISTS "Enable insert access for all users" ON bus_stops;
DROP POLICY IF EXISTS "Enable update access for all users" ON bus_stops;

-- Create new policies with public access
CREATE POLICY "Allow public read access to bus_stops"
ON bus_stops FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert access to bus_stops"
ON bus_stops FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update access to bus_stops"
ON bus_stops FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public delete access to bus_stops"
ON bus_stops FOR DELETE
TO public
USING (true);