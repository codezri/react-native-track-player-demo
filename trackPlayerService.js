import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
};

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: require('./assets/fluidity-100-ig-edit-4558.mp3'),
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
    },
    {
      id: '2',
      url: require('./assets/penguinmusic-modern-chillout-future-calm-12641.mp3'),
      title: 'Modern Chillout',
      artist: 'penguinmusic',
      duration: 66,
    },
    {
      id: '3',
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    }
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });
}
