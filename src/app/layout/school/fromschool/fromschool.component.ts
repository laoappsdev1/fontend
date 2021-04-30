import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EMethod } from 'src/app/model/model';
import { ISchools } from 'src/app/model/school.model';
import { LocaionService } from 'src/service/locaion.service';
import { LocaldataService } from 'src/service/localdata.service';
import { SchoolService } from 'src/service/school.service';

@Component({
  selector: 'app-fromschool',
  templateUrl: './fromschool.component.html',
  styleUrls: ['./fromschool.component.css']
})
export class FromschoolComponent implements OnInit,OnDestroy {
  
  public id:number;
  public uuid:number;
  public superadmin_id:number;
  public name:string;
  public username:string;
  public password:string;
  public status:string;
  public tel:string;
  public email:string;
  public address:string;
  public description:string;
  public image: File = null;
  public subs: Array<Subscription> = [];;

    imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;

  constructor(
    public dialogRef: MatDialogRef<FromschoolComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public inputData: ISchools,
    public schoolservice: SchoolService,
    public localdata:LocaldataService,
    public dialog: MatDialog
  ) { }

  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    })
  }

  ngOnInit() {
    this.checkCommand();     
    this.subs.push(
      this.schoolservice.schoolUpdaterSource.asObservable().subscribe(r => {
        try {   
          if (!r) return;
          this.username=r[0].username;
          this.password=r[0].password;
          this.status=r[0].status;
          this.id = r[0].id;
        } catch (error) {
          console.log(error);
        }
      }, e => {
        console.error(e);
      })
    );
  }

  


  checkCommand() {
    switch (this.inputData.method) {
      case EMethod.create:
        {
          this.name='';
          this.username ='';
          this.password ='';
         }
        break;
      case EMethod.view:
        { 
          this.viewSchool();
        }
        break;
      case EMethod.update:
        { 
          this.viewSchool();
        }
        break;
    
      default:
        break;
    }
  }


  viewSchool() {
    const school: ISchools = {} as ISchools;
    school.id = this.inputData.id; 
    this.schoolservice.view_school(school); 
  }

  save(){
    console.log("update: ",this.inputData.method);
    switch (this.inputData.method) {
      case EMethod.create:
        {
          this.createProvince();
         }
        break;
      case EMethod.update:
        { 
          this.updateProvince();
        }
        break;
    
      default:
        break;
    }
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
        //     return false;
        // }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        this.image=fileInput.target.files[0];
    }
}
  createProvince() {
    const school: ISchools = {} as ISchools;
    school.superadmin_id=this.localdata.get_userid();
    school.name=this.name;
    school.username=this.username;
    school.password=this.password;
    school.status=this.status;
    school.tel=this.tel;
    school.email=this.email;
    school.image=this.image;
    school.address=this.address;
    school.description=this.description;
    this.schoolservice.create_school(school);
    this.dialogRef.close('parammeter here');
  }

  updateProvince() {  
    const school: ISchools = {} as ISchools;
    school.id=this.id;
    school.superadmin_id=this.localdata.get_token();
    school.name=this.name;
    school.username=this.username;
    school.password=this.password;
    school.status=this.status;
    school.tel=this.tel;
    school.email=this.email;
    school.image=this.image;
    school.address=this.address;
    school.description=this.description;
console.log("log school: ",school);

    // this.schoolservice.update_school(school);
    this.dialogRef.close('parammeter here');
  }
  close() {
    this.dialogRef.close('parammeter here');
  }

}
