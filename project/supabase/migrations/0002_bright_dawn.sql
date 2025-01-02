/*
  # Fix RLS policies for bus_stops table
  
  1. Changes
    - Drop existing policies
    - Add new policies for public access
    
  2. Security
    - Enable public read/write access to bus_stops table
    - This is suitable for a public bus schedule app
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to bus_stops" ON bus_stops;
DROP POLICY IF EXISTS "Allow authenticated users to insert bus_stops" ON bus_stops;
DROP POLICY IF EXISTS "Allow authenticated users to update bus_stops" ON bus_stops;

-- Create new policies for public access
CREATE POLICY "Enable read access for all users"
ON bus_stops FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert access for all users"
ON bus_stops FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
ON bus_stops FOR UPDATE
TO public
USING (true)
WITH CHECK (true);