import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  async uploadImage(file: File): Promise<string> {
    const path = `images/${file.name}`;
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  async createBlog(title: string, content: string, imageUrl: string) {
    const blogRef = collection(this.firestore, 'blogs');
    await addDoc(blogRef, { title, content, imageUrl, createdAt: new Date() });
  }
}
