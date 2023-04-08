import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv';

config();

const supabaseUrl = 'https://frbspfuntpuklccxcjab.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export async function consultRNC(searchValue) {
    const { data, error } = await supabase
        .from("consulta-rnc")
        .select("*")
        .ilike('legalName', `%${searchValue}%`);

        if (error) {
            return null
        } else {
            return data[0];
        }
}