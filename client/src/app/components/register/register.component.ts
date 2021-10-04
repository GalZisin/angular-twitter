import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { CustomValidators } from '../shared/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  error!: string;
  hide = true;

  // profile!: IUser;
  imageData!: string | null;
  selectedFile: File | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: [null, Validators.compose([
        Validators.required])
      ],
      email: [null, Validators.compose([
        Validators.email,
        Validators.required])
      ],
      password: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. Has a minimum length of 8 characters
        Validators.minLength(8)])
      ],
      image: [null, Validators.compose([
        Validators.required])
      ],
    })
  }

  register() {

    const { name, email, password } = this.registerForm?.value;
    const image = this.registerForm.value.image;
    console.log("this.registerForm?.value.image:", this.registerForm.value.image)
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('image', this.selectedFile!, this.selectedFile?.name);

    this.authService.register(fd).subscribe(
      data => {

        this.registerForm = new FormGroup({
          name: new FormControl(''),
          email: new FormControl(''),
          password: new FormControl(''),
          image: new FormControl(null)
        })
        this.authService.setUser(data)
        this.authService.authenticate();
        this.imageData = null;
        this.router.navigate(['/home'])
      },
      error => {
        this.error = error;
      }
    );
  }

  onFileSelect(event: any) {

    if (event?.target.files && event?.target.files[0]) {

      this.selectedFile = <File>event?.target?.files[0];

      console.log("image file:", this.selectedFile)

      this.registerForm.patchValue({ image: this.selectedFile });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (this.selectedFile && allowedMimeTypes.includes(this.selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;


        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }
}