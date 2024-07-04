// app/events/[eventId]/page.tsx

import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  outputText: string;
  image_url: string;
}

interface EventPageProps {
  eventId: string;
}

async function fetchEvent(eventId: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EventPage({ params }: { params: EventPageProps }) {
  const event = await fetchEvent(params.eventId);

  if (!event) {
    return <div className="text-center text-red-600">Event not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg mb-2"><strong>Location:</strong> {event.location}</p>
          <p className="text-lg mb-2"><strong>Date:</strong> {event.date}</p>
          <p className="text-lg whitespace-pre-line">{event.outputText}</p>
        </div>
        <div className="md:w-1/2 p-4 flex justify-center items-center">
          <Image src='/images/placeholder.png' width={400} height={400} alt={event.title} className="rounded-lg shadow-lg max-w-full h-auto"/>
        </div>
      </div>
    </div>
  );
}
