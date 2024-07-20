import React, { useRef, useState } from 'react';
import Modal from 'react-modal';

export default function ShowStoryModal({ addStoryModal, setAddStoryModal }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const imageRef = useRef();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleUpload = async () => {
    const imageFile = imageRef.current.files[0];
    const formData = new FormData();
    formData.append('storyImage', imageFile);

    try {
      const response = await fetch('api/stories/createStory', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload story');
      }

      const data = await response.json();
      console.log('Story uploaded:', data);
      setAddStoryModal(false);
      setPhotoUrl('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal
      isOpen={addStoryModal}
      ariaHideApp={false}
      className="grid justify-center mt-[15%]"
      contentLabel="Create Story"
    >
      <div className="bg-zinc-200 w-[300px] sm:w-[400px] h-[200px] grid p-4">
        <h4 className="text-[20px] mb-4">Create a story</h4>
        <div className="mb-4">
          <input type="file" name="storyImage" ref={imageRef} onChange={handleImageChange} />
        </div>
        <button onClick={handleUpload} className="bg-brand text-white p-2 rounded">
          Upload Story
        </button>
      </div>
      <button
        className="w-[50px] h-[50px] text-[25px] text-black absolute right-4 top-4"
        onClick={() => setAddStoryModal(false)}
      >
        X
      </button>
    </Modal>
  );
}
