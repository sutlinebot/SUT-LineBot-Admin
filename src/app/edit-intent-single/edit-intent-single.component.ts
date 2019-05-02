import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogflowService } from '../shared/api/dialogflow.service';

@Component({
  selector: 'app-edit-intent-single',
  templateUrl: './edit-intent-single.component.html',
  styleUrls: ['./edit-intent-single.component.css']
})
export class EditIntentSingleComponent implements OnInit {

  id;
  detailIntent = {
    displayName:"",
    messages: [
      {
        text: {text:[]}
      }
    ],
    trainingPhrases: [
      {
        parts: [
          {
            text: ""
          }
        ]
      }
    ]
  };
  constructor(private route: ActivatedRoute, private myapi: DialogflowService) { }

  ngOnInit() {
    console.log(this.detailIntent);

    this.route.queryParams.subscribe(params => {
      this.id = JSON.parse(params["data"]);
    });
    console.log(this.id);

    this.getDetail()

  }

  getDetail() {
    this.myapi.getDetailIntent(this.id[1]).subscribe(
      (data: any) => {
        console.log("GET Request is successful ", data);
        this.detailIntent = data;
      },
      error => {
        console.log("Error", error);
        //alert("ผิดพลาด " + error)
      }
    );
  }

  onClickSubmit(body) {
    console.log(body);
    this.detailIntent.displayName = body.indent_name;
    console.log();
    
    this.detailIntent.trainingPhrases.map(
      (cur, index, arr) => {
        cur.parts = [{text: eval('body.indent_training'+index)}]
    })

    this.detailIntent.messages[0].text.text.map(
      (cur, index, arr) => {
        arr[index] = eval('body.indent_response'+index)
    })
    
    
    
    console.log(this.detailIntent);


      this.myapi.patchIntent(this.id[1], this.detailIntent).subscribe(
      data => {
        console.log("PATCH is successful ", data);
      },
      error => {
        console.log("Error", error);
        //alert("ผิดพลาด " + error)
      }
    ) 
    
  }

}