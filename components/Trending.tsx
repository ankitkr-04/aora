import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';
import VideoPlayer from './VideoPlayer';
import { PostProps } from './VideoCard';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.0,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item, onClick }: { activeItem: any, item: PostProps, onClick: (id: any) => void }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  // console.log(item.video);

  return (
    <Animatable.View
      className="mr-2"
      animation={activeItem === item.$id ? zoomIn as any : zoomOut as any}
      duration={500}
    >
      {playing ? (
        <VideoPlayer videoUrl={item.video} styles='w-48 h-64 rounded-[35px] ' setPlaying={setPlaying} />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            onClick(item.$id);

            setPlaying(true)
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-48 h-64 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: any[] }) => {
  const [activeItem, setActiveItem] = useState<any>(posts[0]);



  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        horizontal
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem item={item} activeItem={activeItem} onClick={(id: any) => setActiveItem(id)} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170, y: 0 }}
      />
    </SafeAreaView>
  );
};

export default Trending;
