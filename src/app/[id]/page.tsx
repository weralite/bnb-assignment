import { getListingById } from "@/actions/getListingById";
import ListingDetails from "@/components/listing/ListingDetails";

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListingById(params.id); 

  if (!listing) return <p>Listing not found</p>;

  return (
    <ListingDetails listing={listing} />
  );
}
