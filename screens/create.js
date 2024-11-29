import React, { useState } from 'react';
import { View, Text, Image, Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Formfield from 'components/Formfield';
import CustomButton from 'components/CustomButton';
import { icons } from 'constants'; // Ensure icons is defined correctly
import { router } from 'expo-router';
import { createVideo } from 'lib/appwrite';
import { useGlobalContext } from 'context/GlobalProvider';

const Create = () => {
  const {user}=useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === 'image'
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        if (selectType === 'image') {
          setForm({ ...form, thumbnail: result.assets[0] });
        } else if (selectType === 'video') {
          setForm({ ...form, video: result.assets[0] });
        }
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error", "An error occurred while picking the file.");
    }
  };
  

  const submit = async () => {
    if(!form.prompt || !form.title ||!form.thumbnail || !form.video){
      return Alert.alert('Please fill in all the fields')
    }
    setUploading(true)
    try {
      await createVideo({
        ...form,userId:user.$id
      })
      Alert.alert('Success','Post uploaded succcessfully')
      router.push('/AppHome')
    } catch (error) {
      Alert.alert('Error',error.message)
      
    }finally{
      setForm({
      title: "",
      video: null,
      thumbnail: null,
      prompt: "",
      })
      setUploading(false);

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Upload Video</Text>

        {/* Video Title */}
        <Formfield
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={styles.formField}
        />

        {/* Upload Video Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")} style={styles.mediaContainer}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={styles.video}
                useNativeControls
                resizeMode="cover"
                isLooping
              />
            ) : (
              <View style={styles.placeholder}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <Text style={styles.placeholderText}>Choose a video file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Upload Thumbnail Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")} style={styles.mediaContainer}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <Text style={styles.placeholderText}>Choose an image file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* AI Prompt */}
        <Formfield
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt for your video..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={styles.formField}
        />

        {/* Submit Button */}
        <CustomButton
          title="Submit & Publish"
          handleOnPress={submit}
          containerStyles={styles.submitButton}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c', // Primary background color
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  formField: {
    marginTop: 16,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  mediaContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#2d3748',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#a0aec0',
    fontSize: 14,
    marginTop: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  submitButton: {
    marginTop: 32,
  },
});

export default Create;
