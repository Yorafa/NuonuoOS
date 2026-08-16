export type PlaylistTrack = {
  defaultName?: string;
  duration?: number;
  metaData?: {
    album?: string;
    artist?: string;
    title?: string;
  };
  url: string;
};

export const createM3uPlaylist = (tracks: PlaylistTrack[]): string => {
  const m3uPlaylist = tracks.map((track): string => {
    const trackUrl = track.url ? `\n${track.url}` : "";
    let title = track.defaultName;

    if (track.metaData?.artist) {
      if (track.metaData?.title) {
        title = `${track.metaData.artist} - ${track.metaData.title}`;
      } else if (title) {
        title = `${track.metaData.artist} - ${title}`;
      }
    } else if (track.metaData?.title) {
      title = track.metaData.title;
    }

    return trackUrl
      ? `#EXTINF:${track.duration ?? -1},${title || ""}${trackUrl}`
      : "";
  });

  return `${["#EXTM3U", ...m3uPlaylist.filter(Boolean)].join("\n")}\n`;
};

const MAX_PLAYLIST_ITEMS = 1000;

export const tracksFromPlaylist = async (
  data: string,
  extension: string,
  defaultName?: string
): Promise<PlaylistTrack[]> => {
  const { ASX, M3U, PLS } = await import("playlist-parser");
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  const parser: Record<string, typeof ASX | typeof M3U | typeof PLS> = {
    ".asx": ASX,
    ".m3u": M3U,
    ".pls": PLS,
  };
  const tracks =
    parser[extension]
      ?.parse(data)
      .filter(Boolean)
      .slice(0, MAX_PLAYLIST_ITEMS) ?? [];

  return tracks.map(({ artist = "", file = "", length = 0, title = "" }) => {
    const [parsedArtist, parsedTitle] = [artist.trim(), title.trim()];

    return {
      duration: Math.max(length, 0),
      metaData: {
        album: parsedTitle || defaultName,
        artist: parsedArtist,
        title: parsedTitle,
      },
      url: file,
    };
  });
};
