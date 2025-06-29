import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Maximize2,
  List,
  Link,
  PictureInPicture,
} from "lucide-react";

export default function WhatsNewComponent() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-6xl font-bold mb-6">What's New</h1>
          <p className="text-xl text-gray-300 mb-12">
            The latest releases from artists, podcasts, and shows you follow.
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-1 mb-16">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium">
              Music
            </button>
            <button className="text-gray-400 px-6 py-3 rounded-full font-medium hover:text-white">
              Podcast & Shows
            </button>
          </div>

          {/* Empty State */}
          <div className="mb-8">
            <h2 className="text-4xl font-semibold mb-6">
              We don't have any updates for you yet
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              When there's news, we'll post it here. Follow your favorite
              artists and podcasts to stay updated on them too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
