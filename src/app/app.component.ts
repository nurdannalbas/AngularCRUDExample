import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppData } from './AppData';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  data = new AppData('');
  values = '';
  item: [any];
  selectedMemberBody: ''
  url = "https://jsonplaceholder.typicode.com/posts";
  posts: [any]
  constructor(private httpClient: HttpClient) { }

  rowClickHandler(member: any): void {
    this.selectedMemberBody = member.body
  }

  ngOnInit(): void {
    //get JSON value
    this.httpClient.get(this.url).subscribe((res) => {
      this.item = <any>res
    });
  }
  //event bind example
  onKey(event: any) { // without type info
    this.values = event.target.value;
  }

  //post request
  createPost(input: HTMLInputElement, input2: HTMLInputElement) {
    const post = { title: input.value, title2: input2.value }
    console.log(post)
    input.value = '';
    input2.value = '';

    this.httpClient.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        console.log("posta girdim" + post)
        post['id'] = response['id'];
        this.item.splice(0, 0, post);
      })
    console.log("posta giremedim")

  }

  //put request
  updatePost(post) {
    post.title = this.data.area1;
    console.log("metot çalıştı" +post.title)
    this.httpClient.put(this.url + '/' + post.id, JSON.stringify(post))
      .subscribe(response => {
        console.log("put metoduna girdim")
        console.log(response);
      });
  }

  //delete request
  deletePost(post) {
    this.httpClient.delete(this.url + '/' + post.id)
      .subscribe(response => {
        console.log(response);
        let index = this.item.indexOf(post);
        this.item.splice(index, 1);
      })
      console.log("silme işlemi başarılı")
  }

} 