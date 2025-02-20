import { getEvent } from "@/app/helpers/api";
import EventDetailClient from "@/components/event.detail";

type Props = {
  params: { slug: string };
};

export default async function EventDetailPage({ params }: Props) {
  const event = await getEvent(params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }
  console.log("INI EVENT IDDD", event.id);

  return <EventDetailClient event={event} />;
}
