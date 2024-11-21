// pages/notes.js
import React from "react";

const NoteCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default function NotesPage() {
  const notes = [
    {
      title: "FUCKED UP DAY",
      content: `Today has been one of those days that I wish I could hit the rewind button on. Everything seemed to go wrong from the moment I woke up. The weather matched my mood perfectly - gloomy and cold.
First, I overslept and missed an important meeting at work. The rest of the day felt like a domino effect of misfortunes - spilling coffee on my favorite shirt, getting caught in a sudden downpour without an umbrella, and to top it off, finding out that my laptop crashed, taking all my work with it.
As I sit here reflecting on this fucked up day, I remind myself that tomorrow is a fresh start. Despite the chaos and frustration, there were moments of resilience that got me through. Here's to hoping for a better tomorrow.`,
    },
    {
      title: "FUCKED UP DAY",
      content: `Today has been one of those days that I wish I could hit the rewind button on. Everything seemed to go wrong from the moment I woke up. The weather matched my mood perfectly - gloomy and cold.
First, I overslept and missed an important meeting at work. The rest of the day felt like a domino effect of misfortunes - spilling coffee on my favorite shirt, getting caught in a sudden downpour without an umbrella, and to top it off, finding out that my laptop crashed, taking all my work with it.
As I sit here reflecting on this fucked up day, I remind myself that tomorrow is a fresh start. Despite the chaos and frustration, there were moments of resilience that got me through. Here's to hoping for a better tomorrow.`,
    },
    // Add more notes here if needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">DIARY.</h1>
        <button className="text-blue-500 hover:underline">Logout</button>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notes</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create note
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <NoteCard key={index} title={note.title} content={note.content} />
          ))}
        </div>
      </div>
    </div>
  );
}

