import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { placeholderGroups, placeholderMusicians, type Group } from "@/lib/placeholder-data";
import { Music, MapPin, Users as UsersIcon, MessageSquare, PlusCircle, Settings, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Helper function to get group data (replace with actual data fetching)
async function getGroupData(groupId: string): Promise<Group | null> {
  return placeholderGroups.find(g => g.id === groupId) || null;
}

// Assume current user is the first placeholder musician for admin/member check
const currentUserId = placeholderMusicians[0].id; 
// In a real app, group members would be fetched. For now, mock one group admin.
const mockGroupAdminId = placeholderMusicians[0].id;

export default async function GroupPage({ params }: { params: { groupId: string } }) {
  const group = await getGroupData(params.groupId);

  if (!group) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Group Not Found</h1>
        <p className="text-muted-foreground">Sorry, we couldn&apos;t find this group.</p>
        <Button asChild className="mt-4">
          <Link href="/groups">Back to Groups</Link>
        </Button>
      </div>
    );
  }

  const isUserAdmin = mockGroupAdminId === currentUserId; // Simplified check

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64">
          <Image src={group.image} alt={`${group.name} banner`} layout="fill" objectFit="cover" data-ai-hint="band photo stage" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold font-headline text-white shadow-lg">{group.name}</h1>
            <p className="text-primary-foreground/80 flex items-center gap-2 mt-1">
              <Music className="h-5 w-5" /> {group.genre}
            </p>
          </div>
        </div>
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-foreground">{group.description}</p>
                {isUserAdmin ? (
                     <Button variant="outline" asChild>
                        <Link href={`/groups/${group.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Group
                        </Link>
                    </Button>
                ) : (
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Join Group
                    </Button>
                )}
            </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Group Feed / Updates</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for group feed/posts */}
              <p className="text-muted-foreground">No updates yet. Start a discussion or share some audio!</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline">Post Update</Button>
                <Button>Share Audio</Button>
              </div>
            </CardContent>
          </Card>

          {group.lookingFor && group.lookingFor.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">We&apos;re Looking For</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {group.lookingFor.map(role => (
                  <span key={role} className="px-3 py-1 text-sm rounded-full bg-accent text-accent-foreground">{role}</span>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><UsersIcon className="h-5 w-5 text-primary" /> Members ({group.membersCount})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Placeholder for members list */}
              {placeholderMusicians.slice(0, group.membersCount > 4 ? 4 : group.membersCount).map(member => (
                <Link href={`/profile/${member.id}`} key={member.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.profileImage} alt={member.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{member.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.skills.slice(0,2).join(', ')}</p>
                  </div>
                </Link>
              ))}
              {group.membersCount > 4 && <Button variant="link" size="sm" className="w-full">View all members</Button>}
              {isUserAdmin && (
                <Button variant="outline" className="w-full mt-2">
                    <Settings className="mr-2 h-4 w-4" /> Manage Members
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Group Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href={`/messages/group/${group.id}`}>Open Chat</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
