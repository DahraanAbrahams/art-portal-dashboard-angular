import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Catergory } from '../models/catergory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<any>;
  formCategory: string;
  formTitle: string = 'Add';
  formSubTitle: string = 'Add New Category';
  categoryId: string;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(formData) {
    let categoryData: Catergory = {
      category: formData.value.category,
    };

    if (this.formTitle == 'Add') {
      this.categoryService.saveData(categoryData);

      formData.reset();
      // //Use the angFireStore service to first create a collection in the DB then add the categoryData
      // //Then handle the callback - .then.catch
      // this.angFireStore
      //   .collection('categories')
      //   .add(categoryData)
      //   .then((collectionDoc) => {
      //     console.log(collectionDoc);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } else if(this.formTitle == 'Edit'){ 
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formTitle = 'Add';
    }

    
  }

  onEdit(category, id) {
    //Using 2way binding, we set formCategory to the category being passed into the field.
    this.formCategory = category;
    this.formTitle = 'Edit';
    this.formSubTitle = 'Update Category';
    this.categoryId = id;
  }

  onDelete(id) { 
    this.categoryService.deleteData(id);
  }


}
