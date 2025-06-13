import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MusicianCard } from "@/components/musicians/musician-card";
import { placeholderMusicians } from "@/lib/placeholder-data";
import { Filter, ListFilter, SearchIcon } from "lucide-react";

// Mock data for filters - in a real app, these would come from DB or be predefined
const genres = ["All", "Indie Rock", "Alternative", "Pop", "R&B", "Electronic", "Blues", "Jazz", "Folk", "Hip Hop"];
const skills = ["All", "Guitar", "Vocals", "Songwriting", "Drums", "Bass", "Keyboard", "Music Production", "Piano"];
const locations = ["All", "New York, NY", "Los Angeles, CA", "Austin, TX", "Chicago, IL", "Nashville, TN"];

export default function SearchPage() {
  // For now, display all placeholder musicians.
  // In a real app, this would be filtered based on search criteria.
  const searchResults = placeholderMusicians;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-headline font-semibold">Find Musicians</h1>
        <Button variant="outline">
          <ListFilter className="mr-2 h-4 w-4" /> Advanced Filters
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label htmlFor="keyword" className="text-sm font-medium">Keyword</label>
              <Input id="keyword" placeholder="e.g., Singer, Rock band..." />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="genre" className="text-sm font-medium">Genre</label>
              <Select>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre.toLowerCase().replace(' ', '-')}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="skill" className="text-sm font-medium">Skill</label>
              <Select>
                <SelectTrigger id="skill">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map(skill => (
                    <SelectItem key={skill} value={skill.toLowerCase().replace(' ', '-')}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto">
              <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
           <div className="space-y-1.5">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Select>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location.toLowerCase().replace(/[\s,]+/g, '-')}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Search Results ({searchResults.length})</h2>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map(musician => (
              <MusicianCard key={musician.id} musician={musician} />
            ))}
          </div>
        ) : (
          <Card className="text-center p-10">
            <p className="text-muted-foreground">No musicians found matching your criteria. Try broadening your search.</p>
          </Card>
        )}
      </div>
      
      {/* Placeholder for pagination */}
      {searchResults.length > 10 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      )}
    </div>
  );
}
