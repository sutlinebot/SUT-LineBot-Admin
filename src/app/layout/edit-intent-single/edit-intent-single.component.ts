import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogflowService } from '../../shared/api/dialogflow.service';

@Component({
  selector: 'app-edit-intent-single',
  templateUrl: './edit-intent-single.component.html',
  styleUrls: ['./edit-intent-single.component.css']
})
export class EditIntentSingleComponent implements OnInit {

  id;
  detailIntent
   = {
    displayName:"",
    messages: [
      {
        text: {text:[""]}
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
        if(this.detailIntent.trainingPhrases == null && this.detailIntent.messages == null){
          console.log("all null");
          
          this.detailIntent.trainingPhrases = [
            {
              parts: [
                {
                  text: ""
                }
              ]
            }
          ]

          this.detailIntent.messages = [
            {
              text: {text:[""]}
            }
          ]
          

        }
        console.log(this.detailIntent);
        
        
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
        alert("สำเร็จ");
        console.log("PATCH is successful ", data);
      },
      error => {
        console.log("Error", error);
        alert("ไม่สำเร็จ");
        //alert("ผิดพลาด " + error)
      }
    ) 
    
  }

  addTraining(){
    this.detailIntent.trainingPhrases.push(
      {
        parts: [
          {
            text: ""
          }
        ]
      }
    )
  }
  delTraining(index){
    this.detailIntent.trainingPhrases.splice(index, 1);
  }

  addText(){
    this.detailIntent.messages[0].text.text.push("")
    console.log(this.detailIntent);
    
  }

  delText(index){
    this.detailIntent.messages[0].text.text.splice(index, 1);
  }

}