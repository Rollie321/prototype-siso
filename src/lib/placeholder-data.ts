export type Musician = {
  id: string;
  name: string;
  location: string;
  genres: string[];
  skills: string[];
  profileImage: string;
  bio: string;
  influences: string[];
  experience: string;
};

export const placeholderMusicians: Musician[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    location: 'New York, NY',
    genres: ['Indie Rock', 'Alternative'],
    skills: ['Guitar', 'Vocals', 'Songwriting'],
    profileImage: 'https://placehold.co/150x150.png?text=AR',
    bio: 'Passionate guitarist and vocalist looking for a drummer and bassist to form an indie rock band. Influenced by Arctic Monkeys, The Strokes, and Radiohead.',
    influences: ['Arctic Monkeys', 'The Strokes', 'Radiohead'],
    experience: '5+ years playing guitar, 2 years performing live.',
  },
  {
    id: '2',
    name: 'Billie Jean',
    location: 'Los Angeles, CA',
    genres: ['Pop', 'R&B', 'Electronic'],
    skills: ['Vocals', 'Keyboard', 'Music Production'],
    profileImage: 'https://placehold.co/150x150.png?text=BJ',
    bio: 'Versatile vocalist and producer seeking collaborators for an electronic pop project. Love creating catchy melodies and atmospheric soundscapes.',
    influences: ['Billie Eilish', 'FKA Twigs', 'James Blake'],
    experience: 'Professional vocalist for 3 years, proficient in Ableton Live.',
  },
  {
    id: '3',
    name: 'Carlos Santana Jr.',
    location: 'Austin, TX',
    genres: ['Blues', 'Rock', 'Jazz Fusion'],
    skills: ['Lead Guitar', 'Improvisation'],
    profileImage: 'https://placehold.co/150x150.png?text=CS',
    bio: 'Experienced lead guitarist specializing in blues and rock. Looking to jam and potentially join a band that values improvisation and soulful playing.',
    influences: ['Stevie Ray Vaughan', 'Jimi Hendrix', 'John Scofield'],
    experience: '10+ years of gigging and session work.',
  },
  {
    id: '4',
    name: 'Diana Krall',
    location: 'Chicago, IL',
    genres: ['Jazz', 'Swing', 'Vocal Jazz'],
    skills: ['Piano', 'Vocals'],
    profileImage: 'https://placehold.co/150x150.png?text=DK',
    bio: 'Jazz pianist and vocalist looking for a trio (bass, drums) for regular gigs and recordings. Classic jazz standards and original compositions.',
    influences: ['Diana Krall', 'Ella Fitzgerald', 'Bill Evans'],
    experience: 'Classically trained, performing jazz for 8 years.',
  },
];

export type Group = {
  id: string;
  name: string;
  genre: string;
  membersCount: number;
  description: string;
  image: string;
  lookingFor?: string[];
};

export const placeholderGroups: Group[] = [
  {
    id: 'g1',
    name: 'The Cosmic Keys',
    genre: 'Psychedelic Rock',
    membersCount: 3,
    description: 'Exploring the outer reaches of sound. We need a creative drummer with a unique style.',
    image: 'https://placehold.co/300x200.png?text=CK',
    lookingFor: ['Drummer', 'Keyboardist (Synth)'],
  },
  {
    id: 'g2',
    name: 'Urban Echoes',
    genre: 'Hip Hop / Neo-Soul',
    membersCount: 4,
    description: 'Laying down smooth grooves and conscious lyrics. Looking for a female vocalist for hooks and harmonies.',
    image: 'https://placehold.co/300x200.png?text=UE',
    lookingFor: ['Female Vocalist'],
  },
  {
    id: 'g3',
    name: 'Steel & Strings',
    genre: 'Folk / Americana',
    membersCount: 2,
    description: 'Acoustic duo writing heartfelt songs. Seeking a fiddle or mandolin player to add texture.',
    image: 'https://placehold.co/300x200.png?text=SS',
    lookingFor: ['Fiddle Player', 'Mandolin Player'],
  },
];

export type AudioPost = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  artistImage: string;
  audioUrl: string; // Placeholder
  coverImage: string;
  description: string;
  genre: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
};

export const placeholderAudioPosts: AudioPost[] = [
  {
    id: 'a1',
    title: 'Midnight Drive (Demo)',
    artist: 'Alex Rivera',
    artistId: '1',
    artistImage: 'https://placehold.co/50x50.png?text=AR',
    audioUrl: '#',
    coverImage: 'https://placehold.co/400x250.png?text=MD',
    description: 'Quick demo of a new song idea. Looking for feedback on the vibe and structure. Needs drums!',
    genre: 'Indie Rock',
    timestamp: '3 hours ago',
    likes: 15,
    commentsCount: 4,
  },
  {
    id: 'a2',
    title: 'Ethereal Dreams (Snippet)',
    artist: 'Billie Jean',
    artistId: '2',
    artistImage: 'https://placehold.co/50x50.png?text=BJ',
    audioUrl: '#',
    coverImage: 'https://placehold.co/400x250.png?text=ED',
    description: 'Working on a new atmospheric track. What do you think of this synth melody?',
    genre: 'Electronic Pop',
    timestamp: '1 day ago',
    likes: 42,
    commentsCount: 11,
  },
  {
    id: 'a3',
    title: 'Blues Riff in E',
    artist: 'Carlos Santana Jr.',
    artistId: '3',
    artistImage: 'https://placehold.co/50x50.png?text=CS',
    audioUrl: '#',
    coverImage: 'https://placehold.co/400x250.png?text=BR',
    description: 'Just a quick improv I recorded. Feeling the blues today.',
    genre: 'Blues',
    timestamp: '5 days ago',
    likes: 78,
    commentsCount: 23,
  },
];

export type MessageThread = {
  id: string;
  contactName: string;
  contactImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

export const placeholderMessageThreads: MessageThread[] = [
  {
    id: 'm1',
    contactName: 'Alex Rivera',
    contactImage: 'https://placehold.co/50x50.png?text=AR',
    lastMessage: 'Hey, loved your new track! We should jam sometime.',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: 'm2',
    contactName: 'The Cosmic Keys (Group)',
    contactImage: 'https://placehold.co/50x50.png?text=CK',
    lastMessage: 'Our next rehearsal is on Friday. Can you make it?',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'm3',
    contactName: 'Diana Krall',
    contactImage: 'https://placehold.co/50x50.png?text=DK',
    lastMessage: 'Thanks for the connection request!',
    timestamp: '2 days ago',
    unreadCount: 0,
  },
];

export type Message = {
  id: string;
  senderId: string; // 'currentUser' or other user's ID
  text: string;
  timestamp: string;
};

export const placeholderMessages: Message[] = [
  { id: 'msg1', senderId: 'Alex Rivera', text: 'Hey, loved your new track! We should jam sometime.', timestamp: '10:30 AM' },
  { id: 'msg2', senderId: 'currentUser', text: 'Thanks Alex! Yeah, that would be cool. What kind of stuff are you working on?', timestamp: '10:32 AM' },
  { id: 'msg3', senderId: 'Alex Rivera', text: 'Mainly indie rock, a bit of alternative. You?', timestamp: '10:33 AM' },
];
