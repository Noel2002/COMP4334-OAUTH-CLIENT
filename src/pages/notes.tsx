// pages/notes.js
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { use, useEffect } from "react";

type NoteType = {
  title: string;
  content: string
}

const NoteCard = ({ title, content }: {title: string, content: string}) => {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 shadow-md rounded-lg p-6 border border-purple-200 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default function NotesPage() {
    const context = React.useContext(AuthContext);
    const [notes, setNotes] = React.useState<NoteType[]>([]);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const router = useRouter();
    console.log(context?.user);
    
//   const notes = [
//     {
//       title: "FUCKED UP DAY",
//       content: `Today has been one of those days that I wish I could hit the rewind button on. Everything seemed to go wrong from the moment I woke up. The weather matched my mood perfectly - gloomy and cold.
// First, I overslept and missed an important meeting at work. The rest of the day felt like a domino effect of misfortunes - spilling coffee on my favorite shirt, getting caught in a sudden downpour without an umbrella, and to top it off, finding out that my laptop crashed, taking all my work with it.
// As I sit here reflecting on this fucked up day, I remind myself that tomorrow is a fresh start. Despite the chaos and frustration, there were moments of resilience that got me through. Here's to hoping for a better tomorrow.`,
//     },
//     {
//       title: "FUCKED UP DAY",
//       content: `Today has been one of those days that I wish I could hit the rewind button on. Everything seemed to go wrong from the moment I woke up. The weather matched my mood perfectly - gloomy and cold.
// First, I overslept and missed an important meeting at work. The rest of the day felt like a domino effect of misfortunes - spilling coffee on my favorite shirt, getting caught in a sudden downpour without an umbrella, and to top it off, finding out that my laptop crashed, taking all my work with it.
// As I sit here reflecting on this fucked up day, I remind myself that tomorrow is a fresh start. Despite the chaos and frustration, there were moments of resilience that got me through. Here's to hoping for a better tomorrow.`,
//     },
//     // Add more notes here if needed
//   ];

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('/api/notes', {
        headers: {
          'authorization': `Bearer ${context?.token}`,
        }
      });
      const data = await res.json();
      setNotes(data || []);
    }

    if (!context?.isAuthenticated) {
      router.push('/');
    }

    fetchNotes();

  }, [context]);

  const handleSubmit = async(e: any)=>{
    e.preventDefault();
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${context?.token}`,
      },
      body: JSON.stringify({title, content})
    });

    const note = await res.json();
    setNotes([...notes, note]);
    setIsDialogOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">

      <header className="flex items-center justify-between mb-16">
        <h1 className="text-4xl font-extrabold text-purple-800">DIARY.</h1>
        <div className=" flex gap-4">
          <div className=" w-12 h-12">
            <img src={context?.user?.photo} className=" w-full h-full rounded-full object-cover" alt="profile picture" />
          </div>
          <div>
            <p className=" font-semibold">{context?.user?.username}</p>
            <button 
                onClick={context?.logout}
                className="text-purple-600 hover:text-purple-800 font-medium underline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-purple-700">Notes</h2>
          {/* <button className="px-5 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition">
            Create Note
          </button> */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-5 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition">
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Note</DialogTitle>
                <DialogDescription>
                  Make your thoughts tangible by creating a new note.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input 
                    id="title" 
                    placeholder="Enter the title here ..." 
                    className="" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
                <div className="">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea 
                    id="content" 
                    value={content}
                    placeholder="Write the content here ..." 
                    onChange={(e)=>setContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <NoteCard key={index} title={note.title} content={note.content} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}