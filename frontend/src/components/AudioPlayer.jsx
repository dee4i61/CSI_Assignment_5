import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setCurrentTrackIndex,
  setCurrentTrack,
} from "../redux/slice/playerSlice";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, volume, currentTrackIndex } = useSelector(
    (state) => state.player
  );
  const allSongs = useSelector((state) => state.songs.songs);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error);
            dispatch(setIsPlaying(false));
          });
        }
      }
    }
  }, [currentTrack, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error);
            dispatch(setIsPlaying(false));
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, dispatch]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    dispatch(setIsPlaying(false));
    dispatch(setCurrentTime(0));

    // Auto-play next song
    if (allSongs.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % allSongs.length;
      const nextTrack = allSongs[nextIndex];
      if (nextTrack) {
        dispatch(setCurrentTrackIndex(nextIndex));
        dispatch(setCurrentTrack(nextTrack)); // Add this line to update currentTrack
      }
    }
  };

  // Expose audioRef for external control
  useEffect(() => {
    if (window) {
      window.audioPlayerRef = audioRef;
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      onPlay={() => dispatch(setIsPlaying(true))}
      onPause={() => dispatch(setIsPlaying(false))}
      preload="metadata"
    />
  );
};

export default AudioPlayer;
