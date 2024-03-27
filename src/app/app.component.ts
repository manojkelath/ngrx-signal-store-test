import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { firstValueFrom, tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, TranslateModule],
})
export class AppComponent implements OnInit {
    /**
     * Constructor
     */
    constructor(private authService: AuthService, public translate: TranslateService) {
        translate.addLangs(['en', 'ar']);
        translate.setDefaultLang('ar');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    ngOnInit(): void {
    }
}
