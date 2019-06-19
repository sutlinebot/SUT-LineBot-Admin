import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogflowService } from '../../shared/api/dialogflow.service';

interface Intent {
  displayName: string;
  messages: [
    {
      text?: {
        text: [""]
      }
      image?: {
        imageUri: any;
      }
      payload?: any;
    }
  ]
  trainingPhrases: [
    {
      parts: [
        {
          text: ""
        }
      ]
    }
  ];
}

@Component({
  selector: 'app-edit-intent-single',
  templateUrl: './edit-intent-single.component.html',
  styleUrls: ['./edit-intent-single.component.css']
})



export class EditIntentSingleComponent implements OnInit {

  id;
  detailIntent: Intent;
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

        this.pettyJson()

        if (this.detailIntent.trainingPhrases == null && this.detailIntent.messages == null) {
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
              text: { text: [""] }
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
        cur.parts = [
          { text: eval('body.indent_training' + index) }
        ]
      })


    this.detailIntent.messages.map(
      (cur, index, arr) => {
        if (cur.image != null)
          cur.image.imageUri = eval('body.indent_response_image' + index)

        if (cur.text != null)
          cur.text.text.map(
            (_cur, index2, arr2) => {
              arr2[index2] = eval('body.indent_response' + index + '_' + index2)
            }
          )

        if (cur.payload != null) {
          cur.payload = JSON.parse(eval('body.indent_response_payload' + index));
        }

      })

    console.log(this.detailIntent);


    this.myapi.patchIntent(this.id[1], this.detailIntent).subscribe(
      data => {
        this.pettyJson()
        alert("สำเร็จ");
        console.log("PATCH is successful ", data);

      },
      error => {
        console.log("Error", error);
        alert("ไม่สำเร็จ");
        this.pettyJson()
        //alert("ผิดพลาด " + error)
      }
    )

  }

  addTraining() {
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
  delTraining(index) {
    this.detailIntent.trainingPhrases.splice(index, 1);
  }

  addText(index) {
    this.detailIntent.messages[index].text.text.push("")
    console.log(this.detailIntent);

  }

  delText(index, text) {
    this.detailIntent.messages[index].text.text.splice(text, 1);
  }



  selectType(res) {
    return Object.getOwnPropertyNames(res)[0]
  }

  addRes(type) {
    console.log(type);
    if (type == 'text') {
      this.detailIntent.messages.push(
        {
          text: {
            text: [""]
          }
        }
      )
    }

    else if (type == 'img') {
      this.detailIntent.messages.push(
        {
          image: {
            imageUri: ""
          }
        }
      )
    }

    else if (type == 'custom') {
      this.detailIntent.messages.push(
        {
          payload: ""
        }
      )
    }
  }

  delRes(index) {
    console.log(index);
    this.detailIntent.messages.splice(index, 1);
  }

  pettyJson() {
    this.detailIntent.messages.map(
      (cur, index, arr) => {
        if (cur.payload != null) {
          console.log(arr[index].payload);
          arr[index].payload = JSON.stringify(arr[index].payload, undefined, 4);
          console.log(arr[index].payload);

        }
      }
    )
  }

}