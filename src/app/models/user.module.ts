
export class User {
  $key: string;
  userName: string;
  emailId: string;
  password: string;
  location: {
    lat: number;
    lon: number;
  };
  phoneNumber: string;
  createdOn: string;
  isAdmin: boolean;
  avatar: string;
}

export class UserDetail {
  constructor(
    //public $key?: string,
    public  firstName?: string,
    public  lastName?: string,
    public  emailId?: string,
    public  address?: string,
    public  city?: string,

    public  phoneNumber?: number,
    public  zip?: number) { }
}
