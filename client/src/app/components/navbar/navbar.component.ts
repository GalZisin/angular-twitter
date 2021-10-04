import { Component, OnInit, Inject, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/types/types';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  isLoaded: boolean = false;
  user: IUser = {};
  clicked_ru: boolean = false;
  clicked_en: boolean = false;
  sidebar: boolean = false;
  hamburger!: HTMLElement | null
  navMenu!: HTMLElement | null
  navLink!: NodeListOf<Element> | null
  constructor(
    public authService: AuthService,
    private translateService: TranslateService,
    private cookie: CookieService
  ) {

  }

  ngOnInit(): void {

    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLink = document.querySelectorAll(".nav-link");

    this.isLoaded = true;
    this.loadUser();

    this.authService.userData.subscribe(
      data => {
        this.user = data;
      }
    )
  }

  loadUser(): void {
    this.authService.loadUser().subscribe(
      data => {
        if (data) {
          this.user = data;
          this.authService.setUser(data)
          this.authService.authenticate()
        }
        this.isLoaded = false;
      },
      error => { this.isLoaded = false; }
    )
  }

  changeLanguage(language: string) {
    console.log("lang", language)

    if (language === 'en-US') {
      this.clicked_en = true;
      this.clicked_ru = false;
    }
    else if (language === 'ru-RU') {
      this.clicked_en = false;
      this.clicked_ru = true;
    }
    this.cookie.set('lang', language)
    this.translateService.use(language);
  }

  showSidebar() {
    this.hamburger?.classList.remove("active");
    this.navMenu?.classList.remove("active");
  }
  mobileMenu() {
    this.hamburger?.classList.toggle("active");
    this.navMenu?.classList.toggle("active");
  }
}
