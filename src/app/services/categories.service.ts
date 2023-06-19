import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private angFireStore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  saveData(data) {
    //Use the angFireStore service to first create a collection in the DB then add the categoryData
    //Then handle the callback - .then.catch
    this.angFireStore
      .collection('categories')
      .add(data)
      .then((collectionDoc) => {
        console.log(collectionDoc);
        this.toastr.success('Category Added Successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.angFireStore
      .collection('categories')
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

  updateData(id, editData) {
    this.angFireStore
      .doc(`categories/${id}`)
      .update(editData)
      .then((collectionDoc) => {
        // console.log(collectionDoc);
        this.toastr.success('Category Updated Successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteData(id) {
    this.angFireStore
      .doc(`categories/${id}`)
      .delete()
      .then((collectionDoc) => {
        // console.log(collectionDoc);
        this.toastr.success('Category Deleted Successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
