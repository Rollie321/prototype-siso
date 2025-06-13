import { Button } from "@/components/ui/button";
import { GroupCard } from "@/components/groups/group-card";
import { placeholderGroups } from "@/lib/placeholder-data";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-headline font-semibold">Groups & Bands</h1>
        <Button asChild>
          <Link href="/groups/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Group
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Search groups by name, genre..."
            className="w-full rounded-lg bg-card pl-8"
        />
      </div>
      
      {placeholderGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No Groups Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Be the first to create one or check back later!
          </p>
          <Button className="mt-6" asChild>
             <Link href="/groups/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Your Group
            </Link>
          </Button>
        </div>
      )}
      
      {/* Placeholder for pagination */}
      {placeholderGroups.length > 9 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      )}
    </div>
  );
}
