import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://knmbpwlraitujnzdzbfv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWJwd2xyYWl0dWpuemR6YmZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg5OTczMCwiZXhwIjoyMDk4NDc1NzMwfQ.LpFoKTThntmj6_cLIs4XB0kjTOBgB5w1Xlf_vBqKWYo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
