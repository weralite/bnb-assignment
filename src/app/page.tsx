// app/page.tsx
import ListingGrid from "@/components/listing/ListingGrid";
import { getListings } from "@/actions/listings/getListings";

export default async function Home() {
  const listings = await getListings();

  return (
    <div className="w-full max-w-screen-1-2xl">
      <main>
        <ListingGrid listings={listings} />
      </main>
    </div>
  );
}
