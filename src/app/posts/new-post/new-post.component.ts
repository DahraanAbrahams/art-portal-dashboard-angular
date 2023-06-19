import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.jpg';
  selectedImg: any;
  categoryArray: Array<any>;

  postForm: FormGroup;
  post: any

  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {

    // this.route.queryParams.subscribe(val => { 
    //   //we pass this loadData to the router to get the data based on the id in query params
    //   this.postService.loadSingleData(val['id']).subscribe(post => { 
    //     console.log(post)
    //   })
    // })

    this.route.queryParams.subscribe(val => { 
      this.postService.loadSingleData(val['id']).subscribe(post => { 
        // console.log(post)
        this.post = post
      })
    })

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      summary: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      // console.log(val);
      this.categoryArray = val;
    });
  }

  //We need to create a getter method in order to use the form builder validators we created
  get fc() {
    return this.postForm.controls;
  }

  onTitledChanged(titleChange) {
    const title = titleChange.target.value;
    this.permalink = title.replace(/\s/g, '-');

    // console.log(this.permalink);
  }

  showPreview(imgPreview) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };

    reader.readAsDataURL(imgPreview.target.files[0]);
    this.selectedImg = imgPreview.target.files[0];
  }

  onSubmit() {
    let categoryDataSplit = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: categoryDataSplit[0],
        category: categoryDataSplit[1],
      },
      postImg: '',
      summary: this.postForm.value.summary,
      content: this.postForm.value.content,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.jpg';
  }
}
