import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dehoslmdytfxscyelwga.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlaG9zbG1keXRmeHNjeWVsd2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTYwODQsImV4cCI6MjA4ODM5MjA4NH0.HX4Z62HbEt3yqBlHUxw_kGbtIqrdfP_7iNp2bpWzJSM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── TICKETS ──────────────────────────────────────────────────────────────────
export async function fetchTickets() {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(dbToTicket)
}

export async function insertTicket(ticket) {
  const { error } = await supabase
    .from('tickets')
    .insert(ticketToDb(ticket))
  if (error) throw error
}

export async function updateTicket(ticket) {
  const { error } = await supabase
    .from('tickets')
    .update(ticketToDb(ticket))
    .eq('id', ticket.id)
  if (error) throw error
}

// ─── CONFIG (demand types, passwords) ────────────────────────────────────────
export async function fetchConfig(key) {
  const { data, error } = await supabase
    .from('config')
    .select('value')
    .eq('key', key)
    .maybeSingle()
  if (error) throw error
  return data ? data.value : null
}

export async function upsertConfig(key, value) {
  const { error } = await supabase
    .from('config')
    .upsert({ key, value }, { onConflict: 'key' })
  if (error) throw error
}

// ─── REALTIME ─────────────────────────────────────────────────────────────────
export function subscribeTickets(onChange) {
  return supabase
    .channel('tickets-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, onChange)
    .subscribe()
}

// ─── MAPPERS ──────────────────────────────────────────────────────────────────
function ticketToDb(t) {
  return {
    id:            t.id,
    assessor_id:   t.assessorId,
    assessor_name: t.assessorName,
    demand_type:   t.demandType,
    urgency:       t.urgency,
    description:   t.description || '',
    attachments:   t.attachments || [],
    status:        t.status,
    messages:      t.messages || [],
    created_at:    t.createdAt,
    concluded_at:  t.concludedAt || null,
  }
}

function dbToTicket(r) {
  return {
    id:           r.id,
    assessorId:   r.assessor_id,
    assessorName: r.assessor_name,
    demandType:   r.demand_type,
    urgency:      r.urgency,
    description:  r.description,
    attachments:  r.attachments || [],
    status:       r.status,
    messages:     r.messages || [],
    createdAt:    r.created_at,
    concludedAt:  r.concluded_at,
  }
}
