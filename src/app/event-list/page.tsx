'use client';
import EventList from '../components/EventList';

const Home: React.FC = () => {
  return (
    <main className='flex-1 py-8'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between mb-8 sm:flex-row">
          <h1 className="text-3xl font-bold tracking-tight">Грядущие события</h1>
          <div className="mt-4 sm:mt-0">
            <input
              placeholder="Поиск событий..."
              className="w-full max-w-md border border-neutral-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <EventList />
      </div>
    </main>
  );
};

export default Home;
