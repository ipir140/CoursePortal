import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.fetch_baskets();
  }

  addBasket(stream: string, basket_id: string, basket_name: string) {
    console.log('stream',stream);
    console.log('id',basket_id);
    console.log('name',basket_name);
    this._util.create_basket(stream,basket_id,basket_name).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  addCourse(basket_id: string, course_id: string, course_name: string) {
    this._util.add_course(basket_id,course_id,course_name).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  removeCourse(basket_id: string, course_id: string) {
    this._util.delete_course(basket_id,course_id).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  deleteBasket(basket_id: string) {
    this._util.delete_basket(basket_id).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  public baskets = [
    {id: "ML", name: "Machine Learning", courses: ["Deep Learning", "Neural Network", "Pattern Recognization"]},
    {id: "NS", name: "Network Security", courses: ["Cryptography", "Blockchain"]}
  ]
}
