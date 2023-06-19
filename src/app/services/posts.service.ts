import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private angFireStorage: AngularFireStorage,
    private angFireStore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedImage, postData) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.angFireStorage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully!');
      this.angFireStorage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImg = URL;
          console.log(postData);

          this.saveData(postData);
        });
    });
  }

  saveData(postData) {
    this.angFireStore
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data Inserted Successfully!');
        this.router.navigate(['/posts'])
      });
  }

  loadData() {
    return this.angFireStore
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;

            return { id, data };
          });
        })
      );
  }

  loadSingleData(id) { 
    return this.angFireStore.collection('posts').doc(id).valueChanges();
  }

}
