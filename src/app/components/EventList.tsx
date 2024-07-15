import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('events').select('*');
        setIsLoading(false);
        if (error) {
            console.error('Error fetching events:', error);
        } else {
            console.log('Fetched events:', data);
            setEvents(data as Event[]);
        }
    };

    return (
        <div className="font-mono grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
                <p>Loading...</p>
            ) : events.length === 0 ? (
                <p>Событий не найдено</p>
            ) : (
                events.map((event) => (
                    <div key={event.id} className="relative overflow-hidden rounded-lg shadow-lg group">
                        <Link href={`/event-list/${event.id}`} passHref className="absolute inset-0 z-10"></Link>
                        <Image
                            src="/images/placeholder.png"
                            alt="Event Image"
                            width={400}
                            height={400}
                            className="object-cover w-full h-64 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{event.title}</h2>
                            <p className="text-sm text-gray-500">{event.date}</p>
                            <p className="text-sm text-gray-500">{event.location}</p>
                            <Link href={`/event-list/${event.id}`} passHref>
                                Посмотреть
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default EventList;
