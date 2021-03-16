import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileInfo } from 'src/app/auth/profile-info';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  username = '';
  profileInfo: ProfileInfo = {} as ProfileInfo;

  constructor(private authService: AuthService,
    private tokenService: TokenStorageService,
    private router: Router, private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.authService.getUserByUsername(this.username).subscribe(info => {
      this.profileInfo = info;
      console.log(this.profileInfo);
    });
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('/');
  }

  editProfil() {
    
  }

}
