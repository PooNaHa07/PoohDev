import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface Award {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

export async function GET() {
  console.log('GET /api/portfolio - Fetching data from Supabase');
  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    const { data: awards, error: awardsError } = await supabase
      .from('awards')
      .select('*')
      .order('id', { ascending: true });

    if (projectsError || awardsError) {
      console.error('Supabase fetch error:', projectsError || awardsError);
      return NextResponse.json({ 
        error: 'Failed to load data from Supabase', 
        details: (projectsError || awardsError)?.message 
      }, { status: 500 });
    }

    return NextResponse.json({ projects, awards });
  } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { projects, awards }: { projects: Project[], awards: Award[] } = await request.json();

    // To handle deletions during sync:
    // 1. Get all current IDs from DB
    // 2. Identify IDs missing from the incoming request
    // 3. Delete missing ones, Upsert existing/new ones

    if (projects) {
      const { data: currentProjects, error: fetchPErr } = await supabase.from('projects').select('id');
      if (fetchPErr) {
        console.error('Error fetching current projects:', fetchPErr);
        return NextResponse.json({ error: 'Error fetching current projects', details: fetchPErr.message }, { status: 500 });
      }

      const incomingIds = projects.map((p: any) => p.id);
      const idsToDelete = currentProjects?.filter(p => !incomingIds.includes(p.id)).map(p => p.id) || [];
      
      if (idsToDelete.length > 0) {
        const { error: delPErr } = await supabase.from('projects').delete().in('id', idsToDelete);
        if (delPErr) {
          console.error('Error deleting projects:', delPErr);
          return NextResponse.json({ error: 'Error deleting projects', details: delPErr.message }, { status: 500 });
        }
      }
      const { error: pErr } = await supabase.from('projects').upsert(projects);
      if (pErr) {
        console.error('Error upserting projects:', pErr);
        return NextResponse.json({ error: 'Error saving projects', details: pErr.message }, { status: 500 });
      }
    }
    
    if (awards) {
      const { data: currentAwards, error: fetchAErr } = await supabase.from('awards').select('id');
      if (fetchAErr) {
        console.error('Error fetching current awards:', fetchAErr);
        return NextResponse.json({ error: 'Error fetching current awards', details: fetchAErr.message }, { status: 500 });
      }

      const incomingIds = awards.map((a: any) => a.id);
      const idsToDelete = currentAwards?.filter(a => !incomingIds.includes(a.id)).map(a => a.id) || [];

      if (idsToDelete.length > 0) {
        const { error: delAErr } = await supabase.from('awards').delete().in('id', idsToDelete);
        if (delAErr) {
          console.error('Error deleting awards:', delAErr);
          return NextResponse.json({ error: 'Error deleting awards', details: delAErr.message }, { status: 500 });
        }
      }
      const { error: aErr } = await supabase.from('awards').upsert(awards);
      if (aErr) {
        console.error('Error upserting awards:', aErr);
        return NextResponse.json({ error: 'Error saving awards', details: aErr.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Data synced with Supabase successfully' });
  } catch (error: any) {
    console.error('Supabase POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
