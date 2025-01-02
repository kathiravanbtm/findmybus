/*
  # Add initial bus stops data
  
  1. Changes
    - Insert initial bus stops data into bus_stops table
    
  2. Data Added
    - Multiple bus stops with their names and connections
*/

-- Insert initial bus stops
INSERT INTO bus_stops (name, previous_stop, next_stop) VALUES
  ('Tiruvannamalai Bus Stand', 'Chengam', 'Thandarai'),
  ('Chennai Koyambedu', 'Vellore', 'Kanchipuram'),
  ('Bangalore Majestic', 'Electronic City', 'Hebbal'),
  ('Vellore New Bus Stand', 'Arcot', 'Katpadi'),
  ('Salem Central Bus Stand', 'Dharmapuri', 'Namakkal'),
  ('Coimbatore Gandhipuram', 'Mettupalayam', 'Pollachi'),
  ('Madurai Periyar', 'Dindigul', 'Thirumangalam'),
  ('Thanjavur Old Bus Stand', 'Trichy', 'Kumbakonam'),
  ('Trichy Central', 'Perambalur', 'Pudukkottai'),
  ('Kanchipuram Bus Stand', 'Chennai', 'Vellore')
ON CONFLICT (name) DO NOTHING;