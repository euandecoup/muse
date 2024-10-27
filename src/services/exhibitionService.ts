import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Artwork } from "../types/artwork";

export interface Exhibition {
  id?: string;
  userId: string;
  title: string;
  description: string;
  artworks: Artwork[];
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const saveExhibition = async (
  userId: string,
  title: string,
  description: string,
  artworks: Artwork[],
  isPublic: boolean = false
): Promise<string> => {
  try {
    const exhibitionData: Omit<Exhibition, "id"> = {
      userId,
      title,
      description,
      artworks,
      isPublic,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "exhibitions"), exhibitionData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving exhibition:", error);
    throw new Error("Failed to save exhibition");
  }
};

export const updateExhibition = async (
  exhibitionId: string,
  updates: Partial<Exhibition>
): Promise<void> => {
  try {
    const exhibitionRef = doc(db, "exhibitions", exhibitionId);
    await updateDoc(exhibitionRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating exhibition:", error);
    throw new Error("Failed to update exhibition");
  }
};

export const deleteExhibition = async (exhibitionId: string): Promise<void> => {
  try {
    const exhibitionRef = doc(db, "exhibitions", exhibitionId);
    await deleteDoc(exhibitionRef);
  } catch (error) {
    console.error("Error deleting exhibition:", error);
    throw new Error("Failed to delete exhibition");
  }
};

export const getUserExhibitions = async (
  userId: string
): Promise<Exhibition[]> => {
  try {
    const exhibitionsQuery = query(
      collection(db, "exhibitions"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(exhibitionsQuery);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Exhibition)
    );
  } catch (error) {
    console.error("Error fetching user exhibitions:", error);
    throw new Error("Failed to fetch exhibitions");
  }
};

export const getExhibition = async (
  exhibitionId: string
): Promise<Exhibition | null> => {
  try {
    const exhibitionRef = doc(db, "exhibitions", exhibitionId);
    const exhibitionDoc = await getDoc(exhibitionRef);

    if (!exhibitionDoc.exists()) {
      return null;
    }

    return {
      id: exhibitionDoc.id,
      ...exhibitionDoc.data(),
    } as Exhibition;
  } catch (error) {
    console.error("Error fetching exhibition:", error);
    throw new Error("Failed to fetch exhibition");
  }
};
