import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component ({
    selector: 'app-signup-screen',
    templateUrl: './signup-screen.component.html'
})

export class SignupScreenComponent implements OnInit {

    signupForm: FormGroup;

    constructor (private authService: AuthService){}

    ngOnInit() {
        this.signupForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        if(this.signupForm.valid) {
            const {name, lastName, email, password} = this.signupForm.value;
            const user = new User(email, password, name, lastName);
            this.authService.signup(user)
                .subscribe(
                    this.authService.login,
                    this.authService.handleError,
                );
        }
    }
    
};