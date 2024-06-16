import { View, Text } from 'react-native'
import React from 'react'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';

interface VideoPlayerProps {
    videoUrl: string;
    styles: string;
    setPlaying: (playing: boolean) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, styles, setPlaying }) => {
    // const url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';



    return (
        <Video
            source={{ uri: videoUrl }}
            resizeMode={ResizeMode.CONTAIN}
            className={`${styles} mt-3`}
            shouldPlay
            useNativeControls
            onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                if ('didJustFinish' in status && status.didJustFinish) {
                    setPlaying(false);
                }
            }}

            onError={(e) => console.log(e)}

        />
    )
}

export default VideoPlayer