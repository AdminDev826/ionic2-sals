
///////////////////////////////////////////POST DATA MODEL CLASS 2017/4 MADE BY ZHANG///////////////////////////////////////
export class PostDataModel
{
  post_id:            string ;
  post_img_url : string;
  post_number:string;
  post_price:string;
  post_sticky:string;
  post_title:  string ;
  post_dt    : string ;
  post_category_id:string;
  post_profile_id:string;
  post_content:string;
  post_date:string;

  constructor(data)
  {
     this.post_id            = data["id"];
     this.post_img_url       = data["image_url"];
     this.post_number        = data["number"];
     this.post_date          = data["post_dt"];
     this.post_price         = data["price"];
     this.post_profile_id    =  data["profile_id"];
     this.post_sticky        =  data["sticky"]
     this.post_title         =  data["title"];
     this.post_content       =  data["content"];
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
