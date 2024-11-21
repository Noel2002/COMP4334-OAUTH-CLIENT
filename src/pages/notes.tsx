// pages/notes.js
import React from "react";

const NoteCard = ({ title, content }: {title: string, content: string}) => {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 shadow-md rounded-lg p-6 border border-purple-200 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800">DIARY.</h1>
        <button className="text-purple-600 hover:text-purple-800 font-medium underline">
          Logout
        </button>
      </header>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-purple-700">Notes</h2>
          <button className="px-5 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition">
            Create Note
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