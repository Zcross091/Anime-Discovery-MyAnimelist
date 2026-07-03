import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knmbpwlraitujnzdzbfv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWJwd2xyYWl0dWpuemR6YmZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg5OTczMCwiZXhwIjoyMDk4NDc1NzMwfQ.LpFoKTThntmj6_cLIs4XB0kjTOBgB5w1Xlf_vBqKWYo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testQuery() {
  console.log("Connecting to Supabase...");
  const { data, error } = await supabase
    .from('anime_links')
    .select('*')
    .ilike('anime_name', `%naruto%`)
    .not('url', 'ilike', 'magnet:%')
    .limit(20);

  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log("SUCCESS! Got rows:", data.length);
  }
}

testQuery();
