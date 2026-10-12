import { getVideos } from '@/lib/data';
import CreatorsView from '@/components/creators/CreatorsView';

export const revalidate = 60;

export default async function CreatorsPage() {
  const videos = await getVideos();

  return (
    <div className="w-full bg-black min-h-screen">
      <CreatorsView initialVideos={videos} />
    </div>
  );
}
